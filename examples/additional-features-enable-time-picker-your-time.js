import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  settings: {
    selection: {
      time: true,
    },
    selected: {
      time: '03:44 AM',
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
