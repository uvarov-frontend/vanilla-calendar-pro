import initCorrectMonths from '@scripts/initializations/initCorrectMonths';
import initDateMinMax from '@scripts/initializations/initDateMinMax';
import initRange from '@scripts/initializations/initRange';
import initSelectedDates from '@scripts/initializations/initSelectedDates';
import initSelectedMonthYear from '@scripts/initializations/initSelectedMonthYear';
import initTime from '@scripts/initializations/initTime';
import type VanillaCalendar from '@src/vanilla-calendar';

const initAllVariables = (self: VanillaCalendar) => {
  self.currentType = self.type;
  initSelectedMonthYear(self);
  initRange(self);
  initSelectedDates(self);
  initDateMinMax(self);
  initCorrectMonths(self);
  initTime(self);
};

export default initAllVariables;
