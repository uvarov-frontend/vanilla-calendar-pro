import { IVanillaCalendar } from '../../types';
import setVariablesDates from './setVariablesDates';
import mainMethod from './mainMethod';

const resetCalendar = (self: IVanillaCalendar) => {
	setVariablesDates(self);
	mainMethod(self);
};

export default resetCalendar;
