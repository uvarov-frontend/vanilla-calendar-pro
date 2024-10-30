import type VanillaCalendar from '@src/vanilla-calendar';

const getCorrectNumberOfMonths = (self: VanillaCalendar) => (self.type === 'multiple' ? (self.months === 1 ? 2 : self.months > 12 ? 12 : self.months) : 1);

export default getCorrectNumberOfMonths;
