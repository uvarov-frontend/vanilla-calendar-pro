import type { VanillaCalendar } from '@src/vanilla-calendar';

const ControlTime = (self: VanillaCalendar) =>
  self.selectionTimeMode ? `<div class="${self.styles.time}" data-vc="time" role="group" aria-label="${self.labels.selectingTime}"></div>` : '';

export default ControlTime;
