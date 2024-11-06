import type { Calendar } from '@src/index';

export const handleClickWeekNumber = (self: Calendar, event: MouseEvent) => {
  if (!self.enableWeekNumbers || !self.onClickWeekNumber) return;

  const weekNumberEl = (event.target as HTMLElement).closest<HTMLElement>('[data-vc-week-number]');
  const daysToWeeks = self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date-week-number]');

  if (!weekNumberEl || !daysToWeeks[0]) return;

  const weekNumberValue = Number(weekNumberEl.innerText);
  const yearWeek = Number(weekNumberEl.dataset.vcWeekYear);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number((day as HTMLElement).dataset.vcDateWeekNumber) === weekNumberValue);

  self.onClickWeekNumber(self, weekNumberValue, yearWeek, daysOfThisWeek, event);
};

export const handleClickWeekDay = (self: Calendar, event: MouseEvent) => {
  if (!self.onClickWeekDay) return;

  const weekDayEl = (event.target as HTMLElement).closest<HTMLElement>('[data-vc-week-day]');
  const columnEl = (event.target as HTMLElement).closest<HTMLElement>('[data-vc="column"]');
  const daysToWeeks = columnEl
    ? columnEl.querySelectorAll<HTMLElement>('[data-vc-date-week-day]')
    : self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date-week-day]');

  if (!weekDayEl || !daysToWeeks[0]) return;

  const weekDayValue = Number(weekDayEl.dataset.vcWeekDay);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number((day as HTMLElement).dataset.vcDateWeekDay) === weekDayValue);

  self.onClickWeekDay(self, weekDayValue, daysOfThisWeek, event);
};
