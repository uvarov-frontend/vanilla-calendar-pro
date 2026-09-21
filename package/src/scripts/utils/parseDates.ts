import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { FormatDateString } from '@src/index';

const parseDates = (dates: Array<number | string | Date>, within?: { start: Date; end: Date }): FormatDateString[] =>
  dates.reduce((accumulator: FormatDateString[], date) => {
    if (date instanceof Date || typeof date === 'number') {
      const d = date instanceof Date ? date : new Date(date);
      accumulator.push(getDateString(d));
    } else if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
      accumulator.push(date as FormatDateString);
    } else {
      date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, startDateStr, endDateStr) => {
        const currentDate = getDate(startDateStr);
        let endTime = getDate(endDateStr).getTime();
        if (within) {
          if (endTime < within.start.getTime()) return _;
          endTime = Math.min(endTime, new Date(within.end).setHours(23, 59, 59, 999));
        }

        // Retain local setDate stepping through midnight DST transitions. Only
        // materialize dates in the requested window, and stop at its last day.
        for (currentDate; currentDate.getTime() <= endTime; currentDate.setDate(currentDate.getDate() + 1)) {
          if (!within || currentDate >= within.start) accumulator.push(getDateString(currentDate));
        }
        return _;
      });
    }
    return accumulator;
  }, []);

export default parseDates;
