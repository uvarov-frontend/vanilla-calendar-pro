import { IVanillaCalendar } from 'src/types';

const showMonth = (self: IVanillaCalendar) => {
	if (self.selectedMonth === undefined) return;
	const month: HTMLElement | null = (self.HTMLElement as HTMLElement).querySelector('[data-calendar-selected-month]');

	if (!month) return;

	month.dataset.calendarSelectedMonth = String(self.selectedMonth);
	month.innerText = self.locale.months[self.selectedMonth];

	if (!self.settings.selection.month) {
		month.tabIndex = -1;
		month.classList.add(self.CSSClasses.monthDisabled);
	} else {
		month.tabIndex = 0;
		month.classList.remove(self.CSSClasses.monthDisabled);
	}
};

export default showMonth;
