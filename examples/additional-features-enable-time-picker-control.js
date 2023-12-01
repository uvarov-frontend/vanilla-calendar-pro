import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  settings: {
    selection: {
      time: true,
      controlTime: 'range',
      stepHours: 5,
      stepMinutes: 5,
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
