import VanillaCalendar from 'vanilla-calendar-pro';
import { IOptions } from 'vanilla-calendar-pro/types';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  settings: {
    selection: {
      day: false,
      month: false,
      year: false,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
