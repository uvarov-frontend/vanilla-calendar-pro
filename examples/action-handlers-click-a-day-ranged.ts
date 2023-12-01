import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      day: 'multiple-ranged',
    },
  },
  actions: {
    clickDay(event, dates) {
      console.log(dates);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
