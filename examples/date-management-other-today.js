import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  date: {
    today: new Date('2022-01-07'),
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
