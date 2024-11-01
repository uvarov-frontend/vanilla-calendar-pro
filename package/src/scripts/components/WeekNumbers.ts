import type { VanillaCalendarPro } from '@src/index';

const WeekNumbers = (self: VanillaCalendarPro) =>
  self.enableWeekNumbers ? `<div class="${self.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${self.labels.weekNumber}"></div>` : '';

export default WeekNumbers;
