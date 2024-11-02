import { type FormatDateString, type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/vanilla-calendar-pro.min.css';

const options: Options = {
  enableWeekNumbers: true,
  selectionDatesMode: 'multiple-ranged',
  onClickWeekNumber(event, number, days, year, self) {
    self.selectedDates = days.map((day) => day.dataset.calendarDay) as FormatDateString[];
    self.update({ dates: true });
  },
};

const calendar = new VanillaCalendarPro('#calendar', options);
calendar.init();
