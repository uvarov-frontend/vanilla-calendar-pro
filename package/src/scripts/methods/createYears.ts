import { IVanillaCalendar } from '@src/types';
import visibilityArrows from '@scripts/methods/visibilityArrows';
import createDOM from '@scripts/methods/createDOM';
import visibilityMonth from '@scripts/methods/visibilityMonth';
import visibilityYear from '@scripts/methods/visibilityYear';

const createYearEl = (self: IVanillaCalendar, templateYearEl: HTMLButtonElement, selectedYear: number, yearDisabled: boolean, i: number) => {
	const yearEl = templateYearEl.cloneNode(false) as HTMLButtonElement;
	yearEl.className = `${self.CSSClasses.yearsYear}${selectedYear === i ? ` ${self.CSSClasses.yearsYearSelected}`
		: yearDisabled ? ` ${self.CSSClasses.yearsYearDisabled}` : ''}`;
	yearEl.dataset.calendarYear = String(i);
	yearEl.title = String(i);
	yearEl.innerText = String(i);
	if (yearDisabled) yearEl.tabIndex = -1;
	return yearEl;
};

const createYears = (self: IVanillaCalendar, target?: HTMLElement) => {
	const selectedYear = target?.dataset.calendarSelectedYear ? Number(target?.dataset.calendarSelectedYear) : self.selectedYear as number;
	self.currentType = 'year';
	createDOM(self, target);
	visibilityMonth(self);
	visibilityYear(self);
	visibilityArrows(self);

	const yearsEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.years}`);
	if (!self.settings.selection.year || !yearsEl) return;

	yearsEl.classList.add(self.CSSClasses.yearsSelecting);

	const relationshipID = self.type !== 'multiple' ? 0 : self.selectedYear === selectedYear ? 0 : 1;

	const templateYearEl = document.createElement('button');
	templateYearEl.type = 'button';

	for (let i = (self.viewYear as number) - 7; i < (self.viewYear as number) + 8; i++) {
		const yearDisabled = i < (self.dateMin as Date).getFullYear() + relationshipID || i > (self.dateMax as Date).getFullYear();
		yearsEl.append(createYearEl(self, templateYearEl, selectedYear, yearDisabled, i));
	}
};

export default createYears;
