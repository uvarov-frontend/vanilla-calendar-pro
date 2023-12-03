import VanillaCalendar from '@src/vanilla-calendar';

const handleClickWeekNumber = (self: VanillaCalendar, event: MouseEvent) => {
	if (!self.settings.visibility.weekNumbers || !self.actions.clickWeekNumber) return;

	const weekNumberEl: HTMLElement | null = (event.target as HTMLElement).closest(`.${self.CSSClasses.weekNumber}`);
	const daysToWeeks: NodeListOf<HTMLElement> | undefined = self.HTMLElement?.querySelectorAll('[data-calendar-week-number]');

	if (!weekNumberEl || !daysToWeeks) return;

	const weekNumberValue = Number(weekNumberEl.innerText);
	const yearWeek = Number(weekNumberEl.dataset.calendarYearWeek);
	const daysOfThisWeek = [...daysToWeeks].filter((day) => Number((day as HTMLElement).dataset.calendarWeekNumber) === weekNumberValue);

	self.actions.clickWeekNumber(event, weekNumberValue, daysOfThisWeek, yearWeek, self);
};

export default handleClickWeekNumber;
