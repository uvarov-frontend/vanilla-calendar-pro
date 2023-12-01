import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  settings: {
    lang: 'de-AT', // Austrian-German
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
