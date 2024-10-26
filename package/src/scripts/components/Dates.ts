import type VanillaCalendar from '@src/vanilla-calendar';

const Dates = (self: VanillaCalendar) =>
  `<div class="${self.CSSClasses.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${self.locale.ariaLabels.dates}" ${self.type === 'multiple' ? 'aria-multiselectable' : ''} ></div>`;

export default Dates;
