import type { Options } from '@src/types';
import { VanillaCalendar } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  selectionDatesMode: 'multiple-ranged',
  onClickDate(event, self) {
    console.log(self.private.selectedDates);
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
