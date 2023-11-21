import { IVanillaCalendar } from '@src/types';
import create from '@scripts/create';
import setVariablesDates from '@scripts/methods/setVariablesDates';

const reset = (self: IVanillaCalendar) => {
	setVariablesDates(self);
	create(self);
};

export default reset;
