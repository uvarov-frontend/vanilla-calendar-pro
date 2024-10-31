import type VanillaCalendar from '@src/vanilla-calendar';

const Dates = (self: VanillaCalendar) =>
  `<div class="${self.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${self.labels.dates}" ${self.type === 'multiple' ? 'aria-multiselectable' : ''}></div>`;

export default Dates;
