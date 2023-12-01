import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  type: 'multiple',
  months: 2,
  jumpMonths: 1,
  settings: {
    selection: {
      day: 'multiple',
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
