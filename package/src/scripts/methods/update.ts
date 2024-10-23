import type { IReset } from '@package/types';
import createToInput from '@scripts/creators/createToInput';
import messages from '@scripts/helpers/getMessages';
import reset from '@scripts/methods/reset';
import type VanillaCalendar from '@src/vanilla-calendar';

const update = (self: VanillaCalendar, { year, month, dates, holidays, time }: IReset = {}) => {
  if (!self.isInit) throw new Error(messages.notInit);

  if (self.input && !self.isInputInit) {
    createToInput(self, false);
  }
  reset(self, {
    year,
    month,
    dates,
    holidays,
    time,
  });
  if (self.actions.updateCalendar) self.actions.updateCalendar(self);
};

export default update;
