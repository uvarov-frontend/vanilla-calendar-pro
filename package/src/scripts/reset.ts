import { IVanillaCalendar } from '@src/types';
import create from '@scripts/create';
import setVariables from '@scripts/helpers/setVariables';

const reset = (self: IVanillaCalendar) => {
	setVariables(self);
	create(self);
};

export default reset;
