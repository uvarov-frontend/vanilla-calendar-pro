import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      day: 'multiple',
    },
    selected: {
      dates: ['2022-01-09:2022-01-13', '2022-01-22'],
      month: 0,
      year: 2022,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
