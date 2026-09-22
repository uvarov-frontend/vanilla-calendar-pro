import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';
import { devSiteThemePlugin } from '../../config/dev-site.mjs';
import { unpackPackage } from '../package/fixture.mjs';

export async function fixtureServer(root, fixtureDirectory) {
  const directory = await fs.realpath(fixtureDirectory);
  const { packed } = await unpackPackage(root, directory);
  await fs.cp(path.join(root, 'demo'), directory, {
    recursive: true,
    filter: (source) => !['build', 'dist'].includes(path.basename(source)),
  });
  await fs.cp(path.join(root, 'examples'), path.join(directory, 'examples'), { recursive: true });
  await fs.symlink(packed, path.join(directory, 'package'), 'dir');
  // A previous build may be supplied for before/after CSS audits. Normal CI compares the full
  // packed styles against their modular equivalents, without depending on Git history.
  await fs.cp(process.env.CALENDAR_CSS_BASELINE ?? path.join(packed, 'styles'), path.join(directory, 'reference-styles'), { recursive: true });
  // The dev workbench loads its highlighter lazily; the calendar still comes only from the tarball.
  await fs.cp(await fs.realpath(path.join(root, 'node_modules/highlight.js')), path.join(directory, 'node_modules/highlight.js'), { recursive: true });
  const examples = (await fs.readdir(path.join(directory, 'examples')))
    .filter((name) => name.endsWith('.ts'))
    .map((name) => name.slice(0, -3))
    .sort();
  await fs.writeFile(path.join(directory, 'examples.json'), JSON.stringify(examples));
  const inputs = new Set(['type-default-in-input', 'type-week-in-input', 'additional-features-layouts-btn-close']);
  for (const name of examples) {
    const host = inputs.has(name) ? '<label for="calendar">Date</label><input id="calendar" autocomplete="off">' : '<div id="calendar"></div>';
    // Keep the outside-click target clear of popovers regardless of browser fonts.
    await fs.writeFile(
      path.join(directory, 'examples', `${name}.html`),
      `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${name}</title>
<style>body{margin:40px;font-family:sans-serif}#outside{position:fixed;right:20px;bottom:20px}</style></head>
<body>${host}<button id="outside">Outside</button>
<script type="module">import './${name}.ts'; window.exampleReady = true;</script></body></html>`,
    );
  }
  for (const format of ['module', 'script']) {
    const script =
      format === 'module'
        ? `<script type="module">import { Calendar, motion, time, annotations, weeks, months } from '/package/index.mjs'; window.calendarExtensions = { motion, time, annotations, weeks, months }; import * as utils from '/package/utils/index.mjs'; window.Calendar = Calendar; window.calendarUtils = utils;</script>`
        : `<script src="/package/index.js"></script><script src="/package/utils/index.js"></script><script>window.Calendar = VanillaCalendarPro.Calendar; const { motion, time, annotations, weeks, months } = VanillaCalendarPro; window.calendarExtensions = { motion, time, annotations, weeks, months }; window.calendarUtils = VanillaCalendarProUtils;</script>`;
    await fs.writeFile(
      path.join(directory, format === 'module' ? 'api.html' : 'api-script.html'),
      `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Public API</title><link rel="stylesheet" href="/package/styles/index.css"></head>
<body style="margin:40px"><div id="calendar"></div><input id="input" aria-label="Date"><button id="outside">Outside</button>
${script}
</body></html>`,
    );
  }
  const server = await createServer({
    plugins: [devSiteThemePlugin()],
    configFile: false,
    root: directory,
    publicDir: false,
    cacheDir: path.join(directory, '.vite'),
    logLevel: 'warn',
    css: { postcss: root },
    optimizeDeps: { noDiscovery: true, include: ['highlight.js/lib/core', 'highlight.js/lib/languages/typescript'] },
    resolve: {
      alias: [
        { find: '@src/index', replacement: path.join(packed, 'index.mjs') },
        { find: '@src/styles', replacement: path.join(packed, 'styles') },
      ],
    },
    // The fixture is a snapshot. A concurrent build must not reload a page mid-test.
    server: { host: '127.0.0.1', port: 0, hmr: false, watch: null, fs: { allow: [directory] } },
  });
  await server.listen();
  return { server, url: server.resolvedUrls.local[0] };
}
