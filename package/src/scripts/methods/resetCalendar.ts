import { IVanillaCalendar } from 'src/types';
import setVariablesDates from './setVariablesDates';
import updateCalendar from './updateCalendar';

const resetCalendar = (self: IVanillaCalendar) => {
	setVariablesDates(self);
	updateCalendar(self);
};

export default resetCalendar;
