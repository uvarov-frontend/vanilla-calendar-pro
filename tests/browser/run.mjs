import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import cypress from 'cypress';
import { nativeChecks } from './native.mjs';
import { fixtureServer } from './server.mjs';

const root = path.resolve(import.meta.dirname, '../..');
const args = process.argv.slice(2);
const open = args.includes('--open');
const browsersArg = args.find((arg) => arg.startsWith('--browsers='));
const options = await cypress.cli.parseRunArguments(['cypress', 'run', ...args.filter((arg) => arg !== '--open' && arg !== browsersArg)]);
const browsers = browsersArg ? browsersArg.slice('--browsers='.length).split(',') : [options.browser ?? 'electron'];
const output = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-tests-'));
const scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-fixtures-'));
console.log(`Test reports and failure screenshots: ${output}`);
let server;
try {
  const fixture = await fixtureServer(root, scratch);
  server = fixture.server;
  for (const browser of browsers) {
    const settings = {
      ...options,
      project: root,
      browser,
      config: {
        ...options.config,
        baseUrl: fixture.url,
        video: false,
        screenshotsFolder: path.join(output, browser, 'screenshots'),
        videosFolder: path.join(output, browser, 'videos'),
      },
    };
    if (open) await cypress.open(settings);
    else {
      const result = await cypress.run(settings);
      await fs.writeFile(
        path.join(output, `${browser}.json`),
        JSON.stringify(
          {
            browser: result.browserName,
            version: result.browserVersion,
            totalTests: result.totalTests,
            totalPassed: result.totalPassed,
            totalFailed: result.totalFailed,
            totalPending: result.totalPending,
            totalSkipped: result.totalSkipped,
            failures: result.failures,
            message: result.message,
            runs: result.runs?.map(({ spec, stats, tests, error }) => ({ spec: spec.relative, stats, tests, error })),
          },
          null,
          2,
        ),
      );
      if (result.failures || result.totalFailed || !result.totalTests || result.totalPending || result.totalSkipped) process.exitCode = 1;
      if (!options.spec && ['chrome', 'webkit'].includes(browser)) {
        if (!(await nativeChecks({ browser, executablePath: result.browserPath, url: fixture.url, output }))) process.exitCode = 1;
      }
    }
  }
} finally {
  if (server) await server.close();
  await fs.rm(scratch, { recursive: true, force: true });
  console.log(`Reports: ${output}`);
}
