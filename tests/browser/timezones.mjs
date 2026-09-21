import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { chromium, webkit } from 'playwright-webkit';
import { fixtureServer } from './server.mjs';

const zones = [
  ['UTC', 0, '2024-01-01', '2024-01-01'],
  ['Europe/Moscow', -180, '2024-01-01', '2024-01-01'],
  ['Europe/Berlin', -120, '2024-01-01', '2024-01-01'],
  ['America/New_York', 240, '2023-12-31', '2024-01-01'],
  ['America/Los_Angeles', 420, '2023-12-31', '2024-01-01'],
  ['America/Sao_Paulo', 180, '2023-12-31', '2024-01-01'],
  ['Asia/Tokyo', -540, '2024-01-01', '2024-01-01'],
  ['Asia/Kathmandu', -345, '2024-01-01', '2024-01-01'],
  ['Australia/Sydney', -600, '2024-01-01', '2024-01-01'],
  ['Pacific/Kiritimati', -840, '2024-01-01', '2024-01-02'],
];
const ranges = [
  ['2024-02-28', '2024-02-29', '2024-03-01'],
  ['2100-02-28', '2100-03-01'],
  ['2023-12-30', '2023-12-31', '2024-01-01', '2024-01-02'],
  ['2024-03-09', '2024-03-10', '2024-03-11', '2024-03-12'],
  ['2024-11-02', '2024-11-03', '2024-11-04', '2024-11-05'],
  ['2024-03-30', '2024-03-31', '2024-04-01', '2024-04-02'],
  ['2024-10-26', '2024-10-27', '2024-10-28', '2024-10-29'],
  ['2018-11-03', '2018-11-04', '2018-11-05', '2018-11-06'],
];
const day = (date) => `[data-vc-date="${date}"][data-vc-date-month="current"] [data-vc-date-btn]`;
const selectedDates = (page) =>
  page.evaluate(() =>
    [...new Set([...document.querySelectorAll('[data-vc-date-selected][data-vc-date-month="current"]')].map((el) => el.dataset.vcDate))].sort(),
  );
const mount = (page, options) =>
  page.evaluate((options) => {
    window.instance = new window.Calendar('#calendar', { extensions: Object.values(window.calendarExtensions), ...options });
    window.instance.init();
  }, options);

const root = path.resolve(import.meta.dirname, '../..');
const browsers = process.argv
  .find((arg) => arg.startsWith('--browsers='))
  ?.slice('--browsers='.length)
  .split(',') ?? ['chrome', 'webkit'];
