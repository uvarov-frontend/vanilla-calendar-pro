import type { VanillaCalendarPro } from '@src/index';

const hide = (self: VanillaCalendarPro) => {
  if (!self.context.currentType) return;
  self.context.mainElement.dataset.vcCalendarHidden = '';
  if (self.onHide) self.onHide(self);
};

export default hide;
