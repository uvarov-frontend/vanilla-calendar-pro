import { Calendar, type Options, weeks } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/core.css';
import 'vanilla-calendar-pro/styles/weeks.css';

const options: Options = {
  extensions: [weeks],
  enableWeekNumbers: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
