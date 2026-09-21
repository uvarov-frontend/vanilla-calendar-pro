import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Run in a fresh process per timezone so Date uses that zone from startup.
const { getDate, getDateString, getWeekNumber, parseDates } = await import(pathToFileURL(path.join(process.argv[2], 'utils/index.mjs')).href);

for (const date of ['1970-01-01', '2000-02-29', '2024-02-29', '2024-12-31', '2470-12-31']) {
  assert.equal(getDateString(getDate(date)), date, `local date round trip: ${date}`);
}
const local = new Date(2024, 0, 15, 23, 59);
assert.equal(getDateString(local), '2024-01-15');
assert.equal(getDate('2024-01-15').getHours(), 0);
assert.deepEqual(parseDates([local, new Date(2024, 0, 16, 12).getTime(), '2024-01-17']), ['2024-01-15', '2024-01-16', '2024-01-17']);
assert.deepEqual(parseDates([]), []);
assert.deepEqual(parseDates(['2024-06-20:2024-06-20']), ['2024-06-20']);

// Fixed civil-date expectations catch 24-hour stepping across short/long DST days,
// including Brazil's historical transition at midnight.
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
for (const dates of ranges) {
  const range = `${dates[0]}:${dates.at(-1)}`;
  assert.deepEqual(parseDates([range]), dates, `inclusive range: ${range}`);
}
for (const [date, firstWeekday, expected] of [
  ['2020-12-31', 1, { year: 2020, week: 53 }],
  ['2021-01-01', 1, { year: 2020, week: 53 }],
  ['2021-01-04', 1, { year: 2021, week: 1 }],
  ['2016-01-01', 1, { year: 2015, week: 53 }],
  ['2024-12-30', 1, { year: 2025, week: 1 }],
  ['2024-06-23', 1, { year: 2024, week: 25 }],
  ['2024-06-23', 0, { year: 2024, week: 26 }],
]) {
  assert.deepEqual(getWeekNumber(date, firstWeekday), expected, `week number: ${date}, start ${firstWeekday}`);
}
