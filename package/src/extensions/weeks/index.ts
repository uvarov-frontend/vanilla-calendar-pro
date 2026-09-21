import type { CalendarExtension, WeeksExtension } from '@src/extension';
import component from './Collapse';
import { handleClickWeekDay, handleClickWeekNumber } from './click';
import dates from './createDates';
import numbers from './createNumbers';
import date from './date';
import init from './init';
import layout from './layout';
import numbersComponent from './Numbers';
import { handleWeekType, shiftWeek } from './navigate';
import { collapseClick, prepareCollapse } from './toggle';
import weekday from './weekday';

/** Weekly view, collapse and week interactions. Motion is optional. */
export const weeks: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'weeks',
  weekday,
  component,
  numbersComponent,
  layout,
  init,
  dates,
  numbers,
  date,
  shift: shiftWeek,
  arrows: handleWeekType,
  click(self, event) {
    handleClickWeekDay(self, event);
    handleClickWeekNumber(self, event);
  },
  collapseClick,
  prepareCollapse,
} satisfies WeeksExtension) as unknown as CalendarExtension;
