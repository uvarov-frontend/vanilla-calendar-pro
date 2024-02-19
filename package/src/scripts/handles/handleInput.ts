import VanillaCalendar from '@src/vanilla-calendar';
import actionsInput from '@scripts/helpers/actionsInput';
import handleClick from '@scripts/handles/handleClick';
import update from '@scripts/update';
import { IVisibility, CSSClasses } from '@/package/types';

const setPositionCalendar = (input: HTMLInputElement, calendar: HTMLElement, position: IVisibility['positionToInput'], css: CSSClasses) => {
	const getPosition = {
		top: -calendar.offsetHeight,
		bottom: input.offsetHeight,
		left: 0,
		center: input.offsetWidth / 2 - calendar.offsetWidth / 2,
		right: input.offsetWidth - calendar.offsetWidth,
	};

	const YPosition = !Array.isArray(position) ? 'bottom' : position[0];
	const XPosition = !Array.isArray(position) ? position : position[1];

	calendar.classList.add(YPosition === 'bottom' ? css.calendarToInputBottom : css.calendarToInputTop);

	const inputRect = input.getBoundingClientRect();
	const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
	const scrollTop = window.scrollY || document.documentElement.scrollTop;

	const top = inputRect.top + scrollTop + getPosition[YPosition];
	const left = inputRect.left + scrollLeft + getPosition[XPosition];

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
			setPositionCalendar(self.HTMLInputElement as HTMLInputElement, calendar, self.settings.visibility.positionToInput, self.CSSClasses);
			actionsInput(self).show();
		}, 0);
		update(self, {
			year: true, month: true, dates: true, holidays: true, time: true,
		});

		return handleClick(self);
	};

	const handleResize = () => setPositionCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement, self.settings.visibility.positionToInput, self.CSSClasses);

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
			setPositionCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement, self.settings.visibility.positionToInput, self.CSSClasses);
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
