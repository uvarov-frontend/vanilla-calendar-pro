import { IVanillaCalendar } from '../../types';

const showMonth = (self: IVanillaCalendar) => {
	const months = (self.HTMLElement as HTMLElement).querySelectorAll('[data-calendar-selected-month]') as NodeListOf<HTMLElement>;
	if (!months[0] || self.selectedMonth === undefined) return;
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	months.forEach((_, index: number) => {
		const selectedMonth = new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth();

		months[index].dataset.calendarSelectedMonth = String(selectedMonth);
		months[index].innerText = self.locale.months[selectedMonth];

		if (!self.settings.selection.month || self.currentType === 'multiple') {
			months[index].tabIndex = -1;
			months[index].classList.add(self.CSSClasses.monthDisabled);
		} else {
			months[index].tabIndex = 0;
			months[index].classList.remove(self.CSSClasses.monthDisabled);
		}
	});
};

export default showMonth;
