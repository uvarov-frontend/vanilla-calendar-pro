import { IVanillaCalendar } from '@src/types';

const visibilityMonth = (self: IVanillaCalendar) => {
	const months: NodeListOf<HTMLElement> | undefined = self.HTMLElement?.querySelectorAll('[data-calendar-selected-month]');
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	if (!months?.[0]) return;

	months.forEach((month, index: number) => {
		const selectedMonth = new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth();
		const isMonthSelectionDisabled = self.settings.selection.month === false || self.settings.selection.month === 'only-arrows';

		month.tabIndex = isMonthSelectionDisabled ? -1 : 0;
		month.classList.toggle(self.CSSClasses.monthDisabled, isMonthSelectionDisabled);
		month.dataset.calendarSelectedMonth = String(selectedMonth);
		month.innerText = self.locale.months[selectedMonth];
	});
};

export default visibilityMonth;
