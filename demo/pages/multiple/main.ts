import { type Options, VanillaCalendarPro } from '@src/index';

import '@src/styles/index.css';

const config: Options = {
  viewType: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectedMonth: 3,
  selectedYear: 2023,
  displayDatesOutside: false,
  themeAttrDetect: 'html[data-theme]',
  onCreateDateRangeTooltip(self, event) {
    console.log(self, event);
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar', config);
  calendar.init();
});
