import VanillaCalendar from '@src/vanilla-calendar';
import visibilityArrows from '@scripts/methods/visibilityArrows';
import createDOM from '@scripts/methods/createDOM';
import visibilityTitle from '@scripts/methods/visibilityTitle';

const createYearEl = (self: VanillaCalendar, templateYearEl: HTMLButtonElement, selectedYear: number, yearDisabled: boolean, i: number) => {
	const yearEl = templateYearEl.cloneNode(false) as HTMLButtonElement;
	yearEl.className = `${self.CSSClasses.yearsYear}${selectedYear === i ? ` ${self.CSSClasses.yearsYearSelected}`
		: yearDisabled ? ` ${self.CSSClasses.yearsYearDisabled}` : ''}`;
	yearEl.dataset.calendarYear = String(i);
	yearEl.title = String(i);
	yearEl.innerText = String(i);
	if (yearDisabled) yearEl.tabIndex = -1;
	return yearEl;
};

const createYears = (self: VanillaCalendar, target?: HTMLElement) => {
	const selectedYear = target?.dataset.calendarSelectedYear ? Number(target?.dataset.calendarSelectedYear) : self.selectedYear as number;
	self.currentType = 'year';
	createDOM(self, target);
	visibilityTitle(self);
	visibilityArrows(self);

	const yearsEl = self.HTMLElement.querySelector(`.${self.CSSClasses.years}`);
	if (!self.settings.selection.year || !yearsEl) return;

	yearsEl.classList.add(self.CSSClasses.yearsSelecting);

	const relationshipID = self.type !== 'multiple' ? 0 : self.selectedYear === selectedYear ? 0 : 1;

	const templateYearEl = document.createElement('button');
	templateYearEl.type = 'button';

	for (let i = (self.viewYear as number) - 7; i < (self.viewYear as number) + 8; i++) {
		const yearDisabled = i < (self.dateMin as Date).getFullYear() + relationshipID || i > (self.dateMax as Date).getFullYear();
		const yearEl = createYearEl(self, templateYearEl, selectedYear, yearDisabled, i);
		yearsEl.append(yearEl);
		if (self.actions.getYears) self.actions.getYears(i, yearEl, self);
	}
};

export default createYears;
