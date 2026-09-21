import { Calendar, type Options, timePicker } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  extensions: [timePicker],
  selectionTimeMode: 12,
  selectedTime: '03:44 AM',
};

const calendar = new Calendar('#calendar', options);
calendar.init();
