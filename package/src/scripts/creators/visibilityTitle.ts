import type { VanillaCalendarPro } from '@src/index';

const visibilityHandler = (self: VanillaCalendarPro, el: HTMLButtonElement, index: number, initDate: Date, type: 'month' | 'year') => {
  const yearID = new Date(initDate.setFullYear(self.private.selectedYear as number, (self.private.selectedMonth as number) + index)).getFullYear();
  const monthID = new Date(initDate.setMonth((self.private.selectedMonth as number) + index)).getMonth();
  const monthLabel = self.private.locale.months.long[monthID];

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

const visibilityTitle = (self: VanillaCalendarPro) => {
  const monthEls = self.private.mainElement.querySelectorAll<HTMLButtonElement>('[data-vc="month"]');
  const yearEls = self.private.mainElement.querySelectorAll<HTMLButtonElement>('[data-vc="year"]');
  const initDate = new Date(self.private.selectedYear as number, self.private.selectedMonth as number, 1);

  [monthEls, yearEls].forEach((els) => els?.forEach((el, index) => visibilityHandler(self, el, index, initDate, el.dataset.vc as 'month' | 'year')));
};

export default visibilityTitle;
