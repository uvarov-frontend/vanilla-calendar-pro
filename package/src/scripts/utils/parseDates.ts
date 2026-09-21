import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { FormatDateString } from '@src/index';

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
        let endTime = getDate(endDateStr).getTime();
        if (within) {
          if (endTime < startTime) return _;
          endTime = Math.min(endTime, new Date(within.end).setHours(23, 59, 59, 999));
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
