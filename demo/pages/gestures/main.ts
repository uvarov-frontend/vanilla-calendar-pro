import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const configGestures: Options = {
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configCollapsed: Options = {
    type: 'week',
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configBounded: Options = {
    animation: true,
    enableCollapse: true,
    enableSwipe: true,
    dateMax: '2023-04-30',
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configMultiple: Options = {
    type: 'multiple',
    animation: true,
    enableSwipe: true,
    displayMonthsCount: 2,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configPlain: Options = {
    enableCollapse: true,
    enableSwipe: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configCollapseOnly: Options = {
    animation: true,
    enableCollapse: true,
    selectedDates: ['2023-04-19'],
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configRange: Options = {
    animation: true,
    enableSwipe: true,
    selectionDatesMode: 'multiple-ranged',
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configStatic: Options = {
    animation: true,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configInput: Options = {
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
      new Calendar('#calendar-invalid', { type: 'multiple', displayMonthsCount: 2, enableCollapse: true }).init();
      logEl.textContent = 'init() OK';
    } catch (e) {
      logEl.textContent = `init() threw: ${(e as Error).message}`;
    }
  });
});
