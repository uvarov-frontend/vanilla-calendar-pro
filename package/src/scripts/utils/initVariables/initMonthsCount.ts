import errorMessages from '@scripts/utils/getErrorMessages';
import type { VanillaCalendarPro } from '@src/index';

const initMonthsCount = (self: VanillaCalendarPro) => {
  if (self.viewType === 'multiple' && (self.displayMonthsCount <= 1 || self.displayMonthsCount > 12)) throw new Error(errorMessages.incorrectMonthsCount);
  if (self.viewType !== 'multiple' && self.displayMonthsCount > 1) throw new Error(errorMessages.incorrectMonthsCount);
  self.private.displayMonthsCount = self.displayMonthsCount ? self.displayMonthsCount : self.viewType === 'multiple' ? 2 : 1;
};

export default initMonthsCount;