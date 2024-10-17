import { IReset } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import createCalendarToInput from '@scripts/helpers/createCalendarToInput';
import messages from '@scripts/helpers/getMessages';
import reset from '@scripts/methods/reset';

const update = (self: VanillaCalendar, {
	year,
	month,
	dates,
	holidays,
	time,
}: IReset = {}) => {
	if (!self.isInit) throw new Error(messages.notInit);

	if (self.input && !self.isInputInit) {
		createCalendarToInput(self, false);
	}
	reset(self, {
		year,
		month,
		dates,
		holidays,
		time,
	});
	if (self.actions.updateCalendar) self.actions.updateCalendar(self);
};

export default update;
