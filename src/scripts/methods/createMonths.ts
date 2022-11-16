import { IVanillaCalendar } from 'src/types';
import createDOM from './createDOM';
import showMonth from './showMonth';
import showYear from './showYear';

const createMonths = (self: IVanillaCalendar) => {
	self.currentType = 'month';
	createDOM(self);
	showMonth(self);
	showYear(self);

	const monthsEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.months}`);
	if (self.selectedMonth === undefined || self.selectedYear === undefined || !self.dateMin || !self.dateMax || !monthsEl) return;

	if (self.settings.selection.month) monthsEl.classList.add(self.CSSClasses.monthsSelecting);

	const templateMonthEl = document.createElement('button');
	templateMonthEl.type = 'button';
	templateMonthEl.className = self.CSSClasses.monthsMonth;

	for (let i = 0; i < self.locale.months.length; i++) {
		const month = self.locale.months[i];
		const monthEl = templateMonthEl.cloneNode(true) as HTMLButtonElement;

		if (i === self.selectedMonth) {
			monthEl.classList.add(self.CSSClasses.monthsMonthSelected);
		}
		if (i < self.dateMin.getUTCMonth() && self.selectedYear === self.dateMin.getUTCFullYear()) {
			monthEl.classList.add(self.CSSClasses.monthsMonthDisabled);
			monthEl.tabIndex = -1;
		}
		if (i > self.dateMax.getUTCMonth() && self.selectedYear === self.dateMax.getUTCFullYear()) {
			monthEl.classList.add(self.CSSClasses.monthsMonthDisabled);
			monthEl.tabIndex = -1;
		}

		monthEl.dataset.calendarMonth = String(i);

		monthEl.title = `${month}`;
		monthEl.innerText = `${self.settings.visibility.monthShort ? month.substring(0, 3) : month}`;
		monthsEl.append(monthEl);
	}
};

export default createMonths;
