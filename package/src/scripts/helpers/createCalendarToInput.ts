import VanillaCalendar from '@src/vanilla-calendar';
import handleClick from '@scripts/handles/handleClick';
import { setPositionCalendar } from '@scripts/helpers/position';
import reset from '@scripts/reset';

const createCalendarToInput = (self: VanillaCalendar, isVisible = true) => {
	self.isInputInit = true;
	const calendar = document.createElement('div');
	calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
	self.HTMLElement = calendar;
	document.body.appendChild(self.HTMLElement);

	// because of a positioning delay, it might flicker for a short period
	// we can hide the picker, reposition it, and finally show it back to avoid flickering because of the positioning delay below
	self.HTMLElement.style.visibility = 'hidden';

	if (isVisible) {
		queueMicrotask(() => {
			setPositionCalendar(self.HTMLInputElement, calendar, self.settings.visibility.positionToInput, self.CSSClasses, self.minimumWidth);
			self.HTMLElement.style.visibility = 'visible';
			self.show();
		});
	}
	reset(self, {
		year: true, month: true, dates: true, holidays: true, time: true,
	});
	if (self.actions.initCalendar) self.actions.initCalendar(self);
	return handleClick(self);
};

export default createCalendarToInput;
