import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium, webkit } from 'playwright-webkit';
import { resolveBrowserExecutable } from './native.mjs';

export async function workbenchChecks({ browser: name, executablePath, url, output }) {
  const browser = await (name === 'webkit' ? webkit.launch() : chromium.launch({ executablePath: await resolveBrowserExecutable(executablePath) }));
  const results = [];
  try {
    for (const [mode, colorScheme, expected] of [
      ['system', 'dark', 'dark'],
      ['dark', 'light', 'dark'],
      ['light', 'dark', 'light'],
    ]) {
      const title = `${mode} theme on a ${colorScheme} device is applied before the application loads`;
      const context = await browser.newContext({ colorScheme });
      const page = await context.newPage();
      page.setDefaultTimeout(5000);
      let release;
      const application = new Promise((resolve) => {
        release = resolve;
      });
      try {
        await page.addInitScript((mode) => localStorage.setItem('vcp-workbench-theme', mode), mode);
        // Keep the entire application blocked: only the HTML head can set the first theme.
        await page.route('**/main.ts', async (route) => {
          await application;
          await route.continue();
        });
        await page.goto(url, { waitUntil: 'commit' });
        await page.waitForSelector('#dev-sidebar', { state: 'attached' });
        const initial = await page.evaluate(() => ({
          theme: document.documentElement.dataset.theme,
          mode: document.documentElement.dataset.themeMode,
          background: getComputedStyle(document.documentElement).backgroundColor,
          applicationLoaded: !!document.querySelector('.dev-nav-link'),
        }));
        assert.deepEqual(initial, {
          theme: expected,
          mode,
          background: expected === 'dark' ? 'rgb(13, 15, 18)' : 'rgb(255, 255, 255)',
          applicationLoaded: false,
        });
        release();
        await page.waitForSelector('.dev-theme-switch');
        await page.waitForSelector('#calendar[data-vc-theme]');
        assert.equal(await page.locator('#calendar').getAttribute('data-vc-theme'), expected);
        await page.emulateMedia({ colorScheme: colorScheme === 'dark' ? 'light' : 'dark' });
        const afterChange = mode === 'system' ? (expected === 'dark' ? 'light' : 'dark') : expected;
        await page.waitForFunction((theme) => document.documentElement.dataset.theme === theme, afterChange);
        assert.equal(await page.locator(`button[data-theme-mode="${mode}"]`).getAttribute('aria-pressed'), 'true');
        results.push({ title, passed: true });
      } catch (error) {
        results.push({ title, passed: false, error: error.stack });
      } finally {
        release();
        await context.close();
      }
    }
  } finally {
    await browser.close();
    await fs.writeFile(path.join(output, `${name}-workbench.json`), JSON.stringify(results, null, 2));
  }
  console.log(`${name}: early theme checks ${results.filter(({ passed }) => passed).length}/${results.length}`);
  return results.every(({ passed }) => passed);
}
