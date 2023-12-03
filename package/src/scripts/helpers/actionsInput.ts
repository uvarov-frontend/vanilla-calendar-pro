import VanillaCalendar from '@src/vanilla-calendar';

const actionsInput = (self: VanillaCalendar) => ({
	hide() {
		self.HTMLElement.classList.add(self.CSSClasses.calendarHidden);
		if (self.actions.hideCalendar) self.actions.hideCalendar(self);
	},
	show() {
		self.HTMLElement.classList.remove(self.CSSClasses.calendarHidden);
		if (self.actions.showCalendar) self.actions.showCalendar(self);
	},
	self,
});

export default actionsInput;
