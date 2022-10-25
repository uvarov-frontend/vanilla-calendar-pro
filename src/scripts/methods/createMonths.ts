import { IVanillaCalendar } from 'src/types';
import createDOM from './createDOM';
import createHeader from './createHeader';

const createMonths = (self: IVanillaCalendar) => {
	self.currentType = 'month';
	createDOM(self);
	createHeader(self);

	const monthsEl = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-months');
	if (self.selectedMonth === undefined || self.selectedYear === undefined || !self.dateMin || !self.dateMax || !monthsEl) return;

	if (self.settings.selection.month) monthsEl.classList.add('vanilla-calendar-months_selecting');

	const templateMonthEl = document.createElement('button');
	templateMonthEl.type = 'button';
	templateMonthEl.className = 'vanilla-calendar-months__month';

	for (let i = 0; i < self.locale.months.length; i++) {
		const month = self.locale.months[i];
		const monthEl = templateMonthEl.cloneNode(true);

		if (monthEl instanceof HTMLElement) {
			if (i === self.selectedMonth) {
				monthEl.classList.add('vanilla-calendar-months__month_selected');
			}
			if (i < self.dateMin.getUTCMonth() && self.selectedYear === self.dateMin.getUTCFullYear()) {
				monthEl.classList.add('vanilla-calendar-months__month_disabled');
				monthEl.tabIndex = -1;
			}
			if (i > self.dateMax.getUTCMonth() && self.selectedYear === self.dateMax.getUTCFullYear()) {
				monthEl.classList.add('vanilla-calendar-months__month_disabled');
				monthEl.tabIndex = -1;
			}

			monthEl.dataset.calendarMonth = String(i);

			monthEl.title = `${month}`;
			monthEl.innerText = `${self.settings.visibility.monthShort ? month.substring(0, 3) : month}`;
			monthsEl.append(monthEl);
		}
	}
};

export default createMonths;
