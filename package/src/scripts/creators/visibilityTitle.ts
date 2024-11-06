import type { Calendar } from '@src/index';

const visibilityHandler = (self: Calendar, el: HTMLButtonElement, index: number, initDate: Date, type: 'month' | 'year') => {
  const yearID = new Date(initDate.setFullYear(self.context.selectedYear as number, (self.context.selectedMonth as number) + index)).getFullYear();
  const monthID = new Date(initDate.setMonth((self.context.selectedMonth as number) + index)).getMonth();
  const monthLabel = self.context.locale.months.long[monthID];

  const columnEl = el.closest('[data-vc="column"]');
  if (columnEl) columnEl.ariaLabel = `${monthLabel} ${yearID}`;

  const value = {
    month: { id: monthID, label: monthLabel },
    year: { id: yearID, label: yearID },
  };

  el.innerText = String(value[type].label);
  el.dataset[`vc${type.charAt(0).toUpperCase() + type.slice(1)}`] = String(value[type].id);
  el.ariaLabel = `${self.labels[type]} ${value[type].label}`;

  const typesMap = { month: self.selectionMonthsMode, year: self.selectionYearsMode };
  const isDisabled = typesMap[type] === false || typesMap[type] === 'only-arrows';
  if (isDisabled) el.tabIndex = -1;
  el.disabled = isDisabled;
};

const visibilityTitle = (self: Calendar) => {
  const monthEls = self.context.mainElement.querySelectorAll<HTMLButtonElement>('[data-vc="month"]');
  const yearEls = self.context.mainElement.querySelectorAll<HTMLButtonElement>('[data-vc="year"]');
  const initDate = new Date(self.context.selectedYear as number, self.context.selectedMonth as number, 1);

  [monthEls, yearEls].forEach((els) => els?.forEach((el, index) => visibilityHandler(self, el, index, initDate, el.dataset.vc as 'month' | 'year')));
};

export default visibilityTitle;
