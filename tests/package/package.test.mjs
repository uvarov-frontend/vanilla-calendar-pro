import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { parse } from 'acorn';
import { build } from 'vite';
import { unpackPackage } from './fixture.mjs';
import { assertModularStyles, assertStyleContracts, modularStyles } from './styles.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const require = createRequire(import.meta.url);
const entryPoints = [
  { subpath: '', file: 'index', global: 'VanillaCalendarPro', exports: ['Calendar', 'annotations', 'months', 'motion', 'time', 'weeks'] },
  { subpath: '/utils', file: 'utils/index', global: 'VanillaCalendarProUtils', exports: ['getDate', 'getDateString', 'getWeekNumber', 'parseDates'] },
];
let scratch;
let packed;
let manifest;
let consumerRequire;
let packedFiles;

before(async () => {
  scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-package-'));
  const fixture = await unpackPackage(root, scratch);
  packed = fixture.packed;
  packedFiles = fixture.files;
  consumerRequire = createRequire(path.join(scratch, 'package.json'));
  manifest = consumerRequire('vanilla-calendar-pro/package.json');
});

after(async () => {
  if (scratch) await fs.rm(scratch, { recursive: true, force: true });
});

for (const timezone of ['UTC', 'America/New_York', 'Europe/Berlin', 'America/Sao_Paulo', 'Asia/Kathmandu']) {
  test(`public date utilities: local dates, DST, leap years and week boundaries in ${timezone}`, () => {
    execFileSync(process.execPath, [path.join(import.meta.dirname, 'utils.assertions.mjs'), packed], {
      env: { ...process.env, TZ: timezone },
      stdio: 'pipe',
    });
  });
}

test('the packed package contains every public artifact, including the CDN ZIP download', async () => {
  const expected = [
    'LICENSE',
    'README.md',
    'package.json',
    'package.zip',
    'index.html',
    'index.js',
    'index.mjs',
    'index.d.ts',
    'options.d.ts',
    'types.d.ts',
    'labels.d.ts',
    'styles.d.ts',
    'extension.d.ts',
    'extensions/motion/index.d.ts',
    'extensions/time/index.d.ts',
    'extensions/annotations/index.d.ts',
    'extensions/weeks/index.d.ts',
    'extensions/months/index.d.ts',
    'utils/index.js',
    'utils/index.mjs',
    'utils/index.d.ts',
    'styles/index.css',
    'styles/layout.css',
    'styles/themes/light.css',
    'styles/themes/dark.css',
    'styles/themes/slate-light.css',
    ...modularStyles,
  ];
  assert.deepEqual(packedFiles.sort(), expected.sort());
  assert.deepEqual(manifest.dependencies, {});
  const zip = await fs.readFile(path.join(packed, 'package.zip'));
  assert.equal(zip.readUInt32LE(0), 0x04034b50, 'The CDN download must be a ZIP archive');
  for (const entry of entryPoints) {
    const resolved = manifest.exports[`.${entry.subpath}`];
    for (const file of Object.values(resolved)) await fs.access(path.join(packed, file));
  }
});

test('full styles preserve the pre-split selectors, values and browser fallbacks', () => assertStyleContracts(packed));

test('modular CSS is standalone, contains only its feature and reconstructs the full styles', (t) => assertModularStyles(packed, t));

