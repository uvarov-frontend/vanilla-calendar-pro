import errorMessages from '@scripts/utils/getErrorMessages';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const initMonthsCount = (self: Calendar) => {
  if (self.type === 'multiple' && (self.displayMonthsCount <= 1 || self.displayMonthsCount > 12)) throw new Error(errorMessages.incorrectMonthsCount);
  if (self.type !== 'multiple' && self.displayMonthsCount > 1) throw new Error(errorMessages.incorrectMonthsCount);
  setContext(self, 'displayMonthsCount', self.displayMonthsCount ? self.displayMonthsCount : self.type === 'multiple' ? 2 : 1);
};

export default initMonthsCount;
