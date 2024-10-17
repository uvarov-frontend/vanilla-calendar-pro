import VanillaCalendar from '@src/vanilla-calendar';

const hide = (self: VanillaCalendar) => {
	if (!self.currentType) return;
	self.HTMLElement.classList.add(self.CSSClasses.calendarHidden);
	if (self.actions.hideCalendar) self.actions.hideCalendar(self);
};

export default hide;
