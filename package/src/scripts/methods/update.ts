import createToInput from '@scripts/creators/createToInput';
import reset from '@scripts/methods/reset';
import errorMessages from '@scripts/utils/getErrorMessages';
import type { Reset, VanillaCalendarPro } from '@src/index';

const update = (self: VanillaCalendarPro, { year, month, dates, time, locale }: Reset = {}) => {
  if (!self.private.isInit) throw new Error(errorMessages.notInit);
  if (self.isInput && !self.private.isInputInit) createToInput(self, false);
  reset(self, { year, month, dates, time, locale });
  if (self.onUpdate) self.onUpdate(self);
};

export default update;
