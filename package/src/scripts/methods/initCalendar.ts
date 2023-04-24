import { IVanillaCalendar } from 'src/types';
import setVariablesDates from './setVariablesDates';
import updateCalendar from './updateCalendar';
import handlerInput from './handlerInput';
import clickCalendar from './clickCalendar';
import createCalendarToInput from './createCalendarToInput';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	createCalendarToInput(self);
	setVariablesDates(self);
	updateCalendar(self);
	handlerInput(self);
	clickCalendar(self);
};

export default initCalendar;
