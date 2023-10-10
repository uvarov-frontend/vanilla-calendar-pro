import { IVanillaCalendar } from '../../types';

const createCalendarToInput = (self: IVanillaCalendar) => {
	if (!self.input || !self.HTMLElement || !self.HTMLElement.parentNode) return;
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;

	const calendar = document.createElement('div');
	calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
	self.HTMLElement = calendar;
	document.body.append(self.HTMLElement);
};

export default createCalendarToInput;
