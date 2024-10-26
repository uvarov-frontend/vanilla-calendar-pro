import type VanillaCalendar from '@src/vanilla-calendar';

const Months = (self: VanillaCalendar) =>
  `<div class="${self.CSSClasses.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${self.locale.ariaLabels.months}"></div>`;

export default Months;
