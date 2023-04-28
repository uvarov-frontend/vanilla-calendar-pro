import { IVanillaCalendar } from '../../types';
import { DOMParser, MultipleParser } from '../helpers/parserComponent';

const createDOM = (self: IVanillaCalendar) => {
	const calendarElement = (self.HTMLElement as HTMLElement);
	calendarElement.classList.add(self.CSSClasses.calendar);

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
			calendarElement.classList.remove(self.CSSClasses.calendarDefault);
			calendarElement.classList.add(self.CSSClasses.calendarMonth);
			calendarElement.classList.remove(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.month);
			break;
		case 'year':
			calendarElement.classList.remove(self.CSSClasses.calendarDefault);
			calendarElement.classList.remove(self.CSSClasses.calendarMonth);
			calendarElement.classList.add(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.year);
			break;
		// no default
	}
};

export default createDOM;
