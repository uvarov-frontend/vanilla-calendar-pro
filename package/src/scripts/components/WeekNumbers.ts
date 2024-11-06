import type { Calendar } from '@src/index';

const WeekNumbers = (self: Calendar) =>
  self.enableWeekNumbers ? `<div class="${self.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${self.labels.weekNumber}"></div>` : '';

export default WeekNumbers;
