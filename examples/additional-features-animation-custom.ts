import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  animation: {
    slide: { duration: 700, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' },
    fade: { duration: 450, easing: 'ease-in-out' },
    collapse: { duration: 550, easing: 'ease-in-out' },
  },
  enableCollapse: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
