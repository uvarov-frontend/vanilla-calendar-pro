import { IVanillaCalendar } from '../../types';

const calendarInput = (self: IVanillaCalendar) => ({
	hide() {
		(self.HTMLElement as HTMLElement).classList.add(self.CSSClasses.calendarHidden);
	},
	show() {
		(self.HTMLElement as HTMLElement).classList.remove(self.CSSClasses.calendarHidden);
	},
	HTMLInputElement: self.HTMLInputElement as HTMLInputElement,
	HTMLElement: self.HTMLElement as HTMLDivElement,
});

export default calendarInput;
