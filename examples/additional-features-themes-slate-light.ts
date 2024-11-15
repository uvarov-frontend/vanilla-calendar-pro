import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/layout.css';
import 'vanilla-calendar-pro/styles/themes/slate-light.css';

const options: Options = {
  selectedTheme: 'slate-light',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
