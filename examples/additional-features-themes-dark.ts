import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/layout/core.css';
import 'vanilla-calendar-pro/styles/themes/dark/core.css';

const options: Options = {
  selectedTheme: 'dark',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
