import type { VanillaCalendarPro } from '@src/index';

const Dates = (self: VanillaCalendarPro) =>
  `<div class="${self.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${self.labels.dates}" ${self.viewType === 'multiple' ? 'aria-multiselectable' : ''}></div>`;

export default Dates;
