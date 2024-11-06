import { type Options, VanillaCalendarPro } from '@src/index';

import '@src/styles/index.css';

const config: Options = {
  viewType: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectedMonth: 3,
  selectedYear: 2023,
  displayDatesOutside: false,
  onCreateDateRangeTooltip(_self, dateEl, _tooltipEl, _dateElBCR, _mainElBCR) {
    // console.log(dateEl, _tooltipEl, _dateElBCR, _mainElBCR);
    return `<b>${dateEl.dataset.vcDate}</b>`;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar', config);
  calendar.init();
});
