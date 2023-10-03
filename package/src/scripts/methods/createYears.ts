import { IVanillaCalendar } from '../../types';
import controlArrows from './controlArrows';
import createDOM from './createDOM';
import showMonth from './showMonth';
import showYear from './showYear';

const createYears = (self: IVanillaCalendar, target?: HTMLElement) => {
	if (self.viewYear === undefined || !self.dateMin || !self.dateMax) return;
	const selectedYear = target?.dataset.calendarSelectedYear ? Number(target?.dataset.calendarSelectedYear) : self.selectedYear as number;
	self.currentType = 'year';
	createDOM(self, target);
	showMonth(self);
	showYear(self);
	controlArrows(self);

	const yearsEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.years}`);
	if (!yearsEl) return;
	if (self.settings.selection.year) (yearsEl as HTMLElement).classList.add(self.CSSClasses.yearsSelecting);
	const templateYearEl = document.createElement('button');
	templateYearEl.type = 'button';
	templateYearEl.className = self.CSSClasses.yearsYear;

	const relationshipID = () => {
		if (self.type !== 'multiple') return 0;
		return self.selectedYear === selectedYear ? 0 : 1;
	};

	for (let i = self.viewYear - 7; i < self.viewYear + 8; i++) {
		const year = i;
		const yearEl = templateYearEl.cloneNode(true) as HTMLButtonElement;

		if (year === selectedYear) {
			yearEl.classList.add(self.CSSClasses.yearsYearSelected);
		}

		if (year < self.dateMin.getFullYear() + relationshipID() || year > self.dateMax.getFullYear()) {
			yearEl.classList.add(self.CSSClasses.yearsYearDisabled);
			yearEl.tabIndex = -1;
		}

		yearEl.dataset.calendarYear = String(year);
		yearEl.innerText = `${year}`;
		yearsEl.append(yearEl);
	}
};

export default createYears;
