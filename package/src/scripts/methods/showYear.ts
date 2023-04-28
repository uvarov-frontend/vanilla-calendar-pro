import { IVanillaCalendar } from '../../types';

const showYear = (self: IVanillaCalendar) => {
	const years = (self.HTMLElement as HTMLElement).querySelectorAll('[data-calendar-selected-year]') as NodeListOf<HTMLElement>;
	if (!years || self.selectedMonth === undefined) return;
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	years.forEach((_, index: number) => {
		const selectedYear = new Date(initDate.setFullYear((self.selectedYear as number), (self.selectedMonth as number) + index)).getFullYear();

		years[index].dataset.calendarSelectedYear = String(selectedYear);
		years[index].innerText = String(selectedYear);

		if (!self.settings.selection.year || self.currentType === 'multiple') {
			years[index].tabIndex = -1;
			years[index].classList.add(self.CSSClasses.yearDisabled);
		} else {
			years[index].tabIndex = 0;
			years[index].classList.remove(self.CSSClasses.yearDisabled);
		}
	});
};

export default showYear;
