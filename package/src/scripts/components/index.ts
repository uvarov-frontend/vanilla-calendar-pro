import ArrowNext from '@scripts/components/ArrowNext';
import ArrowPrev from '@scripts/components/ArrowPrev';
import DateRangeTooltip from '@scripts/components/DateRangeTooltip';
import Dates from '@scripts/components/Dates';
import Month from '@scripts/components/Month';
import Months from '@scripts/components/Months';
import Week from '@scripts/components/Week';
import WeekNumbers from '@scripts/components/WeekNumbers';
import Year from '@scripts/components/Year';
import Years from '@scripts/components/Years';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

export const components = { ArrowNext, ArrowPrev, Dates, DateRangeTooltip, Month, Months, Week, WeekNumbers, Year, Years };
export const getComponent = (self: Calendar, pattern: string) => {
  if (pattern === 'Collapse') return getExtensions(self).motion?.component;
  if (pattern === 'ControlTime') return getExtensions(self).timePicker?.component;
  return components[pattern as keyof typeof components];
};
