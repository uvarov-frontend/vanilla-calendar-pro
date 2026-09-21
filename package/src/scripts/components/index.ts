import ArrowNext from '@scripts/components/ArrowNext';
import ArrowPrev from '@scripts/components/ArrowPrev';
import Dates from '@scripts/components/Dates';
import Month from '@scripts/components/Month';
import Months from '@scripts/components/Months';
import Week from '@scripts/components/Week';
import Year from '@scripts/components/Year';
import Years from '@scripts/components/Years';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

export const components = { ArrowNext, ArrowPrev, Dates, Month, Months, Week, Year, Years };
export const getComponent = (self: Calendar, pattern: string) => {
  if (pattern === 'Collapse') return getExtensions(self).weeks?.component;
  if (pattern === 'WeekNumbers') return getExtensions(self).weeks?.numbersComponent;
  if (pattern === 'DateRangeTooltip') return getExtensions(self).annotations?.component;
  if (pattern === 'ControlTime') return getExtensions(self).time?.component;
  // biome-ignore lint/suspicious/noPrototypeBuiltins: Object.hasOwn is newer than the supported browsers.
  return Object.prototype.hasOwnProperty.call(components, pattern) ? components[pattern as keyof typeof components] : undefined;
};
