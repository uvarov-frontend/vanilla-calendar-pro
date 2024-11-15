import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  selectionDatesMode: 'multiple-ranged',
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

const calendar = new Calendar('#calendar', options);
calendar.init();
