import { type Options, VanillaCalendarPro } from '@src/index';

import '@src/styles/index.css';

const config: Options = {
  viewType: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectedMonth: 3,
  selectedYear: 2023,
  displayDatesOutside: false,
  onCreateDateRangeTooltip(_self, dateEl, dateElBCR, mainElBCR, tooltipElBCR) {
    console.log(dateEl, dateElBCR, mainElBCR, tooltipElBCR);
    return `<b>${dateEl.dataset.vcDate}</b>`;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar', config);
  calendar.init();
});
