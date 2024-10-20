import createDOM from '@scripts/modules/createDOM';
import visibilityTitle from '@scripts/modules/visibilityTitle';
import type VanillaCalendar from '@src/vanilla-calendar';

const relationshipID = (self: VanillaCalendar) => {
  if (self.type !== 'multiple') return 0;
  const columnEls: NodeListOf<HTMLElement> = self.HTMLElement.querySelectorAll('[data-vc="column"]');
  const indexColumn = Array.from(columnEls).findIndex((column) => column.classList.contains('[data-vc-column="month"]'));
  return indexColumn > 0 ? indexColumn : 0;
};

const createMonthEl = (
  self: VanillaCalendar,
  templateMonthEl: HTMLButtonElement,
  selectedMonth: number,
  monthTitle: string,
  monthDisabled: boolean,
  i: number,
) => {
  const monthEl = templateMonthEl.cloneNode(false) as HTMLButtonElement;
  monthEl.className = `${self.CSSClasses.monthsMonth}${
    selectedMonth === i ? ` ${self.CSSClasses.monthsMonthSelected}` : monthDisabled ? ` ${self.CSSClasses.monthsMonthDisabled}` : ''
  }`;
  monthEl.title = monthTitle;
  monthEl.innerText = `${self.settings.visibility.monthShort ? monthTitle.substring(0, 3) : monthTitle}`;
  monthEl.dataset.calendarMonth = String(i);
  if (monthDisabled) monthEl.tabIndex = -1;
  return monthEl;
};

const createMonths = (self: VanillaCalendar, target?: HTMLElement) => {
  const selectedMonth = target?.dataset.calendarSelectedMonth ? Number(target.dataset.calendarSelectedMonth) : (self.selectedMonth as number);
  const yearEl = target?.closest(`.${self.CSSClasses.column}`)?.querySelector(`.${self.CSSClasses.year}`) as HTMLElement;
  const selectedYear = yearEl ? Number(yearEl.dataset.calendarSelectedYear) : (self.selectedYear as number);
  self.currentType = 'month';
  createDOM(self, target);
  visibilityTitle(self);

  const monthsEl = self.HTMLElement?.querySelector(`.${self.CSSClasses.months}`);
  if (!self.settings.selection.month || !monthsEl) return;

  const activeMonthsID =
    self.jumpMonths > 1
      ? self.locale.months
          .map((_, i) => selectedMonth - self.jumpMonths * i)
          .concat(self.locale.months.map((_, i) => selectedMonth + self.jumpMonths * i))
          .filter((monthID) => monthID >= 0 && monthID <= 12)
      : Array.from(Array(12).keys());

  const templateMonthEl = document.createElement('button');
  templateMonthEl.type = 'button';

  for (let i = 0; i < 12; i++) {
    const monthTitle = self.locale.months[i];
    const monthDisabled =
      (i < (self.dateMin as Date).getMonth() + relationshipID(self) && selectedYear <= (self.dateMin as Date).getFullYear()) ||
      (i > (self.dateMax as Date).getMonth() + relationshipID(self) && selectedYear >= (self.dateMax as Date).getFullYear()) ||
      (i !== selectedMonth && !activeMonthsID.includes(i));
    const monthEl = createMonthEl(self, templateMonthEl, selectedMonth, monthTitle, monthDisabled, i);
    monthsEl.appendChild(monthEl);
    if (self.actions.getMonths) self.actions.getMonths(i, monthEl, self);
  }
};

export default createMonths;
