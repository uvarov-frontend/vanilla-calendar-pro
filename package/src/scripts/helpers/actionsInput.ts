import { IVanillaCalendar } from '@src/types';

const actionsInput = (self: IVanillaCalendar) => ({
	hide() {
		self.HTMLElement.classList.add(self.CSSClasses.calendarHidden);
		if (self.actions.hideCalendar) self.actions.hideCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement);
	},
	show() {
		self.HTMLElement.classList.remove(self.CSSClasses.calendarHidden);
		if (self.actions.showCalendar) self.actions.showCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement);
	},
	HTMLInputElement: self.HTMLInputElement as HTMLInputElement,
	HTMLElement: self.HTMLElement,
});

export default actionsInput;
