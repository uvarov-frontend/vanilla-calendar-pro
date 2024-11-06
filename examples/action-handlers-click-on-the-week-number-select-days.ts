import { Calendar, type FormatDateString, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  enableWeekNumbers: true,
  selectionDatesMode: 'multiple-ranged',
  onClickWeekNumber(self, number, year, days) {
    self.selectedDates = days.map((day) => day.dataset.calendarDay) as FormatDateString[];
    self.update({ dates: true });
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
