import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import '@src/styles/vanilla-calendar.css';

const config: Options = {
  viewType: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectedMonth: 3,
  selectedYear: 2023,
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar', config);
  calendar.init();
});
