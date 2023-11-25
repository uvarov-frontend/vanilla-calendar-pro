import { IVanillaCalendar } from '@src/types';

const visibilityYear = (self: IVanillaCalendar) => {
	const years: NodeListOf<HTMLElement> | undefined = self.HTMLElement?.querySelectorAll('[data-calendar-selected-year]');
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	if (!years?.[0]) return;

	years.forEach((year, index: number) => {
		const selectedYear = new Date(initDate.setFullYear((self.selectedYear as number), (self.selectedMonth as number) + index)).getFullYear();
		const isYearSelectionDisabled = self.settings.selection.year === false || self.settings.selection.year === 'only-arrows';

		year.tabIndex = isYearSelectionDisabled ? -1 : 0;
		year.classList.toggle(self.CSSClasses.yearDisabled, isYearSelectionDisabled);
		year.dataset.calendarSelectedYear = String(selectedYear);
		year.innerText = String(selectedYear);
	});
};

export default visibilityYear;
