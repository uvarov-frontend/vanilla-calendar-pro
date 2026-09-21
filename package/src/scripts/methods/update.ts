import reset from '@scripts/methods/reset';
import errorMessages from '@scripts/utils/getErrorMessages';
import type { RenderState } from '@scripts/utils/renderState';
import { validateExtensions } from '@src/extension';
import type { Calendar, Reset } from '@src/index';

const update = (self: Calendar, resetOptions?: Partial<Reset>, reuse?: RenderState) => {
  if (!self.context.isInit) throw new Error(errorMessages.notInit);
  validateExtensions(self);
  const defaultReset = { year: true, month: true, dates: true, time: true, locale: true };
  reset(self, { ...defaultReset, ...resetOptions }, !(self.inputMode && !self.context.inputModeInit), reuse);
  if (self.onUpdate) self.onUpdate(self);
};

export default update;
