import { IVanillaCalendar } from '../../types';

let currentSelf: null | IVanillaCalendar = null;

const documentClickEvent = (e: MouseEvent) => {
	if (!currentSelf) return;
	if ((e.target as HTMLElement).closest(`.${currentSelf.CSSClasses.calendar}`)) return;
	currentSelf.HTMLElement?.classList.add(currentSelf.CSSClasses.calendarHidden);
	document.removeEventListener('click', documentClickEvent, { capture: true });
};

const handlerInput = (self: IVanillaCalendar) => {
	if (!self || !self.input) return;
	currentSelf = self;
	self.HTMLInputElement?.addEventListener('click', () => {
		self.HTMLElement?.classList.remove(self.CSSClasses.calendarHidden);
		document.addEventListener('click', documentClickEvent, { capture: true });
	});
};

export default handlerInput;
