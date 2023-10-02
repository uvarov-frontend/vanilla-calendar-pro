import { IVanillaCalendar } from '../../types';
import createDOM from './createDOM';
import showMonth from './showMonth';
import showYear from './showYear';

const createMonths = (self: IVanillaCalendar, target?: HTMLElement) => {
	const selectedMonth = target?.dataset.calendarSelectedMonth ? Number(target?.dataset.calendarSelectedMonth) : self.selectedMonth as number;
	self.currentType = 'month';
	createDOM(self, target);
	showMonth(self);
	showYear(self);

	const monthsEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.months}`);
	if (self.selectedYear === undefined || !self.dateMin || !self.dateMax || !monthsEl) return;

	if (self.settings.selection.month) monthsEl.classList.add(self.CSSClasses.monthsSelecting);

	const activeMonthsID = self.locale.months
		.map((_, i) => selectedMonth - self.jumpMonths * i)
		.concat(self.locale.months.map((_, i) => selectedMonth + self.jumpMonths * i))
		.filter((monthID) => monthID >= 0 && monthID <= 12);
	const templateMonthEl = document.createElement('button');
	templateMonthEl.type = 'button';
	templateMonthEl.className = self.CSSClasses.monthsMonth;

	for (let i = 0; i < self.locale.months.length; i++) {
		const month = self.locale.months[i];
		const monthEl = templateMonthEl.cloneNode(true) as HTMLButtonElement;

		if (i === selectedMonth) {
			monthEl.classList.add(self.CSSClasses.monthsMonthSelected);
		}

		if ((i < self.dateMin.getMonth() && self.selectedYear === self.dateMin.getFullYear())
			|| (i > self.dateMax.getMonth() && self.selectedYear === self.dateMax.getFullYear())
			|| (i !== selectedMonth && !activeMonthsID.includes(i))) {
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