for (const entry of entryPoints) {
  test(`${entry.file}: ESM, CommonJS, classic script and AMD expose the same API`, async () => {
    const source = await fs.readFile(path.join(packed, `${entry.file}.js`), 'utf8');
    const classic = {};
    vm.runInNewContext(source, classic);
    let amd;
    const define = (dependencies, factory) => {
      assert.deepEqual(Array.from(dependencies), ['exports']);
      amd = {};
      factory(amd);
    };
    define.amd = {};
    vm.runInNewContext(source, { define });
    const esm = await import(pathToFileURL(path.join(packed, `${entry.file}.mjs`)).href);
    const cjs = consumerRequire(`vanilla-calendar-pro${entry.subpath}`);
    for (const api of [esm, cjs, classic[entry.global], amd]) {
      assert.deepEqual(Object.keys(api).sort(), entry.exports);
      for (const name of entry.exports) {
        if (['motion', 'time', 'annotations', 'weeks', 'months'].includes(name)) {
          assert.equal(typeof api[name], 'object');
          assert.equal(api[name].name, name);
          assert.ok(Object.isFrozen(api[name]), `${name} must be an immutable description`);
        } else assert.equal(typeof api[name], 'function');
      }
      if (!entry.subpath) {
        const calendar = new api.Calendar({});
        assert.equal(calendar.extensions.length, api === esm ? 0 : 5, 'Only the full distribution registers extensions automatically');
        for (const name of ['motion', 'time', 'annotations', 'weeks', 'months']) {
          assert.match(name, /^[a-z]+$/);
          assert.equal(name in calendar, false, `${name} must not collide with a Calendar option or method`);
        }
      }
      if (entry.subpath) {
        assert.equal(api.getDateString(api.getDate('2024-02-29')), '2024-02-29');
        assert.equal(JSON.stringify(api.parseDates(['2024-02-28:2024-03-01'])), '["2024-02-28","2024-02-29","2024-03-01"]');
        assert.equal(JSON.stringify(api.getWeekNumber('2021-01-01', 1)), '{"year":2020,"week":53}');
      }
    }
  });

  test(`${entry.file}: standalone ES2015 bundles stay within their size budgets`, async (t) => {
    for (const extension of ['mjs', 'js']) {
      const file = `${entry.file}.${extension}`;
      const code = await fs.readFile(path.join(packed, file), 'utf8');
      const ast = parse(code, { ecmaVersion: 2015, sourceType: extension === 'mjs' ? 'module' : 'script' });
      assert.ok(
        ast.body.every((node) => node.type !== 'ImportDeclaration'),
        `${file} must not depend on another JS chunk`,
      );
      assert.match(code, /vanilla-calendar-pro v/);
      const bytes = Buffer.byteLength(code);
      assert.ok(bytes <= (entry.subpath ? 1500 : 83500), `${file} grew to ${bytes} bytes; review the build before changing its budget`);
      t.diagnostic(`${file}: ${bytes} bytes, gzip ${gzipSync(code, { level: 9 }).length}, Brotli ${brotliCompressSync(code).length}`);
    }
  });
}

async function bundle(name, source) {
  const entry = path.join(scratch, `${name}.mjs`);
  await fs.writeFile(entry, source);
  const result = await build({
    configFile: false,
    root: scratch,
    publicDir: false,
    logLevel: 'silent',
    css: { postcss: { plugins: [] } },
    build: {
      write: false,
      target: 'es2015',
      minify: 'terser',
      lib: { entry, formats: ['es'], fileName: name },
    },
  });
  return result.flatMap(({ output }) => output);
}

test('every modular CSS import resolves from the packed package and survives tree shaking', async () => {
  const output = await bundle('modular-styles', modularStyles.map((file) => `import 'vanilla-calendar-pro/${file}';`).join('\n'));
  const css = output
    .filter(({ type, fileName }) => type === 'asset' && fileName.endsWith('.css'))
    .map(({ source }) => source)
    .join('\n');
  assert.match(css, /data-vc-theme=slate-light/);
  assert.match(css, /data-vc-time/);
  assert.match(css, /data-vc-ghost/);
});

test('unused Calendar and extension imports disappear from a consumer bundle', async () => {
  const output = await bundle('unused', "import { Calendar, motion, time, annotations, weeks, months } from 'vanilla-calendar-pro'; export const marker = 1;");
  const code = output
    .filter(({ type }) => type === 'chunk')
    .map(({ code }) => code)
    .join('');
  assert.ok(code.length < 100, `Unused calendar retained ${code.length} bytes`);
  assert.doesNotMatch(code, /WeakMap|Calendar|data-vc/);
});

