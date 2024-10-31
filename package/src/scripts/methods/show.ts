import type VanillaCalendar from '@src/vanilla-calendar';

const show = (self: VanillaCalendar) => {
  if (!self.private.currentType) {
    self.HTMLElement.click();
    return;
  }
  self.HTMLElement.removeAttribute('data-vc-calendar-hidden');
  if (self.actions.showCalendar) self.actions.showCalendar(self);
};

export default show;
