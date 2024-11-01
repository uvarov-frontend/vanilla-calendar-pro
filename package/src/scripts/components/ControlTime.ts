import type { VanillaCalendarPro } from '@src/index';

const ControlTime = (self: VanillaCalendarPro) =>
  self.selectionTimeMode ? `<div class="${self.styles.time}" data-vc="time" role="group" aria-label="${self.labels.selectingTime}"></div>` : '';

export default ControlTime;
