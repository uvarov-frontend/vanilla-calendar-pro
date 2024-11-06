import type { Calendar } from '@src/index';

const hide = (self: Calendar) => {
  if (!self.context.currentType) return;
  self.context.mainElement.dataset.vcCalendarHidden = '';
  if (self.onHide) self.onHide(self);
};

export default hide;
