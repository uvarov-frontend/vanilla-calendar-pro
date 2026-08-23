import getWeekNumber from '@scripts/utils/getWeekNumber';
import type { Calendar, FormatDateString } from '@src/index';

const createWeekNumbers = (self: Calendar, firstDayWeek: number, days: number, weekNumbersEl: HTMLElement, datesEl: HTMLElement) => {
  if (!self.enableWeekNumbers) return;
  weekNumbersEl.textContent = '';

  const weekNumbersTitleEl = document.createElement('b');
  weekNumbersTitleEl.className = self.styles.weekNumbersTitle;
  weekNumbersTitleEl.innerText = '#';
  weekNumbersTitleEl.dataset.vcWeekNumbers = 'title';
  weekNumbersEl.appendChild(weekNumbersTitleEl);

  const weekNumbersContentEl = document.createElement('div');
  weekNumbersContentEl.className = self.styles.weekNumbersContent;
  weekNumbersContentEl.dataset.vcWeekNumbers = 'content';
  weekNumbersEl.appendChild(weekNumbersContentEl);

  // Only make it a button when there is something to activate, and leave the row/rowheader roles
  // out of it: the column sits beside the grid, not inside it.
  const isClickable = !!self.onClickWeekNumber;
  const templateWeekNumberEl = document.createElement(isClickable ? 'button' : 'b');
  if (isClickable) (templateWeekNumberEl as HTMLButtonElement).type = 'button';
  templateWeekNumberEl.className = self.styles.weekNumber;

  const dateBtnEl = datesEl.querySelectorAll<HTMLButtonElement>('[data-vc-date]');
  const weeksCount = Math.ceil((firstDayWeek + days) / 7);

  for (let i = 0; i < weeksCount; i++) {
    const index = i === 0 ? 6 : i * 7;
    const date = dateBtnEl[index].dataset.vcDate as FormatDateString;
    const weekNumber = getWeekNumber(date, self.firstWeekday);

    if (!weekNumber) return;

    const weekNumberEl = templateWeekNumberEl.cloneNode(false) as HTMLElement;
    weekNumberEl.innerText = String(weekNumber.week);
    weekNumberEl.dataset.vcWeekNumber = String(weekNumber.week);
    weekNumberEl.dataset.vcWeekYear = String(weekNumber.year);
    weekNumbersContentEl.appendChild(weekNumberEl);
  }
};

export default createWeekNumbers;
