import VanillaCalendar from 'vanilla-calendar-pro';
import { IOptions } from 'vanilla-calendar-pro/types';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  settings: {
    selection: {
      time: true, // or 12
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
