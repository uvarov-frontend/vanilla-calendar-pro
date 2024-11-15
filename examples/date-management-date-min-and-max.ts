import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  dateMin: '1920-01-01',
  dateMax: '2038-12-31',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
