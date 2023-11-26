import VanillaCalendar from '@scripts/vanilla-calendar';
import actionsInput from '@scripts/helpers/actionsInput';
import handleClick from '@scripts/handles/handleClick';
import reset from '@scripts/reset';

const setPositionCalendar = (input: HTMLInputElement, calendar: HTMLElement) => {
	let top = input.offsetHeight;
	let left = 0;

	for (let el: HTMLElement | null = input; el; el = el.offsetParent as HTMLElement) {
		top += el.offsetTop || 0;
		left += el.offsetLeft || 0;
	}

	Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};

const handleInput = (self: VanillaCalendar) => {
	let firstInit = true;
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;

	const createCalendarToInput = () => {
		const calendar = document.createElement('div');
		calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
		setPositionCalendar(self.HTMLInputElement as HTMLInputElement, calendar);
		self.HTMLElement = calendar;
		document.body.append(self.HTMLElement);
		firstInit = false;

		setTimeout(() => actionsInput(self).show(), 0);

		reset(self);
		handleClick(self);
	};

	const documentClickEvent = (e: MouseEvent) => {
		if (!self || e.target === self.HTMLInputElement || self.HTMLElement?.contains(e.target as Node)) return;
		if (self.HTMLInputElement && self.HTMLElement) actionsInput(self as VanillaCalendar).hide();
		document.removeEventListener('click', documentClickEvent, { capture: true });
	};

	self.HTMLInputElement.addEventListener('click', () => {
		if (firstInit) {
			createCalendarToInput();
		} else {
			setPositionCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement);
			actionsInput(self as VanillaCalendar).show();
		}
		document.addEventListener('click', documentClickEvent, { capture: true });
	});
};

export default handleInput;
