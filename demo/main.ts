// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import '@src/styles/vanilla-calendar.css';

const config: IOptions = {
	CSSClasses: {
		day: 'vanilla-calendar-day day-1 day-2 day-3 day-4',
		dayBtn: 'vanilla-calendar-day__btn day-btn-1 day-btn-2 day-btn-3 day-btn-4',
		arrow: 'vanilla-calendar-arrow arrow-1 arrow-2 arrow-3 arrow-4',
		arrowPrev: 'vanilla-calendar-arrow_prev arrow-prev-1 arrow-prev-2 arrow-prev-3 arrow-prev-4',
		arrowNext: 'vanilla-calendar-arrow_next arrow-next-1 arrow-next-2 arrow-next-3 arrow-next-4',
	},
	settings: {
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
