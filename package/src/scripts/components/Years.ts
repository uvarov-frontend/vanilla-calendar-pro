import type { VanillaCalendarPro } from '@src/index';

const Years = (self: VanillaCalendarPro) =>
  `<div class="${self.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${self.labels.years}"></div>`;

export default Years;
