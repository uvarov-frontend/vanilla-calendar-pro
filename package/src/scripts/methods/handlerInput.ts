import { IVanillaCalendar } from '../../types';
import clickCalendar from './clickCalendar';
import resetCalendar from './resetCalendar';
import calendarInput from '../helpers/calendarInput';

let currentSelf: null | IVanillaCalendar = null;

const setPositionCalendar = (input: HTMLInputElement, calendar: HTMLElement) => {
	let top = input.offsetHeight;
	let left = 0;

	for (let el: HTMLElement | null = input; el; el = el.offsetParent as HTMLElement) {
		top += el.offsetTop || 0;
		left += el.offsetLeft || 0;
	}

	Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};

const createCalendarToInput = (self: IVanillaCalendar) => {
	if (!self.HTMLInputElement) return;

	const calendar = document.createElement('div');
	calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
	setPositionCalendar(self.HTMLInputElement, calendar);
	self.HTMLElement = calendar;
	document.body.append(self.HTMLElement);

	setTimeout(() => (self.HTMLElement as HTMLElement).classList.remove(self.CSSClasses.calendarHidden), 0);

	resetCalendar(self);
	clickCalendar(self);
};

const documentClickEvent = (e: MouseEvent) => {
	if (!currentSelf || (e.target as HTMLElement).closest(`.${currentSelf.CSSClasses.calendar}.${currentSelf.CSSClasses.calendarToInput}`)) return;

	const calInput = calendarInput(currentSelf as IVanillaCalendar);
	calInput.hide();
	document.removeEventListener('click', documentClickEvent, { capture: true });
};

const handlerInput = (self: IVanillaCalendar) => {
	if (!self) return;
	currentSelf = self;
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;
	self.HTMLElement = null;

	self.HTMLInputElement.addEventListener('click', () => {
		if (self.HTMLElement && self.HTMLInputElement) {
			setPositionCalendar(self.HTMLInputElement, self.HTMLElement);
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
