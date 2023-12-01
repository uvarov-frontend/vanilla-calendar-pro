import VanillaCalendar, { Options } from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  settings: {
    selection: {
      time: true,
    },
  },
  actions: {
    changeTime(event, time, hours, minutes, keeping) {
      console.log(time);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
