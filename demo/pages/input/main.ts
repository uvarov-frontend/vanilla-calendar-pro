/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@/package/src/styles/vanilla-calendar.css';
import '@/package/src/styles/themes/light.css';
import '@/package/src/styles/themes/dark.css';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
import VanillaCalendar from '@/package/src/scripts/vanilla-calendar';
import IVanillaCalendar, { Options } from '@/package/src';

const configInput: Options = {
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

const configDiv: Options = {
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
	// @ts-ignore: VanillaCalendar config
	const calendarInput: IVanillaCalendar<string, Options> = new VanillaCalendar('#calendar-input', configInput);
	calendarInput.init();
	// @ts-ignore: VanillaCalendar config
	const calendarDiv: IVanillaCalendar<string, Options> = new VanillaCalendar('#calendar-div', configDiv);
	calendarDiv.init();
});