assert.ok(
  browsers.every((name) => ['chrome', 'webkit'].includes(name)),
  'Use --browsers=chrome,webkit',
);
const output = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-timezones-'));
const scratch = await fs.mkdtemp(path.join(os.tmpdir(), 'vanilla-calendar-fixtures-'));
const results = [];
console.log(`Timezone reports: ${output}`);
let server;
try {
  const fixture = await fixtureServer(root, scratch);
  server = fixture.server;
  for (const name of browsers) {
    const browser = await (name === 'webkit' ? webkit.launch() : chromium.launch({ channel: 'chrome' }));
    try {
      for (const [timezone, offset, midnightDate, noonDate] of zones) {
        const context = await browser.newContext({ timezoneId: timezone, viewport: { width: 1000, height: 800 } });
        const check = async (title, run, instant = '2024-06-19T12:00:00Z') => {
          const page = await context.newPage();
          page.setDefaultTimeout(5000);
          page.setDefaultNavigationTimeout(10000);
          const errors = [];
          page.on('pageerror', (error) => errors.push(error.message));
          try {
            await page.clock.setFixedTime(instant);
            await page.goto(`${fixture.url}api.html`);
            await page.waitForFunction(() => typeof window.Calendar === 'function');
            assert.equal(await page.evaluate(() => new Date(2024, 5, 15).getTimezoneOffset()), offset, 'Browser timezone emulation is active');
            await run(page);
            assert.deepEqual(errors, [], 'No uncaught browser errors');
            results.push({ browser: name, version: browser.version(), timezone, title, passed: true });
          } catch (error) {
            results.push({ browser: name, timezone, title, passed: false, error: error.stack });
            await page.screenshot({ path: path.join(output, `failure-${results.length}.png`) });
            process.exitCode = 1;
          } finally {
            await page.close();
          }
        };
        try {
          for (const dates of ranges) {
            await check(`inclusive range ${dates[0]}:${dates.at(-1)}, initial options and clicks`, async (page) => {
              const [year, month] = dates[0].split('-').map(Number);
              await mount(page, {
                type: 'multiple',
                displayMonthsCount: 2,
                selectionDatesMode: 'multiple-ranged',
                enableEdgeDatesOnly: false,
                selectedYear: year,
                selectedMonth: month - 1,
                selectedDates: [`${dates[0]}:${dates.at(-1)}`],
              });
              assert.deepEqual(await selectedDates(page), dates);
              assert.deepEqual(await page.evaluate(() => window.instance.context.selectedDates), dates);
              await page.evaluate(() => window.instance.set({ selectedDates: [] }));
              await page.locator(day(dates[0])).click();
              await page.locator(day(dates.at(-1))).click();
              assert.deepEqual(await selectedDates(page), dates);
              assert.deepEqual(await page.evaluate(() => window.instance.context.selectedDates), dates);
            });
          }
          await check('local Date objects, timestamps, min/max and disabled rules', async (page) => {
            await page.evaluate(() => {
              window.instance = new window.Calendar('#calendar', {
                selectedYear: 2024,
                selectedMonth: 1,
                selectionDatesMode: 'multiple',
                dateMin: new Date(2024, 1, 20),
                dateMax: new Date(2024, 1, 29).getTime(),
                selectedDates: [new Date(2024, 1, 27), new Date(2024, 1, 28).getTime()],
                disableDates: ['2024-02-23:2024-02-25'],
              });
              window.instance.init();
            });
            assert.deepEqual(await selectedDates(page), ['2024-02-27', '2024-02-28']);
            for (const date of ['2024-02-19', '2024-02-23', '2024-02-24', '2024-02-25']) assert.equal(await page.locator(day(date)).isDisabled(), true);
            await page.locator(day('2024-02-29')).click();
            assert.deepEqual(await selectedDates(page), ['2024-02-27', '2024-02-28', '2024-02-29']);
          });
          await check('week numbering and navigation across the year boundary', async (page) => {
            await mount(page, { selectedYear: 2021, selectedMonth: 0, enableWeekNumbers: true });
            assert.equal(await page.locator('[data-vc-week-number]').first().getAttribute('data-vc-week-number'), '53');
            await page.locator('[data-vc-arrow="prev"]').click();
            assert.deepEqual(await page.evaluate(() => [window.instance.context.selectedYear, window.instance.context.selectedMonth]), [2020, 11]);
            await page.locator('[data-vc-arrow="next"]').click();
            await page.locator(day('2021-01-01')).click();
            assert.deepEqual(await selectedDates(page), ['2021-01-01']);
          });
          await check('input date/time round trip around the US spring DST transition', async (page) => {
            await page.evaluate(() => {
              window.instance = new window.Calendar('#input', {
                extensions: [window.calendarExtensions.timePicker],
                inputMode: true,
                selectedYear: 2024,
                selectedMonth: 2,
                selectionTimeMode: 24,
                selectedTime: '09:15',
                onChangeToInput(self) {
                  self.context.inputElement.value = `${self.context.selectedDates[0] ?? ''} ${self.context.selectedTime}`;
                },
              });
              window.instance.init();
            });
            await page.locator('#input').click();
            await page.locator(day('2024-03-10')).click();
            assert.equal(await page.locator('#input').inputValue(), '2024-03-10 09:15');
            await page.locator('[data-vc-time-input="hour"] input').fill('18');
            await page.locator('[data-vc-time-input="minute"] input').focus();
            assert.equal(await page.locator('#input').inputValue(), '2024-03-10 18:15');
            await page.locator('#outside').click();
            await page.locator('#input').click();
            assert.deepEqual(await selectedDates(page), ['2024-03-10']);
          });
          for (const [instant, expected] of [
            ['2024-01-01T00:30:00Z', midnightDate],
            ['2024-01-01T12:30:00Z', noonDate],
          ]) {
            await check(
              `today and past-date restrictions at ${instant}`,
              async (page) => {
                await mount(page, { disableDatesPast: true });
                assert.equal(await page.evaluate(() => window.instance.context.dateToday), expected);
                assert.equal(await page.locator('[data-vc-date-today]').getAttribute('data-vc-date'), expected);
                assert.equal(await page.locator(day(expected)).isDisabled(), false);
                await page.locator(day(expected)).click();
                assert.deepEqual(await selectedDates(page), [expected]);
                assert.equal(
                  await page
                    .locator(`[data-vc-date-month="current"] [data-vc-date-btn]:enabled`)
                    .evaluateAll((buttons, expected) => buttons.every((button) => button.parentElement.dataset.vcDate >= expected), expected),
                  true,
                );
              },
              instant,
            );
          }
          await check('an absolute timestamp intentionally resolves to the local civil date', async (page) => {
            await mount(page, { selectedDates: [Date.parse('2024-01-01T00:30:00Z')], enableJumpToSelectedDate: true });
            assert.deepEqual(await selectedDates(page), [midnightDate]);
            await page.evaluate(() => window.instance.set({ selectedDates: [new Date('2024-01-01T00:30:00Z')] }));
            assert.deepEqual(await selectedDates(page), [midnightDate]);
          });
        } finally {
          await context.close();
        }
        const current = results.filter((result) => result.browser === name && result.timezone === timezone);
        console.log(`${name} / ${timezone}: ${current.filter((result) => result.passed).length}/${current.length}`);
      }
    } finally {
      await browser.close();
    }
  }
} finally {
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  if (server) await server.close();
  await fs.rm(scratch, { recursive: true, force: true });
  console.log(`Timezone checks: ${results.filter((result) => result.passed).length}/${results.length}. Reports: ${output}`);
}
