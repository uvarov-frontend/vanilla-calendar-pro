import VanillaCalendar from 'vanilla-calendar-pro';
import type { FormatDateString, IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
  enableWeekNumbers: true,
  selectionDatesMode: 'multiple-ranged',
  onClickWeekNumber(event, number, days, year, self) {
    self.selectedDates = days.map((day) => day.dataset.calendarDay) as FormatDateString[];
    self.update({ dates: true });
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
