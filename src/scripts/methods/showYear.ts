import { IVanillaCalendar } from 'src/types';

const showYear = (self: IVanillaCalendar) => {
	if (self.selectedYear === undefined) return;
	const year: HTMLElement | null = (self.HTMLElement as HTMLElement).querySelector('[data-calendar-selected-year]');

	if (!year) return;

	year.dataset.calendarSelectedYear = String(self.selectedYear);
	year.innerText = String(self.selectedYear);

	if (!self.settings.selection.year) {
		year.tabIndex = -1;
		year.classList.add(self.CSSClasses.yearDisabled);
	} else {
		year.tabIndex = 0;
		year.classList.remove(self.CSSClasses.yearDisabled);
	}
};

export default showYear;
