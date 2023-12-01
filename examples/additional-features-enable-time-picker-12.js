import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  settings: {
    selection: {
      time: true, // or 12
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
