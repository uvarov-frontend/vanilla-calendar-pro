import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  styles: {
    arrowPrev: 'arrow-smile',
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
