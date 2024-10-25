import type VanillaCalendar from '@src/vanilla-calendar';

export const handleClickWeekNumber = (self: VanillaCalendar, event: MouseEvent) => {
  if (!self.settings.visibility.weekNumbers || !self.actions.clickWeekNumber) return;

  const weekNumberEl = (event.target as HTMLElement).closest<HTMLElement>('[data-vc-week-number]');
  const daysToWeeks = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-date-week-number]');

  if (!weekNumberEl || !daysToWeeks[0]) return;

  const weekNumberValue = Number(weekNumberEl.innerText);
  const yearWeek = Number(weekNumberEl.dataset.vcWeekYear);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number((day as HTMLElement).dataset.vcDateWeekNumber) === weekNumberValue);

  self.actions.clickWeekNumber(event, weekNumberValue, daysOfThisWeek, yearWeek, self);
};

export const handleClickWeekDay = (self: VanillaCalendar, event: MouseEvent) => {
  if (!self.actions.clickWeekDay) return;

  const weekDayEl = (event.target as HTMLElement).closest<HTMLElement>('[data-vc-week-day]');
  const daysToWeeks = self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc-date-week-day]');

  if (!weekDayEl || !daysToWeeks[0]) return;

  const weekDayValue = Number(weekDayEl.dataset.vcWeekDay);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number((day as HTMLElement).dataset.vcDateWeekDay) === weekDayValue);

  self.actions.clickWeekDay(event, weekDayValue, daysOfThisWeek, self);
};
