import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { brotliCompressSync, constants, gzipSync } from 'node:zlib';

export const hash = (data) => createHash('sha256').update(data).digest('hex');

export function command(file, args, cwd, log, env = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { cwd, env: { ...process.env, ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
    const stream = log ? createWriteStream(log) : undefined;
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', (data) => (stream ? stream.write(data) : stdout.push(data)));
    child.stderr.on('data', (data) => (stream ? stream.write(data) : stderr.push(data)));
    child.once('error', (error) => {
      stream?.end();
      reject(error);
    });
    child.once('close', (code) => {
      stream?.end();
      if (code !== 0) reject(new Error(`${file} ${args.join(' ')} failed (${code}). ${log ? `See ${log}` : Buffer.concat(stderr).toString()}`));
      else resolve(Buffer.concat(stdout).toString());
    });
  });
}

async function sourceHashes(directory) {
  const entries = {};
  async function walk(relative) {
    for (const entry of await fs.readdir(path.join(directory, relative), { withFileTypes: true })) {
      const name = path.join(relative, entry.name);
      if (entry.isDirectory()) await walk(name);
      else entries[name.split(path.sep).join('/')] = hash(await fs.readFile(path.join(directory, name)));
    }
  }
  await walk('package/src');
  return entries;
}

export async function prepareBuilds(root, scratch, output, baselineRef) {
  const baselineCommit = (await command('git', ['rev-parse', '--verify', '--end-of-options', `${baselineRef}^{commit}`], root)).trim();
  const head = (await command('git', ['rev-parse', 'HEAD'], root)).trim();
  const status = await command('git', ['status', '--porcelain=v1'], root);
  const directories = Object.fromEntries(['baseline', 'current'].map((variant) => [variant, path.join(scratch, variant)]));
  for (const directory of Object.values(directories)) await fs.mkdir(directory);
  const archive = path.join(scratch, 'baseline.tar');
  await command('git', ['archive', '--format=tar', `--output=${archive}`, baselineCommit], root);
  await command('tar', ['-xf', archive, '-C', directories.baseline], root);
  const baselinePackage = JSON.parse(await fs.readFile(path.join(directories.baseline, 'package.json'), 'utf8'));
  if (!baselinePackage.packageManager?.startsWith('pnpm@'))
    throw new Error(
      'This baseline predates the pnpm/toolchain migration. Choose a later revision, or run the historical harness in a checkout with its original dependencies. See tests/performance/README.md.',
    );
  const files = (await command('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], root)).split('\0').filter(Boolean);
  for (const file of new Set(files)) {
    const source = path.join(root, file);
    try {
      await fs.lstat(source);
    } catch (error) {
      if (error.code === 'ENOENT') continue; // Unstaged deletion is part of the working tree.
      throw error;
    }
    const destination = path.join(directories.current, file);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.cp(source, destination, { recursive: true, verbatimSymlinks: true });
  }
  const require = createRequire(path.join(root, 'package.json'));
  const dependencies = Object.fromEntries(
    ['vite', 'terser', 'typescript', 'tailwindcss', 'postcss'].map((name) => [name, require(`${name}/package.json`).version]),
  );
  const builds = {};
  for (const [variant, directory] of Object.entries(directories)) {
    await fs.symlink(path.join(root, 'node_modules'), path.join(directory, 'node_modules'), 'dir');
    console.log(`Building ${variant}${variant === 'baseline' ? ` (${baselineCommit.slice(0, 8)})` : ' (working tree)'}...`);
    // The snapshot intentionally shares installed dependencies with another workspace path.
    await command('pnpm', ['run', 'package:build'], directory, path.join(output, `build-${variant}.log`), {
      pnpm_config_verify_deps_before_run: 'false',
    });
    const dist = path.join(directory, 'package/dist');
    const code = await fs.readFile(path.join(dist, 'index.mjs'), 'utf8');
    const css = await fs.readFile(path.join(dist, 'styles/layout.css'), 'utf8');
    const artifacts = {};
    for (const name of ['index.mjs', 'index.js', 'utils/index.mjs', 'utils/index.js', 'styles/layout.css', 'styles/index.css']) {
      const bytes = await fs.readFile(path.join(dist, name));
      artifacts[name] = {
        bytes: bytes.length,
        gzip: gzipSync(bytes, { level: 9 }).length,
        brotli: brotliCompressSync(bytes, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
        sha256: hash(bytes),
      };
      const retained = path.join(output, 'bundles', variant, name);
      await fs.mkdir(path.dirname(retained), { recursive: true });
      await fs.writeFile(retained, bytes);
    }
    const declarations = {};
    for (const name of ['index.d.ts', 'types.d.ts', 'options.d.ts', 'styles.d.ts', 'labels.d.ts', 'utils/index.d.ts', 'package.json'])
      declarations[name] = hash(await fs.readFile(path.join(dist, name)));
    builds[variant] = { code, css, artifacts, declarations, sourceHashes: await sourceHashes(directory) };
  }
  if (builds.baseline.css !== builds.current.css)
    throw new Error('Layout CSS differs. These comparisons isolate JavaScript performance using identical CSS; audit CSS changes separately.');
  return { builds, provenance: { baselineRef, baselineCommit, head, status, dependencies } };
}
