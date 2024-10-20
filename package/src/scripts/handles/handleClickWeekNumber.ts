import type VanillaCalendar from '@src/vanilla-calendar';

const handleClickWeekNumber = (self: VanillaCalendar, event: MouseEvent) => {
  if (!self.settings.visibility.weekNumbers || !self.actions.clickWeekNumber) return;

  const weekNumberEl = (event.target as HTMLElement).closest<HTMLElement>('[data-vc="week-numbers"]');
  const daysToWeeks = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-week-number]');

  if (!weekNumberEl || !daysToWeeks) return;

  const weekNumberValue = Number(weekNumberEl.innerText);
  const yearWeek = Number(weekNumberEl.dataset.calendarYearWeek);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number((day as HTMLElement).dataset.vcWeekNumber) === weekNumberValue);

  self.actions.clickWeekNumber(event, weekNumberValue, daysOfThisWeek, yearWeek, self);
};

export default handleClickWeekNumber;
