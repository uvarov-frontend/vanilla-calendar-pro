import { Calendar, type FormatDateString, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  enableWeekNumbers: true,
  selectionDatesMode: 'multiple-ranged',
  onClickWeekNumber(self, number, year, dateEls) {
    const selectedDates = dateEls.map((dateEl) => dateEl.dataset.vcDate) as FormatDateString[];
    self.set({ selectedDates }, { dates: true });
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
