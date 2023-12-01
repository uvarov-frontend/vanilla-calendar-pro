import VanillaCalendar from 'vanilla-calendar-pro';
import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options = {
  CSSClasses: {
    arrow: 'arrow-smile',
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
