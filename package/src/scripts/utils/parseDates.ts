import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { FormatDateString } from '@src/index';

// The last instant before the next civil day: 23:59:59.999 itself can fall in a DST gap
// (America/Nuuk springs forward at 23:00), which would carry the range into the next day.
const getDayEnd = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime() - 1;

const parseDates = (dates: Array<number | string | Date>, within?: { start: Date; end: Date; cursors?: Map<string, number> }): FormatDateString[] =>
  dates.reduce((accumulator: FormatDateString[], date) => {
    if (date instanceof Date || typeof date === 'number') {
      const d = date instanceof Date ? date : new Date(date);
      accumulator.push(getDateString(d));
    } else if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
      accumulator.push(date as FormatDateString);
    } else {
      date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, startDateStr, endDateStr) => {
        const rangeKey = `${startDateStr}:${endDateStr}`;
        const startTime = within ? within.start.getTime() : -Infinity;
        const cursor = within?.cursors?.get(rangeKey);
        const currentDate = cursor !== undefined && cursor <= startTime ? new Date(cursor) : getDate(startDateStr);
        // A midnight DST jump can carry the cursor to 01:00 on subsequent days.
        // Include the whole final civil day, not only its first instant.
        let endTime = getDayEnd(getDate(endDateStr));
        if (within) {
          if (endTime < startTime) return _;
          endTime = Math.min(endTime, getDayEnd(within.end));
        }

        // Retain local setDate stepping through midnight DST transitions. Only
        // materialize dates in the requested window, and stop at its last day.
        let savedCursor = false;
        for (let time = currentDate.getTime(); time <= endTime; time = currentDate.setDate(currentDate.getDate() + 1)) {
          if (!within || time >= startTime) {
            if (within?.cursors && !savedCursor) {
              within.cursors.set(rangeKey, time);
              savedCursor = true;
            }
            accumulator.push(getDateString(currentDate));
          }
        }
        return _;
      });
    }
    return accumulator;
  }, []);

export default parseDates;
