import VanillaCalendar from '@src/vanilla-calendar';

const destroy = (self: VanillaCalendar) => {
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
