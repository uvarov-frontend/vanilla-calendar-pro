import type VanillaCalendar from '@src/vanilla-calendar';

const ControlTime = (self: VanillaCalendar) =>
  self.settings.selection.time
    ? `<div class="${self.CSSClasses.time}" data-vc="time" role="group" aria-label="${self.labels.selectingTime}"></div>`
    : '';

export default ControlTime;
