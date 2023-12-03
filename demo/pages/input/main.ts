// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';

// import '@/package/build/vanilla-calendar.min.css';
// import '@/package/build/themes/light.min.css';
// import '@/package/build/themes/dark.min.css';

import { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';
import '@src/styles/themes/light.css';
import '@src/styles/themes/dark.css';

const configInput: IOptions = {
	input: true,
	actions: {
		changeToInput(e, calendar, self) {
			if (!self.selectedDates || !self.HTMLInputElement) return;
			if (self.selectedDates[0]) {
				self.HTMLInputElement.value = self.selectedDates[0];
			} else {
				self.HTMLInputElement.value = '';
			}
			calendar.hide();
		},
	},
};

const configDiv: IOptions = {
	input: true,
	actions: {
		changeToInput(e, calendar, self) {
			if (!self.selectedDates || !self.HTMLInputElement) return;
			if (self.selectedDates[0]) {
				self.HTMLInputElement.innerHTML = self.selectedDates[0];
			} else {
				self.HTMLInputElement.innerHTML = '';
			}
			calendar.hide();
		},
	},
};

document.addEventListener('DOMContentLoaded', () => {
	const calendarInput = new VanillaCalendar('#calendar-input', configInput);
	calendarInput.init();

	const calendarDiv = new VanillaCalendar('#calendar-div', configDiv);
	calendarDiv.init();
});
