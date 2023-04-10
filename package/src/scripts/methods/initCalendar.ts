import { IVanillaCalendar } from 'src/types';
import updateCalendar from './updateCalendar';
import handlerInput from './handlerInput';
import clickCalendar from './clickCalendar';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	if (self.input) {
		const createHTMLElement = document.createElement('div');
		createHTMLElement.className = self.CSSClasses.calendarHidden;
		self.HTMLInputElement = self.HTMLElement as HTMLElement;
		self.HTMLElement = createHTMLElement;
		self.HTMLInputElement?.parentNode?.insertBefore(createHTMLElement, (self.HTMLElement as HTMLElement).nextSibling);
	}
	updateCalendar(self);
	handlerInput(self);
	clickCalendar(self);
};

export default initCalendar;
