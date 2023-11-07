import { IVanillaCalendar } from '../../types';

const destroyCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLOriginalElement) return;
	if (self.input) {
		self.HTMLInputElement?.replaceWith(self.HTMLOriginalElement);
		self.HTMLElement?.parentNode?.removeChild(self.HTMLElement);
	} else {
		self.HTMLElement?.replaceWith(self.HTMLOriginalElement);
	}
	self.HTMLElement = self.HTMLOriginalElement;
};

export default destroyCalendar;
