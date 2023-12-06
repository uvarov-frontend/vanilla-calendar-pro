import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    visibility: {
      weekNumbers: true,
    },
  },
  actions: {
    clickWeekNumber(event, number, days, year, self) {
      console.log(`Week number: ${number}`);
      console.log(`Year of the week: ${year}`);
      console.log('Days of this week:', days);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
