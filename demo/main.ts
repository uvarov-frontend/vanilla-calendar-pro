// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import '@src/styles/vanilla-calendar.css';

const config: IOptions = {
	CSSClasses: {
		days: 'vanilla-calendar-days days-1 days-2 days-3 days-4',
		day: 'vanilla-calendar-day day-1 day-2 day-3 day-4',
		dayBtn: 'vanilla-calendar-day__btn day-btn-1 day-btn-2 day-btn-3 day-btn-4',
		arrow: 'vanilla-calendar-arrow arrow-1 arrow-2 arrow-3 arrow-4',
		arrowPrev: 'vanilla-calendar-arrow_prev arrow-prev-1 arrow-prev-2 arrow-prev-3 arrow-prev-4',
		arrowNext: 'vanilla-calendar-arrow_next arrow-next-1 arrow-next-2 arrow-next-3 arrow-next-4',
		week: 'vanilla-calendar-week week-1 week-2 week-3 week-4',
		weekDay: 'vanilla-calendar-week__day week-day-1 week-day-2 week-day-3 week-day-4',
		weekDayWeekend: 'vanilla-calendar-week__day_weekend week-day-weekend-1 week-day-weekend-2 week-day-weekend-3 week-day-weekend-4',
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
