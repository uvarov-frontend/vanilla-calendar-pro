/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@/package/src/styles/vanilla-calendar.css';
import '@/package/src/styles/themes/light.css';
import '@/package/src/styles/themes/dark.css';
import VanillaCalendar from '@/package/src/scripts/main';
import { Options } from '@/package/src';

const config: Options = {
	settings: {
		selected: {
			month: 3,
			year: 2023,
		},
	},
};

document.addEventListener('DOMContentLoaded', () => {
	// @ts-ignore: VanillaCalendar config
	const calendar = new VanillaCalendar('#calendar', config);
	calendar.init();
});
