import { IVanillaCalendar } from '@src/types';

const destroyCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLOriginalElement) return;

	if (self.input) {
		self.HTMLElement?.parentNode?.removeChild(self.HTMLElement);
		self.HTMLInputElement?.replaceWith(self.HTMLOriginalElement);
		self.HTMLInputElement = undefined;
	} else {
		self.HTMLElement?.replaceWith(self.HTMLOriginalElement);
	}

	self.HTMLElement = self.HTMLOriginalElement;
};

export default destroyCalendar;
