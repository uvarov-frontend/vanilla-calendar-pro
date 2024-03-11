import { IReset } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';
import reset from '@scripts/reset';

const update = (self: VanillaCalendar, {
	year,
	month,
	dates,
	holidays,
	time,
}: IReset = {}) => {
	if (!self.isInit) throw new Error(messages.notInit);

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
