import type VanillaCalendar from '@src/vanilla-calendar';

const WeekNumbers = (self: VanillaCalendar) =>
  self.settings.visibility.weekNumbers
    ? `<div class="${self.CSSClasses.weekNumbers}" data-vc-week="numbers" aria-label="${self.locale.ariaLabels.weekNumber}"></div>`
    : '';

export default WeekNumbers;
