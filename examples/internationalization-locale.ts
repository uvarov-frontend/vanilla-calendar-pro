import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  locale: 'de-AT', // Austrian-German
};

const calendar = new Calendar('#calendar', options);
calendar.init();
