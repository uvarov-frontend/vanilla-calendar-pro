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

  const templateWeekNumberEl = document.createElement('button');
  templateWeekNumberEl.type = 'button';
  templateWeekNumberEl.className = self.styles.weekNumber;

  const dateBtnEl = datesEl.querySelectorAll<HTMLButtonElement>('[data-vc-date]');
  const weeksCount = Math.ceil((firstDayWeek + days) / 7);

  for (let i = 0; i < weeksCount; i++) {
    const index = i === 0 ? 6 : i * 7;
    const date = dateBtnEl[index].dataset.vcDate as FormatDateString;
    const weekNumber = getWeekNumber(date, self.firstWeekday);

    if (!weekNumber) return;

    const weekNumberEl = templateWeekNumberEl.cloneNode(true) as HTMLElement;
    weekNumberEl.innerText = String(weekNumber.week);
    weekNumberEl.dataset.vcWeekNumber = String(weekNumber.week);
    weekNumberEl.dataset.vcWeekYear = String(weekNumber.year);
    weekNumberEl.role = 'rowheader';
    weekNumberEl.ariaLabel = `${weekNumber.week}`;
    weekNumbersContentEl.appendChild(weekNumberEl);
  }
};

export default createWeekNumbers;
