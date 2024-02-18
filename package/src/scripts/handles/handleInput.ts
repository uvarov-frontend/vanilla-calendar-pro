import VanillaCalendar from '@src/vanilla-calendar';
import actionsInput from '@scripts/helpers/actionsInput';
import handleClick from '@scripts/handles/handleClick';
import update from '@scripts/update';

const setPositionCalendar = (input: HTMLInputElement, calendar: HTMLElement, position: 'left' | 'center' | 'right') => {
	const inputRect = input.getBoundingClientRect();
	const calendarRect = calendar.getBoundingClientRect();

	const getPosition = {
		left: inputRect.left,
		center: inputRect.left + inputRect.width / 2 - calendarRect.width / 2,
		right: inputRect.right - calendarRect.width,
	};

	const top = inputRect.top + inputRect.height;
	const left = getPosition[position];

	Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};

const handleInput = (self: VanillaCalendar) => {
	let firstInit = true;
	const cleanup: Array<() => void> = [];
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;

	const createCalendarToInput = () => {
		const calendar = document.createElement('div');
		calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
		self.HTMLElement = calendar;
		document.body.append(self.HTMLElement);
		firstInit = false;

		setTimeout(() => {
			setPositionCalendar(self.HTMLInputElement as HTMLInputElement, calendar, self.settings.visibility.positionToInput);
			actionsInput(self).show();
		}, 0);
		update(self, {
			year: true, month: true, dates: true, holidays: true, time: true,
		});

		return handleClick(self);
	};

	const handleResize = () => setPositionCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement, self.settings.visibility.positionToInput);

	const documentClickEvent = (e: MouseEvent) => {
		if (!self || e.target === self.HTMLInputElement || self.HTMLElement?.contains(e.target as Node)) return;
		if (self.HTMLInputElement && self.HTMLElement) actionsInput(self as VanillaCalendar).hide();
		window.removeEventListener('resize', handleResize);
		document.removeEventListener('click', documentClickEvent, { capture: true });
	};

	self.HTMLInputElement.addEventListener('click', () => {
		if (firstInit) {
			cleanup.push(createCalendarToInput());
		} else {
			setPositionCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement, self.settings.visibility.positionToInput);
			actionsInput(self as VanillaCalendar).show();
		}
		window.addEventListener('resize', handleResize);
		document.addEventListener('click', documentClickEvent, { capture: true });
	});

	return () => {
		cleanup.forEach((clean) => clean());
	};
};

export default handleInput;