const featureMarkers = {
  motion: /setPointerCapture|translateX\(/,
  time: /data-vc-time-range=/,
  annotations: /vcDatePopup|vcDateRangeTooltip="visible"/,
  weeks: /vcDateWeekNumber|\.vcDates="row"/,
  months: /vcGrid="hidden"/,
};
for (const [name, features, budget] of [
  ['core', [], 55000],
  ['motion', ['motion'], 64500],
  ['time', ['time'], 61000],
  ['annotations', ['annotations'], 57500],
  ['weeks', ['weeks'], 61000],
  ['months', ['months'], 59000],
  ['motion-weeks', ['motion', 'weeks'], 70500],
  ['motion-months', ['motion', 'months'], 69000],
  ['all', ['motion', 'time', 'annotations', 'weeks', 'months'], 83500],
]) {
  test(`consumer ${name}: only requested implementations survive tree shaking`, async (t) => {
    const output = await bundle(name, `export { Calendar${features.length ? `, ${features.join(', ')}` : ''} } from 'vanilla-calendar-pro';`);
    const code = output.find(({ type }) => type === 'chunk').code;
    for (const [feature, marker] of Object.entries(featureMarkers)) {
      if (features.includes(feature)) assert.match(code, marker, `${feature} implementation must survive`);
      else assert.doesNotMatch(code, marker, `Unused ${feature} implementation must disappear`);
    }
    assert.ok(Buffer.byteLength(code) <= budget, `${name} exceeds its ${budget}-byte budget`);
    const gzip = gzipSync(code, { level: 9 }).length;
    assert.ok(gzip <= (name === 'core' ? 17000 : 25500), `${name} exceeds its compressed size budget`);
    t.diagnostic(`${name}: ${Buffer.byteLength(code)} bytes, gzip ${gzip}, Brotli ${brotliCompressSync(code).length}`);
  });
}

test('a single utility import does not retain the other utilities or Calendar', async () => {
  const output = await bundle('utility', "export { getDate } from 'vanilla-calendar-pro/utils';");
  const code = output.find(({ type }) => type === 'chunk').code;
  assert.ok(code.length < 200, `A single utility retained ${code.length} bytes`);
  const api = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  assert.equal(api.getDate('2024-02-29').getDate(), 29);
});

test('CSS survives even when the Calendar import is unused', async () => {
  const output = await bundle(
    'unused-with-styles',
    "import { Calendar } from 'vanilla-calendar-pro'; import 'vanilla-calendar-pro/styles/index.css'; export const marker = 1;",
  );
  const code = output.find(({ type }) => type === 'chunk').code;
  assert.ok(code.length < 100, `Unused calendar retained ${code.length} bytes`);
  const css = output.find(({ type, fileName }) => type === 'asset' && fileName.endsWith('.css'));
  assert.ok(css, 'Explicitly imported CSS must not be tree-shaken away');
  assert.match(css.source, /\.vc-date__btn/);
});

test('consumer tree shaking retains explicitly imported CSS and a used Calendar', async () => {
  const output = await bundle('styles', "export { Calendar } from 'vanilla-calendar-pro'; import 'vanilla-calendar-pro/styles/index.css';");
  const code = output.find(({ type }) => type === 'chunk').code;
  const css = output.filter(({ type, fileName }) => type === 'asset' && fileName.endsWith('.css'));
  assert.equal(css.length, 1);
  assert.match(css[0].source, /\.vc-date__btn/);
  assert.match(css[0].source, /data-vc-theme/);
  const api = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
  assert.equal(typeof api.Calendar, 'function');
});

test('all examples typecheck against the packed declarations', async () => {
  await fs.cp(path.join(root, 'examples'), path.join(scratch, 'examples'), { recursive: true });
  await fs.writeFile(path.join(scratch, 'examples/styles.d.ts'), "declare module '*.css';\n");
  await fs.writeFile(
    path.join(scratch, 'examples/utils.ts'),
    `
    import { getDate, getDateString, getWeekNumber, parseDates } from 'vanilla-calendar-pro/utils';
    import type { FormatDateString } from 'vanilla-calendar-pro';
    const date: FormatDateString = getDateString(getDate('2024-02-29'));
    const dates: FormatDateString[] = parseDates([date]);
    const week: { year: number; week: number } = getWeekNumber(date, 1);
    export { dates, week };
  `,
  );
  for (const module of ['ESNext', 'NodeNext']) {
    await fs.writeFile(
      path.join(scratch, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: { target: 'ESNext', module, moduleResolution: module === 'NodeNext' ? 'NodeNext' : 'bundler', strict: true, noEmit: true, types: [] },
        include: ['examples/**/*.ts'],
      }),
    );
    try {
      execFileSync(process.execPath, [require.resolve('typescript/lib/tsc.js'), '-p', path.join(scratch, 'tsconfig.json')], { stdio: 'pipe' });
    } catch (error) {
      throw new Error(error.stdout?.toString() || error.message, { cause: error });
    }
  }
});
