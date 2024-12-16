import update from '@scripts/methods/update';
import replaceProperties from '@scripts/utils/replaceProperties';
import type { Calendar, Options, Reset } from '@src/index';

const set = (self: Calendar, options: Options, resetOptions?: Partial<Reset>) => {
  replaceProperties(self, options);
  if (self.context.isInit) update(self, resetOptions);
};

export default set;
