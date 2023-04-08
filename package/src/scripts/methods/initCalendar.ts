import { IVanillaCalendar } from 'src/types';
import updateCalendar from './updateCalendar';
import handlerInput from './handlerInput';
import clickCalendar from './clickCalendar';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	updateCalendar(self);
	handlerInput(self);
	clickCalendar(self);
};

export default initCalendar;
