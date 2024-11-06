import { Calendar } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const selectedTime = today.toLocaleString('en-US', { hour12: true, minute: '2-digit', hour: '2-digit' });

  const calendar = new Calendar('#calendar', {
    selectedMonth: 3,
    selectedYear: 2023,
    selectionTimeMode: 12,
    selectedTime,
  });
  calendar.init();
});
