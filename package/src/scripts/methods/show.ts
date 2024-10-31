import type VanillaCalendar from '@src/vanilla-calendar';

const show = (self: VanillaCalendar) => {
  if (!self.private.currentType) {
    self.private.mainElement.click();
    return;
  }
  self.private.mainElement.removeAttribute('data-vc-calendar-hidden');
  if (self.onShow) self.onShow(self);
};

export default show;
