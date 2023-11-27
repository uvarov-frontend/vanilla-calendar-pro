/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@src/styles/vanilla-calendar.css';
import '@src/styles/themes/light.css';
import '@src/styles/themes/dark.css';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
import VanillaCalendar, { IOptions } from '@src/vanilla-calendar';

const configInput: IOptions = {
	input: true,
	actions: {
		changeToInput(e, calendar, dates) {
			if (!dates) return;
			if (dates[0]) {
				calendar.HTMLInputElement.value = dates[0];
			} else {
				calendar.HTMLInputElement.value = '';
			}
			calendar.hide();
		},
	},
};

const configDiv: IOptions = {
	input: true,
	actions: {
		changeToInput(e, calendar, dates) {
			if (!dates) return;
			if (dates[0]) {
				calendar.HTMLInputElement.innerHTML = dates[0];
			} else {
				calendar.HTMLInputElement.innerHTML = '';
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
