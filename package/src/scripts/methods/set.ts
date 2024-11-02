import update from '@scripts/methods/reset';
import replaceProperties from '@scripts/utils/replaceProperties';
import type { Options, Reset, VanillaCalendarPro } from '@src/index';

const set = (self: VanillaCalendarPro, options: Options, resetOptions?: Partial<Reset>) => {
  const defaultReset = { year: true, month: true, dates: true, time: true, locale: true };
  replaceProperties(self, options);
  update(self, { ...defaultReset, ...resetOptions });
};

export default set;
