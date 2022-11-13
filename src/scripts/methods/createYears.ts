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

	const yearsEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.styleClass.years}`);
	if (!yearsEl) return;
	if (self.settings.selection.year) (yearsEl as HTMLElement).classList.add(self.styleClass.yearsSelecting);
	const templateYearEl = document.createElement('button');
	templateYearEl.type = 'button';
	templateYearEl.className = self.styleClass.yearsYear;

	for (let i = self.viewYear - 7; i < self.viewYear + 8; i++) {
		const year = i;
		const yearEl = templateYearEl.cloneNode(true);

		if (yearEl instanceof HTMLElement) {
			if (year === self.selectedYear) {
				yearEl.classList.add(self.styleClass.yearsYearSelected);
			}
			if (year < self.dateMin.getUTCFullYear()) {
				yearEl.classList.add(self.styleClass.yearsYearDisabled);
				yearEl.tabIndex = -1;
			}
			if (year > self.dateMax.getUTCFullYear()) {
				yearEl.classList.add(self.styleClass.yearsYearDisabled);
				yearEl.tabIndex = -1;
			}

			yearEl.dataset.calendarYear = String(year);
			yearEl.innerText = `${year}`;
			yearsEl.append(yearEl);
		}
	}
};

export default createYears;
