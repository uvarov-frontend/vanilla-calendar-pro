import { Calendar, motion, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [motion],
  animation: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
