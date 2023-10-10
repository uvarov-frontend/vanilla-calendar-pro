import { IVanillaCalendar } from '../../types';
import clickCalendar from './clickCalendar';
import resetCalendar from './resetCalendar';

let currentSelf: null | IVanillaCalendar = null;

const createCalendarToInput = (self: IVanillaCalendar) => {
	if (!self.HTMLInputElement) return;

	const calendar = document.createElement('div');
	calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
	calendar.style.left = `${self.HTMLInputElement.offsetLeft}px`;
	calendar.style.top = `${self.HTMLInputElement.offsetTop + self.HTMLInputElement.clientHeight}px`;
	self.HTMLElement = calendar;
	document.body.append(self.HTMLElement);

	setTimeout(() => (self.HTMLElement as HTMLElement).classList.remove(self.CSSClasses.calendarHidden), 0);

	resetCalendar(self);
	clickCalendar(self);
};

const documentClickEvent = (e: MouseEvent) => {
	if (!currentSelf || (e.target as HTMLElement).closest(`.${currentSelf.CSSClasses.calendar}.${currentSelf.CSSClasses.calendarToInput}`)) return;
	const calendarEls = document.querySelectorAll(`.${currentSelf.CSSClasses.calendar}.${currentSelf.CSSClasses.calendarToInput}`);
	calendarEls.forEach((calendar) => calendar.classList.add((currentSelf as IVanillaCalendar).CSSClasses.calendarHidden));
	document.removeEventListener('click', documentClickEvent, { capture: true });
};

const handlerInput = (self: IVanillaCalendar) => {
	if (!self) return;
	currentSelf = self;
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;
	self.HTMLElement = null;

	self.HTMLInputElement.addEventListener('click', () => {
		if (self.HTMLElement && self.HTMLInputElement) {
			self.HTMLElement.style.left = `${self.HTMLInputElement.offsetLeft}px`;
			self.HTMLElement.style.top = `${self.HTMLInputElement.offsetTop + self.HTMLInputElement.clientHeight}px`;
			self.HTMLElement.classList.remove(self.CSSClasses.calendarHidden);
		} else if (self.HTMLElement) {
			self.HTMLElement.classList.remove(self.CSSClasses.calendarHidden);
		} else {
			createCalendarToInput(self);
		}
		document.addEventListener('click', documentClickEvent, { capture: true });
	});
};

export default handlerInput;
