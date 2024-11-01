import initDateMinMax from '@scripts/utils/initVariables/initDateMinMax';
import initRange from '@scripts/utils/initVariables/initRange';
import initSelectedDates from '@scripts/utils/initVariables/initSelectedDates';
import initSelectedMonthYear from '@scripts/utils/initVariables/initSelectedMonthYear';
import initTime from '@scripts/utils/initVariables/initTime';
import type { VanillaCalendarPro } from '@src/index';

const initAllVariables = (self: VanillaCalendarPro) => {
  self.private.currentType = self.viewType;
  initSelectedMonthYear(self);
  initRange(self);
  initSelectedDates(self);
  initDateMinMax(self);
  initTime(self);
};

export default initAllVariables;
