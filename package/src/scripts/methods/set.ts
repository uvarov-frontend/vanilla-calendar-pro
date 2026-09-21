import update from '@scripts/methods/update';
import { getReusableRender } from '@scripts/utils/renderState';
import replaceProperties from '@scripts/utils/replaceProperties';
import { validateExtensions } from '@src/extension';
import type { Calendar, Options, Reset } from '@src/index';

const set = (self: Calendar, options: Options, resetOptions?: Partial<Reset>) => {
  validateExtensions(self, options);
  const keys = Object.keys(options);
  if (options.extensions) keys.splice(keys.indexOf('extensions'), 1);
  const reuse = keys.length === 1 && keys[0] === 'selectedDates' ? getReusableRender(self) : undefined;
  replaceProperties(self, options, 'extensions');
  if (self.context.isInit) update(self, resetOptions, reuse);
};

export default set;
