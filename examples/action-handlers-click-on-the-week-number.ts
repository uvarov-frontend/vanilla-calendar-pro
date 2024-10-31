import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  settings: {
    visibility: {
      weekNumbers: true,
    },
  },
  onClickWeekNumber(event, number, days, year, _self) {
    console.log(`Week number: ${number}`);
    console.log(`Year of the week: ${year}`);
    console.log('Days of this week:', days);
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
