import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';

const reset = (self: VanillaCalendar) => {
	if (!self.isInit) throw new Error(messages.notInit);
	setVariables(self);
	create(self);
};

export default reset;
