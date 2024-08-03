import VanillaCalendar from '@src/vanilla-calendar';
import handleClick from '@scripts/handles/handleClick';
import reset from '@scripts/reset';
import { findBestPickerPosition, getOffset } from '@scripts/helpers/position';
import { IVisibility, CSSClasses } from '@/package/types';

const setPositionCalendar = (input: HTMLInputElement | undefined, calendar: HTMLElement, position: IVisibility['positionToInput'], css: CSSClasses) => {
	if (input) {
		const pos = position === 'auto'
			? findBestPickerPosition(input, calendar)
			: position;

		const getPosition = {
			top: -calendar.offsetHeight,
			bottom: input.offsetHeight,
			left: 0,
			center: input.offsetWidth / 2 - calendar.offsetWidth / 2,
			right: input.offsetWidth - calendar.offsetWidth,
		};

		const YPosition = !Array.isArray(pos) ? 'bottom' : pos[0];
		const XPosition = !Array.isArray(pos) ? pos : pos[1];

		// add CSS class to extra margin but make sure to only keep 1 class and remove previous one
		if (YPosition === 'bottom') {
			calendar.classList.remove(css.calendarToInputTop);
			calendar.classList.add(css.calendarToInputBottom);
		} else {
			calendar.classList.remove(css.calendarToInputBottom);
			calendar.classList.add(css.calendarToInputTop);
		}

		const { top: offsetTop, left: offsetLeft } = getOffset(input);
		const top = offsetTop + getPosition[YPosition];
		const left = offsetLeft + getPosition[XPosition];

		Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
	}
};

const handleInput = (self: VanillaCalendar) => {
	let firstInit = true;
	const cleanup: Array<() => void> = [];
	self.HTMLInputElement = self.HTMLElement as HTMLInputElement;

	const createCalendarToInput = () => {
		const calendar = document.createElement('div');
		calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
		self.HTMLElement = calendar;
		document.body.appendChild(self.HTMLElement);
		firstInit = false;

		// because of a positioning delay, it might flicker for a short period
		// we can hide the picker, reposition it, and finally show it back to avoid flickering because of the positioning delay below
		self.HTMLElement.style.visibility = 'hidden';

		setTimeout(() => {
			setPositionCalendar(self.HTMLInputElement, calendar, self.settings.visibility.positionToInput, self.CSSClasses);
			self.HTMLElement.style.visibility = 'visible';
			self.show();
		}, 0);
		reset(self, {
			year: true, month: true, dates: true, holidays: true, time: true,
		});
		if (self.actions.initCalendar) self.actions.initCalendar(self);
		return handleClick(self);
	};

	const handleResize = () => setPositionCalendar(self.HTMLInputElement, self.HTMLElement, self.settings.visibility.positionToInput, self.CSSClasses);

	const documentClickEvent = (e: MouseEvent) => {
		if (!self || e.target === self.HTMLInputElement || self.HTMLElement?.contains(e.target as Node)) return;
		if (self.HTMLInputElement && self.HTMLElement) self.hide();
		window.removeEventListener('resize', handleResize);
		document.removeEventListener('click', documentClickEvent, { capture: true });
	};

	self.HTMLInputElement.addEventListener('click', () => {
		if (firstInit) {
			cleanup.push(createCalendarToInput());
		} else {
			setPositionCalendar(self.HTMLInputElement, self.HTMLElement, self.settings.visibility.positionToInput, self.CSSClasses);
			self.show();
		}
		window.addEventListener('resize', handleResize);
		document.addEventListener('click', documentClickEvent, { capture: true });
	});
	return () => {
		cleanup.forEach((clean) => clean());
	};
};
export default handleInput;
