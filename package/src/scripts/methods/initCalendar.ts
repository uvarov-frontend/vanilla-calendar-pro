import { IVanillaCalendar } from '../../types';
import resetCalendar from './resetCalendar';
import handlerInput from './handlerInput';
import clickCalendar from './clickCalendar';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	if (self.input) {
		handlerInput(self);
	} else {
		resetCalendar(self);
		clickCalendar(self);
	}
};

export default initCalendar;
