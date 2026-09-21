import type { CalendarExtension, MonthsExtension } from '@src/extension';
import column from './column';
import layout from './layout';
import render from './render';
import rotate from './rotate';
import select from './select';

/** Display and navigate several months together. Configuration stays on Calendar. */
export const months: CalendarExtension = /* @__PURE__ */ Object.freeze({
  name: 'months',
  layout,
  render,
  column,
  select,
  rotate,
} satisfies MonthsExtension) as unknown as CalendarExtension;
