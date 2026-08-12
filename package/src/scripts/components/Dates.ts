import type { Calendar } from '@src/index';

const Dates = (self: Calendar) => `<div class="${self.styles.dates}" data-vc="dates" role="rowgroup" aria-label="${self.labels.dates}"></div>`;

export default Dates;
