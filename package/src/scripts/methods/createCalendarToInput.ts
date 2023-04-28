import { IVanillaCalendar } from '../../types';

const createCalendarToInput = (self: IVanillaCalendar) => {
	if (!self.input || !self.HTMLElement || !self.HTMLElement.parentNode) return;
	self.HTMLInputElement = self.HTMLElement as HTMLElement;

	const wrapper = document.createElement('div');
	const calendar = document.createElement('div');
	wrapper.className = self.CSSClasses.calendarInputWrapper;
	calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;

	self.HTMLElement.parentNode.insertBefore(wrapper, self.HTMLInputElement);
	wrapper.append(self.HTMLInputElement);
	self.HTMLElement = calendar;
	wrapper.append(self.HTMLElement);
};

export default createCalendarToInput;
