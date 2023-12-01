import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  type: 'month',
  actions: {
    clickMonth(e, month) {
      console.log(month);
    },
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
