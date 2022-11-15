import { IVanillaCalendar } from 'src/types';
import parserComponent from './parserComponent';

const createDOM = (self: IVanillaCalendar) => {
	const calendarElement = (self.HTMLElement as HTMLElement);
	calendarElement.classList.add(self.CSSClasses.calendar);

	switch (self.currentType) {
		case 'default':
			calendarElement.classList.add(self.CSSClasses.calendarDefault);
			calendarElement.classList.remove(self.CSSClasses.calendarMonth);
			calendarElement.classList.remove(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = parserComponent(self, self.DOMTemplates.default);
			break;
		case 'month':
			calendarElement.classList.remove(self.CSSClasses.calendarDefault);
			calendarElement.classList.add(self.CSSClasses.calendarMonth);
			calendarElement.classList.remove(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = parserComponent(self, self.DOMTemplates.month);
			break;
		case 'year':
			calendarElement.classList.remove(self.CSSClasses.calendarDefault);
			calendarElement.classList.remove(self.CSSClasses.calendarMonth);
			calendarElement.classList.add(self.CSSClasses.calendarYear);
			calendarElement.innerHTML = parserComponent(self, self.DOMTemplates.year);
			break;
		// no default
	}
};

export default createDOM;
