import type { Options } from '@src/types';
import { VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: Options = {
  onClickDate(event, self) {
    console.log(self.private.selectedDates);
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
