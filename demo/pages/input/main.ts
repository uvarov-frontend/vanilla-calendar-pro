// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import '@src/styles/vanilla-calendar.css';

const configInput: IOptions = {
	input: true,
	actions: {
		changeToInput(e, self) {
			if (!self.selectedDates || !self.HTMLInputElement) return;
			if (self.selectedDates[0]) {
				self.HTMLInputElement.value = self.selectedDates[0];
			} else {
				self.HTMLInputElement.value = '';
			}
			self.hide();
		},
	},
	settings: {
		visibility: {
			positionToInput: 'center',
		},
	},
};

const configDiv: IOptions = {
	input: true,
	actions: {
		changeToInput(e, self) {
			if (!self.selectedDates || !self.HTMLInputElement) return;
			if (self.selectedDates[0]) {
				self.HTMLInputElement.innerHTML = self.selectedDates[0];
			} else {
				self.HTMLInputElement.textContent = '';
			}
			self.hide();
		},
	},
};

document.addEventListener('DOMContentLoaded', () => {
	const calendarInput = new VanillaCalendar('#calendar-input', configInput);
	calendarInput.init();

	const calendarDiv = new VanillaCalendar('#calendar-div', configDiv);
	calendarDiv.init();

	document.querySelector('#set-date')?.addEventListener('click', () => {
		calendarInput.settings.selected = {
			dates: ['2023-04-07'],
			month: 3,
			year: 2023,
		};
		calendarInput.update({
			dates: true,
			month: true,
			year: true,
		});
		calendarInput.HTMLInputElement!.value = '2023-04-07';
	});
});
