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

const config: IOptions = {
	type: 'multiple',
	settings: {
		selection: {
			day: 'multiple-ranged',
			cancelableDay: false,
		},
		selected: {
			month: 3,
			year: 2023,
		},
	},
};

document.addEventListener('DOMContentLoaded', () => {
	const calendar = new VanillaCalendar('#calendar', config);
	calendar.init();
});
