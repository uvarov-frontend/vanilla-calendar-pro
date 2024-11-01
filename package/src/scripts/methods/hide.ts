import type { VanillaCalendarPro } from '@src/index';

const hide = (self: VanillaCalendarPro) => {
  if (!self.private.currentType) return;
  self.private.mainElement.dataset.vcCalendarHidden = '';
  if (self.onHide) self.onHide(self);
};

export default hide;
