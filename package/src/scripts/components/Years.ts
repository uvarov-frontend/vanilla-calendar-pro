import type { Calendar } from '@src/index';

const Years = (self: Calendar) =>
  `<div class="${self.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${self.labels.years}"></div>`;

export default Years;
