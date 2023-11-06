import { IVanillaCalendar } from '../../types';

const calendarInput = (self: IVanillaCalendar) => ({
	hide() {
		(self.HTMLElement as HTMLElement).classList.add(self.CSSClasses.calendarHidden);
		if (self.actions.hideCalendar) self.actions.hideCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement as HTMLElement);
	},
	show() {
		(self.HTMLElement as HTMLElement).classList.remove(self.CSSClasses.calendarHidden);
		if (self.actions.showCalendar) self.actions.showCalendar(self.HTMLInputElement as HTMLInputElement, self.HTMLElement as HTMLElement);
	},
	HTMLInputElement: self.HTMLInputElement as HTMLInputElement,
	HTMLElement: self.HTMLElement as HTMLDivElement,
});

export default calendarInput;
