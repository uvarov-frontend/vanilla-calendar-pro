import type { VanillaCalendar } from '@src/vanilla-calendar';

const hide = (self: VanillaCalendar) => {
  if (!self.private.currentType) return;
  self.private.mainElement.dataset.vcCalendarHidden = '';
  if (self.onHide) self.onHide(self);
};

export default hide;
