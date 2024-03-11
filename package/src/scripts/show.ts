import VanillaCalendar from '@src/vanilla-calendar';

const show = (self: VanillaCalendar) => {
	if (!self.currentType) {
		self.HTMLElement.click();
		return;
	}
	self.HTMLElement.classList.remove(self.CSSClasses.calendarHidden);
	if (self.actions.showCalendar) self.actions.showCalendar(self);
};

export default show;
