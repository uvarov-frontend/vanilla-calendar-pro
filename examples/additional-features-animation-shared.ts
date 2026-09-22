import { Calendar, motion, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/motion.css';

const options: Options = {
  extensions: [motion],
  animation: { duration: 400 },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
