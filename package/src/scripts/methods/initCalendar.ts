import { IVanillaCalendar } from '../../types';
import resetCalendar from './resetCalendar';
import handlerInput from './handlerInput';
import clickCalendar from './clickCalendar';
import createCalendarToInput from './createCalendarToInput';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	createCalendarToInput(self);
	resetCalendar(self);
	handlerInput(self);
	clickCalendar(self);
};

export default initCalendar;
