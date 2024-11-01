import type { VanillaCalendarPro } from '@src/index';

const show = (self: VanillaCalendarPro) => {
  if (!self.private.currentType) {
    self.private.mainElement.click();
    return;
  }
  self.private.mainElement.removeAttribute('data-vc-calendar-hidden');
  if (self.onShow) self.onShow(self);
};

export default show;
