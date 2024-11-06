import initMonthsCount from '@scripts/utils/initVariables/initMonthsCount';
import initRange from '@scripts/utils/initVariables/initRange';
import initSelectedDates from '@scripts/utils/initVariables/initSelectedDates';
import initSelectedMonthYear from '@scripts/utils/initVariables/initSelectedMonthYear';
import initTime from '@scripts/utils/initVariables/initTime';
import type { Calendar } from '@src/index';

const initAllVariables = (self: Calendar) => {
  self.context.currentType = self.type;
  initMonthsCount(self);
  initRange(self);
  initSelectedMonthYear(self);
  initSelectedDates(self);
  initTime(self);
};

export default initAllVariables;
