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
    // displayDateMin: '2022-11-23',
    // displayDateMax: '2025-11-23',
    // displayDisabledDates: true,
  });
  calendar.init();
});
