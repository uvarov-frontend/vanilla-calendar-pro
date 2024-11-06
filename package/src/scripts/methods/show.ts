import type { Calendar } from '@src/index';

const show = (self: Calendar) => {
  if (!self.context.currentType) {
    self.context.mainElement.click();
    return;
  }
  self.context.mainElement.removeAttribute('data-vc-calendar-hidden');
  if (self.onShow) self.onShow(self);
};

export default show;
