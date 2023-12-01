import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  actions: {
    clickDay(event, dates) {
      console.log(dates);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
