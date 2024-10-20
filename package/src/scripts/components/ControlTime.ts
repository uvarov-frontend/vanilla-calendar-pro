import type VanillaCalendar from '@src/vanilla-calendar';

export const ControlTime = (self: VanillaCalendar) => (self.settings.selection.time ? `<div class="${self.CSSClasses.time}" data-vc="time"></div>` : '');

export default ControlTime;
