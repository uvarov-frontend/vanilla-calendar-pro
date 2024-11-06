import { type Options, VanillaCalendarPro } from '@src/index';

import '@src/styles/index.css';

const config: Options = {
  viewType: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectedMonth: 3,
  selectedYear: 2023,
  displayDatesOutside: false,
  onCreateDateRangeTooltip(self) {
    const createRow = (title: string, value: string) =>
      `<div style="text-align: left; white-space: nowrap">
        <span>${title}</span>
        <b>${value}</b>
      </div>`;

    return `
      ${createRow('Start:', self.private.selectedDates[0])}
      ${self.private.selectedDates[1] ? createRow('End:', self.private.selectedDates[1]) : ''}
    `;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar', config);
  calendar.init();
});
