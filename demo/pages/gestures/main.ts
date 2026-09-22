import '../../workbench';

import { Calendar, months, motion, type Options, weeks } from '@src/index';

import '@src/styles/core.css';
import '@src/styles/months.css';
import '@src/styles/motion.css';
import '@src/styles/weeks.css';

document.addEventListener('DOMContentLoaded', () => {
  const configGestures: Options = {
    extensions: [weeks, motion],
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configCollapsed: Options = {
    extensions: [weeks, motion],
    type: 'week',
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configBounded: Options = {
    extensions: [weeks, motion],
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    dateMax: '2023-04-30',
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configMultiple: Options = {
    extensions: [months, motion],
    type: 'multiple',
    animation: true,
    enableSwipe: true,
    displayMonthsCount: 2,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configPlain: Options = {
    extensions: [weeks, motion],
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configCollapseOnly: Options = {
    extensions: [weeks, motion],
    animation: true,
    enableCollapse: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configRange: Options = {
    extensions: [motion],
    animation: true,
    enableSwipe: true,
    selectionDatesMode: 'multiple-ranged',
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configStatic: Options = {
    extensions: [weeks, motion],
    animation: true,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configInput: Options = {
    extensions: [weeks, motion],
    inputMode: true,
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
    onInit(self) {
      self.context.mainElement.id = 'calendar-input-popup';
    },
  };

  const calendarGestures = new Calendar('#calendar-gestures', configGestures);
  calendarGestures.init();

  const calendarCollapsed = new Calendar('#calendar-collapsed', configCollapsed);
  calendarCollapsed.init();

  const calendarMultiple = new Calendar('#calendar-multiple', configMultiple);
  calendarMultiple.init();

  const calendarBounded = new Calendar('#calendar-bounded', configBounded);
  calendarBounded.init();

  const calendarPlain = new Calendar('#calendar-plain', configPlain);
  calendarPlain.init();

  const calendarCollapseOnly = new Calendar('#calendar-collapse-only', configCollapseOnly);
  calendarCollapseOnly.init();

  const calendarRange = new Calendar('#calendar-range', configRange);
  calendarRange.init();

  const calendarStatic = new Calendar('#calendar-static', configStatic);
  calendarStatic.init();

  const calendarInput = new Calendar('#calendar-input-gestures', configInput);
  calendarInput.init();

  document.getElementById('btn-enable-gestures')?.addEventListener('click', () => {
    calendarStatic.set({ enableCollapse: true, enableSwipe: true });
  });

  const logEl = document.getElementById('log') as HTMLPreElement;
  document.getElementById('btn-invalid-collapse')?.addEventListener('click', () => {
    try {
      new Calendar('#calendar-invalid', { extensions: [motion, months, weeks], type: 'multiple', displayMonthsCount: 2, enableCollapse: true }).init();
      logEl.textContent = 'init() OK';
    } catch (e) {
      logEl.textContent = `init() threw: ${(e as Error).message}`;
    }
  });
});
