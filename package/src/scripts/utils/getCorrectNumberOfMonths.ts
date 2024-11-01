import type { VanillaCalendarPro } from '@src/index';

const getCorrectNumberOfMonths = (self: VanillaCalendarPro) =>
  self.viewType === 'multiple' ? (self.displayMonthsCount === 1 ? 2 : self.displayMonthsCount > 12 ? 12 : self.displayMonthsCount) : 1;

export default getCorrectNumberOfMonths;
