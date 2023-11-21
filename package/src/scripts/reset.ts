import { IVanillaCalendar } from '@src/types';
import create from '@/package/src/scripts/create';
import setVariablesDates from '@scripts/methods/setVariablesDates';

const reset = (self: IVanillaCalendar) => {
	setVariablesDates(self);
	create(self);
};

export default reset;
