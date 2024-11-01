import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  enableWeekNumbers: true,
  onClickWeekNumber(event, number, days, year, _self) {
    console.log(`Week number: ${number}`);
    console.log(`Year of the week: ${year}`);
    console.log('Days of this week:', days);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
