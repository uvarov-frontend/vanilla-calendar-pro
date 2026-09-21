import errorMessages from '@scripts/utils/getErrorMessages';
import initMonthsCount from '@scripts/utils/initVariables/initMonthsCount';
import initRange from '@scripts/utils/initVariables/initRange';
import initSelectedDates from '@scripts/utils/initVariables/initSelectedDates';
import initSelectedMonthYear from '@scripts/utils/initVariables/initSelectedMonthYear';
import initWeek from '@scripts/utils/initVariables/initWeek';
import setContext from '@scripts/utils/setContext';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const initAllVariables = (self: Calendar) => {
  if (self.enableCollapse && !['default', 'week'].includes(self.type)) throw new Error(errorMessages.incorrectCollapseType);
  setContext(self, 'currentType', self.type);
  initMonthsCount(self);
  initRange(self);
  initSelectedMonthYear(self);
  initSelectedDates(self);
  initWeek(self);
  getExtensions(self).timePicker?.init(self);
};

export default initAllVariables;
