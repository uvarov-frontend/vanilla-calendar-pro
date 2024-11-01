import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendar('#calendar', {
    selectedMonth: 3,
    selectedYear: 2023,
  });
  calendar.init();
});
