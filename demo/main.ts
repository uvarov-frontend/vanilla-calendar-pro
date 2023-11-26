/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@/package/src/styles/vanilla-calendar.css';
import '@/package/src/styles/themes/light.css';
import '@/package/src/styles/themes/dark.css';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
import VanillaCalendar, { IOptions } from '@/package/src/scripts/vanilla-calendar';

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
