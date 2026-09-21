import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { launchChrome, serve } from './browser.mjs';
import { hash, prepareBuilds } from './build.mjs';
import { checkRendering } from './checks.mjs';
import { configuration, help } from './config.mjs';
import { extended } from './extended.mjs';
import { markdown } from './report.mjs';
import { measure } from './timing.mjs';

async function main() {
  const config = configuration();
  if (config.help) return console.log(help);
  if (Number(process.versions.node.split('.')[0]) < 22 || typeof WebSocket !== 'function')
    throw new Error('The performance harness requires Node 22+ with native WebSocket. This does not change the calendar browser support.');
  const directory = path.dirname(fileURLToPath(import.meta.url));
  const root = path.resolve(directory, '../..');
  await fs.access(path.join(root, 'node_modules'));
  let output;
  if (config.output) {
    output = path.resolve(config.output);
    const relative = path.relative(root, output);
    if (relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative)))
      throw new Error('--output must be outside the repository so generated files cannot enter a source snapshot.');
    await fs.mkdir(output, { recursive: true });
    if ((await fs.readdir(output)).length) throw new Error('--output must name an empty or new directory.');
  } else output = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-performance-'));
  console.log(`Results: ${output}`);
  const scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-builds-'));
  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    status: 'running',
    config,
    environment: { node: process.version, platform: process.platform, arch: process.arch, cpu: os.cpus()[0]?.model, timezone: 'Europe/Moscow' },
    harnessHashes: {},
  };
  for (const name of await fs.readdir(directory)) if (name.endsWith('.mjs')) report.harnessHashes[name] = hash(await fs.readFile(path.join(directory, name)));
  const save = (name, value) => fs.writeFile(path.join(output, name), typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`);
  const checkpoint = async () => {
    await save('report.json', report);
    await save('report.md', markdown(report));
  };
  let browser;
  let server;
  try {
    await checkpoint();
    const { builds, provenance } = await prepareBuilds(root, scratch, output, config.baseline);
    report.provenance = provenance;
    report.builds = Object.fromEntries(Object.entries(builds).map(([variant, { code: _code, css: _css, ...metadata }]) => [variant, metadata]));
    await checkpoint();
    const resources = {};
    for (const variant of ['baseline', 'current']) resources[`/${variant}.mjs`] = { type: 'text/javascript', body: builds[variant].code };
    resources['/style.css'] = { type: 'text/css', body: builds.current.css };
    for (const file of ['scenarios.browser.mjs', 'rendering.browser.mjs', 'lifecycle.browser.mjs'])
      resources[`/${file}`] = { type: 'text/javascript', body: await fs.readFile(path.join(directory, file), 'utf8') };
    for (const [name, file] of Object.entries({ timing: 'scenarios', checks: 'rendering', extended: 'lifecycle', startup: 'lifecycle' }))
      resources[`/${name}`] = {
        type: 'text/html',
        body: `<!doctype html><html lang="en"><head><meta charset="utf-8">${name === 'startup' ? '' : '<link rel="stylesheet" href="/style.css">'}</head><body><script type="module" src="/${file}.browser.mjs"></script></body></html>`,
      };
    server = await serve(resources);
    browser = await launchChrome();
    report.environment.browser = (await browser.cdp.send('Browser.getVersion')).product;
    const context = { browser, url: server.url, config, report, save, checkpoint };
    if (['checks', 'all'].includes(config.suite)) await checkRendering(context);
    if (['timing', 'all'].includes(config.suite)) await measure(context);
    if (['extended', 'all'].includes(config.suite)) await extended(context);
    report.status = 'passed';
  } catch (error) {
    report.status = 'failed';
    report.error = error.stack ?? String(error);
    throw error;
  } finally {
    try {
      if (browser) await browser.close();
    } finally {
      if (server) await server.close();
      await fs.rm(scratch, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
      await checkpoint();
      console.log(`Report: ${path.join(output, 'report.md')}`);
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
