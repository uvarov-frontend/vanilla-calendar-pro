import ArrowNext from '@scripts/templates/components/ArrowNext';
import ArrowPrev from '@scripts/templates/components/ArrowPrev';
import ControlTime from '@scripts/templates/components/ControlTime';
import Dates from '@scripts/templates/components/Dates';
import Month from '@scripts/templates/components/Month';
import Months from '@scripts/templates/components/Months';
import Week from '@scripts/templates/components/Week';
import WeekNumbers from '@scripts/templates/components/WeekNumbers';
import Year from '@scripts/templates/components/Year';
import Years from '@scripts/templates/components/Years';

export const components = { ArrowNext, ArrowPrev, ControlTime, Dates, Month, Months, Week, WeekNumbers, Year, Years };
export const getComponent = (pattern: string) => components[pattern as keyof typeof components];
