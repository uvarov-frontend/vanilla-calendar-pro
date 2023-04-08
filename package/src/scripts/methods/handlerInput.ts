import { IVanillaCalendar } from 'src/types';

const handlerInput = (self: IVanillaCalendar) => {
	if (!self || !self.input) return;
	self.HTMLInputElement?.addEventListener('click', () => {

	});
};

export default handlerInput;
