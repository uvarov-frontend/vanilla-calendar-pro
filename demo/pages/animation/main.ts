import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  const configAnimated: Options = {
    animation: true,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configStatic: Options = {
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const configMultiple: Options = {
    type: 'multiple',
    animation: { duration: 300 },
    displayMonthsCount: 2,
    selectedMonth: 3,
    selectedYear: 2023,
  };

  // The slide overshoots past one: the month winds up, shoots past its place and settles back.
  const configCustom: Options = {
    animation: {
      slide: { duration: 700, easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' },
      fade: { duration: 450, easing: 'ease-in-out' },
    },
    selectedMonth: 3,
    selectedYear: 2023,
  };

  const calendarAnimated = new Calendar('#calendar-animated', configAnimated);
  calendarAnimated.init();

  const calendarStatic = new Calendar('#calendar-static', configStatic);
  calendarStatic.init();

  const calendarMultiple = new Calendar('#calendar-multiple', configMultiple);
  calendarMultiple.init();

  const calendarCustom = new Calendar('#calendar-custom', configCustom);
  calendarCustom.init();
});
