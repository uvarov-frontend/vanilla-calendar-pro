import { IVanillaCalendar } from '../../types';
import calendarInput from '../helpers/calendarInput';
import clickCalendar from './clickCalendar';
import resetCalendar from './resetCalendar';

const setPositionCalendar = (input: HTMLInputElement, calendar: HTMLElement) => {
	let top = input.offsetHeight;
	let left = 0;

	for (let el: HTMLElement | null = input; el; el = el.offsetParent as HTMLElement) {
		top += el.offsetTop || 0;
		left += el.offsetLeft || 0;
	}

	Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};

const handlerInput = (self: IVanillaCalendar) => {
	if (!self) return;
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;
	self.HTMLElement = null;

	const createCalendarToInput = () => {
		if (!self.HTMLInputElement) return;

		const calendar = document.createElement('div');
		calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
		setPositionCalendar(self.HTMLInputElement, calendar);
		self.HTMLElement = calendar;
		document.body.append(self.HTMLElement);

		setTimeout(() => calendarInput(self).show(), 0);

		resetCalendar(self);
		clickCalendar(self);
	};

	const documentClickEvent = (e: MouseEvent) => {
		if (!self || e.target === self.HTMLInputElement || self.HTMLElement?.contains(e.target as Node)) return;
		calendarInput(self as IVanillaCalendar).hide();
		document.removeEventListener('click', documentClickEvent, { capture: true });
	};

	self.HTMLInputElement.addEventListener('click', () => {
		if (self.HTMLElement) {
			setPositionCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement);
			calendarInput(self as IVanillaCalendar).show();
		} else {
			createCalendarToInput();
		}
		document.addEventListener('click', documentClickEvent, { capture: true });
	});
};

export default handlerInput;
