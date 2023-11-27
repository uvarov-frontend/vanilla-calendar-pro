/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@src/styles/vanilla-calendar.css';
import '@src/styles/themes/light.css';
import '@src/styles/themes/dark.css';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
import VanillaCalendar from '@src/vanilla-calendar';
import { IOptions } from '@src/types';

const config: IOptions = {
	settings: {
		// selected: {
		// 	month: 3,
		// 	year: 2023,
		// },
		range: {
			// disableAllDays: true,
			disablePast: true,
		},
	},
};

document.addEventListener('DOMContentLoaded', () => {
	const calendar = new VanillaCalendar('#calendar', config);
	calendar.init();
});
