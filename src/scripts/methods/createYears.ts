import { IVanillaCalendar } from 'src/types';
import controlArrows from './controlArrows';
import createDOM from './createDOM';
import createHeader from './createHeader';

const createYears = (self: IVanillaCalendar) => {
	if (self.viewYear === undefined || !self.dateMin || !self.dateMax) return;
	self.currentType = 'year';
	createDOM(self);
	createHeader(self);
	controlArrows(self);

	const yearsEl = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-years');
	if (!yearsEl) return;
	if (self.settings.selection.year) (yearsEl as HTMLElement).classList.add('vanilla-calendar-years_selecting');
	const templateYearEl = document.createElement('button');
	templateYearEl.type = 'button';
	templateYearEl.className = 'vanilla-calendar-years__year';

	for (let i = self.viewYear - 7; i < self.viewYear + 8; i++) {
		const year = i;
		const yearEl = templateYearEl.cloneNode(true);

		if (yearEl instanceof HTMLElement) {
			if (year === self.selectedYear) {
				yearEl.classList.add('vanilla-calendar-years__year_selected');
			}
			if (year < self.dateMin.getUTCFullYear()) {
				yearEl.classList.add('vanilla-calendar-years__year_disabled');
				yearEl.tabIndex = -1;
			}
			if (year > self.dateMax.getUTCFullYear()) {
				yearEl.classList.add('vanilla-calendar-years__year_disabled');
				yearEl.tabIndex = -1;
			}

			yearEl.dataset.calendarYear = String(year);
			yearEl.innerText = `${year}`;
			yearsEl.append(yearEl);
		}
	}
};

export default createYears;
