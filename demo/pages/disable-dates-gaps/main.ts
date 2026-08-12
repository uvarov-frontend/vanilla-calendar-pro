import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  // reproduction from https://github.com/uvarov-frontend/vanilla-calendar-pro/issues/407
  const options: Options = {
    selectionDatesMode: 'multiple-ranged',
    disableAllDates: true,
    enableDates: ['2022-01-10:2022-01-15', '2022-01-24:2022-01-29'],
    selectedDates: ['2022-01-12'],
    selectedMonth: 0,
    disableDatesGaps: true,
    selectedYear: 2022,
  };

  const calendar = new Calendar('#calendar', options);
  calendar.init();
});
