import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const WeekNumbers = (self: Calendar) =>
  self.enableWeekNumbers
    ? `<div class="${escapeHTML(self.styles.weekNumbers)}" data-vc-week="numbers" role="group" aria-label="${escapeHTML(self.labels.weekNumber)}"></div>`
    : '';

export default WeekNumbers;
