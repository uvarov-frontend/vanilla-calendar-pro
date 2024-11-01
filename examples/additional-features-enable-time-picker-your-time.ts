import VanillaCalendar from 'vanilla-calendar-pro';
import type { Options } from '@package/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectionTimeMode: 12,
  selectedTime: '03:44 AM',
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
