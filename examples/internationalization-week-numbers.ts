import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    visibility: {
      weekNumbers: true,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
