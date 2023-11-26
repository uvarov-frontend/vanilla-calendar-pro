import VanillaCalendar from '@scripts/vanilla-calendar';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';

const reset = (self: VanillaCalendar) => {
	setVariables(self);
	create(self);
};

export default reset;
