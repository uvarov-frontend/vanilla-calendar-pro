import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      time: 24,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
