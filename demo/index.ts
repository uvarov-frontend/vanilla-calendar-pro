/* eslint-disable import/no-relative-packages */
import '../package/src/styles/vanilla-calendar.css';
import '../package/src/styles/themes/light.css';
import '../package/src/styles/themes/dark.css';
import VanillaCalendar from '../package/src/scripts/main';
import { Options } from '../package/src';

const config: Options = {
	settings: {
		range: {
			disablePast: true,
		},
		selection: {
			day: 'multiple-ranged',
			time: true,
		},
		visibility: {
			weekNumbers: true,
			daysOutside: false,
		},
	},
	actions: {
		clickDay(event, dates) {
			console.log(event, dates);
		},
	},
};

document.addEventListener('DOMContentLoaded', () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore: VanillaCalendar
	const calendar = new VanillaCalendar('#vanilla-calendar', config as Options);
	calendar.init();
});
