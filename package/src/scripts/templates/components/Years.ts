import type VanillaCalendar from '@src/vanilla-calendar';

const Years = (self: VanillaCalendar) =>
  `<div class="${self.CSSClasses.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${self.locale.ariaLabels.years}"></div>`;

export default Years;