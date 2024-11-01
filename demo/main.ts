import { VanillaCalendarPro } from 'vanilla-calendar-pro';

import '@src/styles/vanilla-calendar.css';

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar', {
    selectedMonth: 3,
    selectedYear: 2023,
  });
  calendar.init();
});
