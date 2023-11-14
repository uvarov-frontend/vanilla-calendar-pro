import { IVanillaCalendar } from '@src/types';
import handlerInput from '@methods/handlerInput';
import resetCalendar from '@methods/resetCalendar';
import handleClick from '@methods/handles/handleClick';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	self.HTMLOriginalElement = self.HTMLElement.cloneNode(true) as HTMLElement;
	if (self.input) {
		handlerInput(self);
	} else {
		resetCalendar(self);
		handleClick(self);
	}
};

export default initCalendar;
