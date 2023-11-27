import VanillaCalendar from '@src/vanilla-calendar';

const visibilityMonth = (self: VanillaCalendar, monthEl: HTMLElement, index: number, initDate: Date) => {
	const month = new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth();
	const isSelectionDisabled = self.settings.selection.month === false || self.settings.selection.month === 'only-arrows';

	monthEl.tabIndex = isSelectionDisabled ? -1 : 0;
	monthEl.classList.toggle(self.CSSClasses.monthDisabled, isSelectionDisabled);
	monthEl.setAttribute('data-calendar-selected-month', String(month));
	monthEl.innerText = self.locale.months[month];
};

const visibilityYear = (self: VanillaCalendar, yearEl: HTMLElement, index: number, initDate: Date) => {
	const year = new Date(initDate.setFullYear((self.selectedYear as number), (self.selectedMonth as number) + index)).getFullYear();
	const isSelectionDisabled = self.settings.selection.year === false || self.settings.selection.year === 'only-arrows';

	yearEl.tabIndex = isSelectionDisabled ? -1 : 0;
	yearEl.classList.toggle(self.CSSClasses.yearDisabled, isSelectionDisabled);
	yearEl.setAttribute('data-calendar-selected-year', String(year));
	yearEl.innerText = String(year);
};

const visibilityTitle = (self: VanillaCalendar) => {
	const monthEls: NodeListOf<HTMLElement> | undefined = self.HTMLElement?.querySelectorAll('[data-calendar-selected-month]');
	const yearEls: NodeListOf<HTMLElement> | undefined = self.HTMLElement?.querySelectorAll('[data-calendar-selected-year]');

	if (!monthEls?.[0] && yearEls?.[0]) return;

	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);
	monthEls?.forEach((monthEl, index: number) => visibilityMonth(self, monthEl, index, initDate));
	yearEls?.forEach((yearEl, index: number) => visibilityYear(self, yearEl, index, initDate));
};

export default visibilityTitle;
