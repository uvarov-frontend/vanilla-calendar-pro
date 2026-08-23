import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const configWeek: Options = {
    type: 'week',
    animation: true,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configWeekNumbers: Options = {
    type: 'week',
    animation: true,
    enableWeekNumbers: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configMonth: Options = {
    animation: true,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configWeekYearLocked: Options = {
    type: 'week',
    selectionYearsMode: false,
    selectedDates: ['2023-12-29'],
    selectedMonth: 11,
    selectedYear: 2023,
  };

  const calendarWeek = new Calendar('#calendar-week', configWeek);
  calendarWeek.init();

  const calendarWeekNumbers = new Calendar('#calendar-week-numbers', configWeekNumbers);
  calendarWeekNumbers.init();

  const calendarMonth = new Calendar('#calendar-month', configMonth);
  calendarMonth.init();

  const calendarWeekYearLocked = new Calendar('#calendar-week-year-locked', configWeekYearLocked);
  calendarWeekYearLocked.init();

  document.getElementById('btn-sunday-first')?.addEventListener('click', () => {
    calendarWeek.set({ firstWeekday: 0 });
  });
});
