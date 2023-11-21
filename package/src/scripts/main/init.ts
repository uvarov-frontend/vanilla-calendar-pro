import { IVanillaCalendar } from '@src/types';
import reset from '@scripts/main/reset';
import handleInput from '@scripts/handles/handleInput';
import handleClick from '@scripts/handles/handleClick';

const init = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	self.HTMLOriginalElement = self.HTMLElement.cloneNode(true) as HTMLElement;
	if (self.input) {
		handleInput(self);
	} else {
		reset(self);
		handleClick(self);
	}
};

export default init;
