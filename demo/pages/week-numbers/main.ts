import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  // 2026 has 53 ISO weeks (Dec 28-30, 2026 fall in week 53)
  const config2026: Options = {
    selectedMonth: 11,
    selectedYear: 2026,
    enableWeekNumbers: true,
  };

  // December 2025's last week rolls over into week 1 of 2026 (year-boundary case, control for #402)
  const config2025: Options = {
    selectedMonth: 11,
    selectedYear: 2025,
    enableWeekNumbers: true,
  };

  // firstWeekday other than Monday (ISO 8601 has no official rule here) - checks the library's
  // generalized week numbering stays self-consistent (sequential, no gaps/duplicates)
  const configSundayStart: Options = {
    selectedMonth: 5,
    selectedYear: 2028,
    firstWeekday: 0,
    enableWeekNumbers: true,
  };

  const calendar2026 = new Calendar('#calendar-2026', config2026);
  calendar2026.init();

  const calendar2025 = new Calendar('#calendar-2025', config2025);
  calendar2025.init();

  const calendarSundayStart = new Calendar('#calendar-sunday-start', configSundayStart);
  calendarSundayStart.init();
});
