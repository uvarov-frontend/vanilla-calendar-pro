import type VanillaCalendar from '@src/vanilla-calendar';

const getCorrectNumberOfMonths = (self: VanillaCalendar) =>
  self.viewType === 'multiple' ? (self.displayMonthsCount === 1 ? 2 : self.displayMonthsCount > 12 ? 12 : self.displayMonthsCount) : 1;

export default getCorrectNumberOfMonths;
