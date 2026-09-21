import assert from 'node:assert/strict';
import { constants } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium, webkit } from 'playwright-webkit';

export async function resolveBrowserExecutable(executable, searchPath = process.env.PATH ?? '') {
  assert.ok(executable, 'Cypress must report the Chrome executable');
  if (path.isAbsolute(executable)) return executable;
  // On Linux Cypress can report a command such as google-chrome. Playwright
  // expects a filesystem path and does not resolve that command through PATH.
  for (const directory of searchPath.split(path.delimiter)) {
    const candidate = path.resolve(directory, executable);
    try {
      await fs.access(candidate, constants.X_OK);
      return candidate;
    } catch {
      // Keep searching when this PATH entry does not contain the executable.
    }
  }
  throw new Error(`Cannot resolve Cypress browser executable: ${executable}`);
}

// Real browser input complements Cypress's synthetic pointer sequences. In
// particular, it exercises native pointer capture without modifying DOM APIs.
export async function nativeChecks({ browser: name, executablePath, url, output }) {
  const browser = await (name === 'webkit' ? webkit.launch() : chromium.launch({ executablePath: await resolveBrowserExecutable(executablePath) }));
  const results = [];
  const check = async (title, options, run) => {
    const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
    page.setDefaultTimeout(5000);
    page.setDefaultNavigationTimeout(10000);
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    try {
      await page.goto(`${url}api.html`);
      await page.waitForFunction(() => typeof window.Calendar === 'function');
      await page.evaluate((options) => {
        window.nativeEvents = [];
        for (const type of ['pointerdown', 'gotpointercapture', 'lostpointercapture']) {
          document.addEventListener(type, (event) => window.nativeEvents.push({ type, trusted: event.isTrusted }));
        }
        window.instance = new window.Calendar('#calendar', { selectedYear: 2024, selectedMonth: 5, dateToday: '2024-06-19', ...options });
        window.instance.init();
      }, options);
      await run(page);
      assert.deepEqual(errors, [], 'No uncaught browser errors');
      results.push({ title, passed: true });
    } catch (error) {
      results.push({ title, passed: false, error: error.stack });
      await page.screenshot({ path: path.join(output, `${name}-native-${results.length}.png`) });
    } finally {
      await page.close();
    }
  };
  const beginSwipe = async (page) => {
    const box = await page.locator('[data-vc="content"]').boundingBox();
    await page.mouse.move(box.x + box.width - 20, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 50, { steps: 5 });
    await page.waitForSelector('[data-vc-dragging]');
    assert.ok(await page.evaluate(() => window.nativeEvents.some((event) => event.type === 'gotpointercapture' && event.trusted)));
  };
  try {
    await check(
      'native keyboard skips disabled dates and confirms with Enter',
      { selectedDates: ['2024-06-20'], disableDates: ['2024-06-21'] },
      async (page) => {
        await page.locator('[data-vc-date="2024-06-20"] button').focus();
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Enter');
        assert.deepEqual(await page.evaluate(() => window.instance.context.selectedDates), ['2024-06-22']);
      },
    );
    await check('date popups preserve native clicks before and after their positioning frame', {}, async (page) => {
      await page.evaluate(() => {
        const requestFrame = window.requestAnimationFrame;
        const pending = [];
        window.requestAnimationFrame = (callback) => pending.push(callback);
        window.flushPopupPosition = () => {
          window.requestAnimationFrame = requestFrame;
          pending.forEach((callback) => callback(performance.now()));
        };
        window.instance.set({ popups: { '2024-06-20': { html: '<a href="#popup-details">Details</a>' } } });
      });
      const date = page.locator('[data-vc-date="2024-06-20"] [data-vc-date-btn]');
      const box = await date.boundingBox();
      // Use real hit testing over the part that an unpositioned popup can cover.
      await page.mouse.move(box.x + 10, box.y + box.height / 2);
      await page.mouse.click(box.x + 10, box.y + box.height / 2);
      assert.deepEqual(await page.evaluate(() => window.instance.context.selectedDates), ['2024-06-20']);
      await page.evaluate(() => window.flushPopupPosition());
      await date.focus();
      await page.locator('[data-vc-date-popup] a').click();
      assert.equal(new URL(page.url()).hash, '#popup-details');
      assert.deepEqual(await page.evaluate(() => window.instance.context.selectedDates), ['2024-06-20']);
      await date.click();
      assert.deepEqual(await page.evaluate(() => window.instance.context.selectedDates), []);
    });
    await check('native swipe retains capture outside the calendar and releases it', { enableSwipe: true, animation: true }, async (page) => {
      await beginSwipe(page);
      await page.mouse.move(1, 150, { steps: 5 });
      await page.mouse.up();
      await page.waitForFunction(() => window.instance.context.selectedMonth === 6 && !document.querySelector('[data-vc-ghost]'));
      assert.ok(await page.evaluate(() => window.nativeEvents.some((event) => event.type === 'lostpointercapture' && event.trusted)));
    });
    await check('native drag collapses and expands the calendar', { enableCollapse: true, animation: true, selectedDates: ['2024-06-19'] }, async (page) => {
      for (const [distance, type] of [
        [-100, 'week'],
        [100, 'default'],
      ]) {
        const box = await page.locator('[data-vc="collapse"]').boundingBox();
        const x = box.x + box.width / 2;
        const y = box.y + box.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        await page.mouse.move(x, y + distance, { steps: 10 });
        await page.waitForSelector('[data-vc-dragging]');
        await page.mouse.up();
        await page.waitForFunction(
          (type) => document.querySelector('#calendar')?.getAttribute('data-vc-type') === type && !document.querySelector('[data-vc-collapsing]'),
          type,
        );
      }
    });
    await check('set() during a native drag survives a late pointerup', { enableSwipe: true, animation: true }, async (page) => {
      await beginSwipe(page);
      await page.evaluate(() => window.instance.set({ selectedMonth: 8 }));
      await page.mouse.up();
      assert.equal(await page.evaluate(() => window.instance.context.selectedMonth), 8);
      assert.equal(await page.locator('[data-vc-dragging], [data-vc-ghost]').count(), 0);
    });
    await check('destroy() during a native drag survives later pointer events', { enableSwipe: true, animation: true }, async (page) => {
      await beginSwipe(page);
      await page.evaluate(() => window.instance.destroy());
      await page.mouse.move(1, 150);
      await page.mouse.up();
      assert.equal(await page.locator('[data-vc="calendar"], [data-vc-ghost]').count(), 0);
      assert.equal(await page.locator('#calendar').innerHTML(), '');
    });
  } finally {
    await browser.close();
    await fs.writeFile(path.join(output, `${name}-native.json`), JSON.stringify(results, null, 2));
  }
  console.log(`${name}: native input checks ${results.filter((result) => result.passed).length}/${results.length}`);
  return results.every((result) => result.passed);
}
