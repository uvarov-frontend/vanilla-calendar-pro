import ArrowNext from '@scripts/components/ArrowNext';
import ArrowPrev from '@scripts/components/ArrowPrev';
import ControlTime from '@scripts/components/ControlTime';
import DateRangeTooltip from '@scripts/components/DateRangeTooltip';
import Dates from '@scripts/components/Dates';
import Month from '@scripts/components/Month';
import Months from '@scripts/components/Months';
import Week from '@scripts/components/Week';
import WeekNumbers from '@scripts/components/WeekNumbers';
import Year from '@scripts/components/Year';
import Years from '@scripts/components/Years';

export const components = { ArrowNext, ArrowPrev, ControlTime, Dates, DateRangeTooltip, Month, Months, Week, WeekNumbers, Year, Years };
export const getComponent = (pattern: string) => components[pattern as keyof typeof components];
