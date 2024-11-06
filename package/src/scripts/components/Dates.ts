import type { Calendar } from '@src/index';

const Dates = (self: Calendar) =>
  `<div class="${self.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${self.labels.dates}" ${self.type === 'multiple' ? 'aria-multiselectable' : ''}></div>`;

export default Dates;
