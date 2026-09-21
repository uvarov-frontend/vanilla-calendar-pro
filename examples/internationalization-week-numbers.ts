import { Calendar, type Options, weeks } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [weeks],
  enableWeekNumbers: true,
};

const calendar = new Calendar('#calendar', options);
calendar.init();
