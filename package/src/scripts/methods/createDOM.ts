import { IVanillaCalendar } from '../../types';
import { DOMParser, MultipleParser } from '../helpers/parserComponent';

const createDOM = (self: IVanillaCalendar, target?: HTMLElement) => {
	const calendarElement = (self.HTMLElement as HTMLElement);
	calendarElement.classList.add(self.CSSClasses.calendar);

	const switcherTypeMultiple = (columnClass: string, DOMTemplates: string) => {
		if (!target) return;
		const controls = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.controls}`);
		if (controls) (self.HTMLElement as HTMLElement).removeChild(controls);
		const grid = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.grid}`) as HTMLElement;
		grid.classList.add(self.CSSClasses.gridDisabled);
		const columnElement = target.closest(`.${self.CSSClasses.column}`) as HTMLElement;
		columnElement.classList.add(columnClass);
		columnElement.innerHTML = DOMParser(self, DOMTemplates);
	};

	switch (self.currentType) {
		case 'default':
			calendarElement.classList.add(self.CSSClasses.calendarDefault);
			calendarElement.classList.remove(self.CSSClasses.calendarMonth);
			calendarElement.classList.remove(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.default);
			break;
		case 'multiple':
			if (!self.correctMonths) break;
			calendarElement.classList.add(self.CSSClasses.calendarMultiple);
			calendarElement.classList.remove(self.CSSClasses.calendarMonth);
			calendarElement.classList.remove(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = MultipleParser(self, DOMParser(self, self.DOMTemplates.multiple));
			break;
		case 'month':
			if (self.type === 'multiple') {
				switcherTypeMultiple(self.CSSClasses.columnMonth, self.DOMTemplates.month);
				break;
			}
			calendarElement.classList.remove(self.CSSClasses.calendarDefault);
			calendarElement.classList.add(self.CSSClasses.calendarMonth);
			calendarElement.classList.remove(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.month);
			break;
		case 'year':
			if (self.type === 'multiple') {
				switcherTypeMultiple(self.CSSClasses.columnYear, self.DOMTemplates.year);
				break;
			}
			calendarElement.classList.remove(self.CSSClasses.calendarDefault);
			calendarElement.classList.remove(self.CSSClasses.calendarMonth);
			calendarElement.classList.add(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.year);
			break;
		// no default
	}
};

export default createDOM;
