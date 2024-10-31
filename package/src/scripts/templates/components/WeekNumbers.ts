import type VanillaCalendar from '@src/vanilla-calendar';

const WeekNumbers = (self: VanillaCalendar) =>
  self.settings.visibility.weekNumbers
    ? `<div class="${self.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${self.labels.weekNumber}"></div>`
    : '';

export default WeekNumbers;
