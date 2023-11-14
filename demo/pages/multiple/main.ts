/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@/package/src/styles/vanilla-calendar.css';
import '@/package/src/styles/themes/light.css';
import '@/package/src/styles/themes/dark.css';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
import VanillaCalendar from '@/package/src/scripts/vanilla-calendar';
import IVanillaCalendar, { Options } from '@/package/src';

const config: Options = {
	type: 'multiple',
	settings: {
		// range: {
		// 	min: '2023-09-08',
		// 	max: '2025-09-08',
		// },
		selection: {
			day: 'multiple-ranged',
		},
		selected: {
			month: 3,
			year: 2023,
		},
	},
	// actions: {
	// 	clickMonth(e, month, year) {
	// 		console.log(e, month, year);
	// 	},
	// 	clickYear(e, year, month) {
	// 		console.log(e, year, month);
	// 	},
	// },
};

document.addEventListener('DOMContentLoaded', () => {
	// @ts-ignore: VanillaCalendar config
	const calendar: IVanillaCalendar<string, Options> = new VanillaCalendar('#calendar', config);
	calendar.init();
});
