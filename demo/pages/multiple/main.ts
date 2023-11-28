// import '@/package/build/vanilla-calendar.min.css';
// import '@/package/build/themes/light.min.css';
// import '@/package/build/themes/dark.min.css';

// import { IOptions } from '@src/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';

import '@src/styles/vanilla-calendar.css';
import '@src/styles/themes/light.css';
import '@src/styles/themes/dark.css';

import { IOptions } from '@src/types';
import VanillaCalendar from '@src/vanilla-calendar';

const config: IOptions = {
	type: 'multiple',
	settings: {
		selection: {
			day: 'multiple-ranged',
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
