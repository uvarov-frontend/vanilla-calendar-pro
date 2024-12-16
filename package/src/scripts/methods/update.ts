import reset from '@scripts/methods/reset';
import errorMessages from '@scripts/utils/getErrorMessages';
import type { Calendar, Reset } from '@src/index';

const update = (self: Calendar, resetOptions?: Partial<Reset>) => {
  if (!self.context.isInit) throw new Error(errorMessages.notInit);
  const defaultReset = { year: true, month: true, dates: true, time: true, locale: true };
  reset(self, { ...defaultReset, ...resetOptions }, !(self.inputMode && !self.context.inputModeInit));
  if (self.onUpdate) self.onUpdate(self);
};

export default update;
