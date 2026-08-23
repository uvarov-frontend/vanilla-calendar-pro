import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

const base: Options = { selectedMonth: 3, selectedYear: 2023 };

document.addEventListener('DOMContentLoaded', () => {
  new Calendar('#calendar-month', { ...base, type: 'month' }).init();

  new Calendar('#calendar-year', { ...base, type: 'year' }).init();

  new Calendar('#calendar-clickable-headers', {
    ...base,
    enableWeekNumbers: true,
    onClickWeekDay: () => {},
    onClickWeekNumber: () => {},
  }).init();

  new Calendar('#calendar-ranged', {
    ...base,
    selectionDatesMode: 'multiple-ranged',
    selectedDates: ['2023-04-10:2023-04-18'],
    onCreateDateRangeTooltip: () => 'Selected range',
  }).init();

  new Calendar('#calendar-time-range', { ...base, selectionTimeMode: 24, timeControls: 'range', selectedTime: '10:30' }).init();

  new Calendar('#calendar-multiple-week-numbers', { ...base, type: 'multiple', enableWeekNumbers: true, displayMonthsCount: 2 }).init();

  new Calendar('#calendar-locked-titles', { ...base, selectionMonthsMode: false, selectionYearsMode: false }).init();

  new Calendar('#calendar-popups', { ...base, popups: { '2023-04-12': { modifier: '', html: '<b>Meeting</b> at noon' } } }).init();

  new Calendar('#calendar-input', { ...base, inputMode: true }).init();
});
