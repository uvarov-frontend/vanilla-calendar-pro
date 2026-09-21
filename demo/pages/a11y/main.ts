import '../../workbench';

import { annotations, Calendar, months, type Options, time, weeks } from '@src/index';

import '@src/styles/index.css';

const base: Options = {
  selectedMonth: 3,
  selectedYear: 2023,
};

document.addEventListener('DOMContentLoaded', () => {
  new Calendar('#calendar-month', {
    ...base,
    type: 'month',
  }).init();

  new Calendar('#calendar-year', {
    ...base,
    type: 'year',
  }).init();

  new Calendar('#calendar-clickable-headers', {
    extensions: [weeks],
    ...base,
    enableWeekNumbers: true,
    onClickWeekDay: () => {},
    onClickWeekNumber: () => {},
  }).init();

  new Calendar('#calendar-ranged', {
    extensions: [annotations],
    ...base,
    selectionDatesMode: 'multiple-ranged',
    selectedDates: ['2023-04-10:2023-04-18'],
    onCreateDateRangeTooltip: () => 'Selected range',
  }).init();

  new Calendar('#calendar-time-range', {
    extensions: [time],
    ...base,
    selectionTimeMode: 24,
    timeControls: 'range',
    selectedTime: '10:30',
  }).init();

  new Calendar('#calendar-multiple-week-numbers', {
    extensions: [months, weeks],
    ...base,
    type: 'multiple',
    enableWeekNumbers: true,
    displayMonthsCount: 2,
  }).init();

  new Calendar('#calendar-locked-titles', {
    ...base,
    selectionMonthsMode: false,
    selectionYearsMode: false,
  }).init();

  new Calendar('#calendar-popups', {
    extensions: [annotations],
    ...base,
    popups: { '2023-04-12': { modifier: '', html: '<b>Meeting</b> at noon' } },
  }).init();

  new Calendar('#calendar-input', {
    ...base,
    inputMode: true,
  }).init();
});
