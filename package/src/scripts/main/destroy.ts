import { IVanillaCalendar } from '@src/types';

const destroy = (self: IVanillaCalendar) => {
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

export default destroy;
