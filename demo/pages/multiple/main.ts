import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

const config: Options = {
  type: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectedMonth: 3,
  selectedYear: 2023,
  onCreateDateRangeTooltip(self) {
    const createRow = (title: string, value: string) =>
      `<div style="text-align: left; white-space: nowrap">
        <span>${title}</span>
        <b>${value}</b>
      </div>`;

    return `
      ${createRow('Start:', self.context.selectedDates[0])}
      ${self.context.selectedDates[1] ? createRow('End:', self.context.selectedDates[1]) : ''}
    `;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new Calendar('#calendar', config);
  calendar.init();
});
