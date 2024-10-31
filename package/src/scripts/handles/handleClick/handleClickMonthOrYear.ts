import create from '@scripts/creators/create';
import createMonths from '@scripts/creators/createMonths';
import createYears from '@scripts/creators/createYears';
import type VanillaCalendar from '@src/vanilla-calendar';

const typeClick = ['month', 'year'] as const;

const getColumnID = (self: VanillaCalendar, type: (typeof typeClick)[number], id: number) => {
  const columnEls: NodeListOf<HTMLElement> = self.private.mainElement.querySelectorAll('[data-vc="column"]');
  const indexColumn = Array.from(columnEls).findIndex((column) => column.closest(`[data-vc-column="${type}"]`));
  const currentValue = Number((columnEls[indexColumn].querySelector(`[data-vc="${type}"]`) as HTMLElement).getAttribute(`data-vc-${type}`));

  return self.private.currentType === 'month' && indexColumn >= 0
    ? id - indexColumn
    : self.private.currentType === 'year' && self.selectedYear !== currentValue
      ? id - 1
      : id;
};

const handleMultipleYearSelection = (self: VanillaCalendar, itemEl: HTMLElement) => {
  const selectedYear = getColumnID(self, 'year', Number(itemEl.dataset.vcYearsYear));
  const isBeforeMinDate = self.selectedMonth < self.private.dateMin.getMonth() && selectedYear <= self.private.dateMin.getFullYear();
  const isAfterMaxDate = self.selectedMonth > self.private.dateMax.getMonth() && selectedYear >= self.private.dateMax.getFullYear();
  const isBeforeMinYear = selectedYear < self.private.dateMin.getFullYear();
  const isAfterMaxYear = selectedYear > self.private.dateMax.getFullYear();

  self.selectedYear =
    isBeforeMinDate || isBeforeMinYear
      ? self.private.dateMin.getFullYear()
      : isAfterMaxDate || isAfterMaxYear
        ? self.private.dateMax.getFullYear()
        : selectedYear;
  self.selectedMonth =
    isBeforeMinDate || isBeforeMinYear
      ? self.private.dateMin.getMonth()
      : isAfterMaxDate || isAfterMaxYear
        ? self.private.dateMax.getMonth()
        : self.selectedMonth;
};

const handleMultipleMonthSelection = (self: VanillaCalendar, itemEl: HTMLElement) => {
  const column = itemEl.closest('[data-vc-column="month"]') as HTMLElement;
  const yearEl = column.querySelector('[data-vc="year"]') as HTMLElement;
  const selectedMonth = getColumnID(self, 'month', Number(itemEl.dataset.vcMonthsMonth));
  const selectedYear = Number(yearEl.dataset.vcYear);

  const isBeforeMinDate = selectedMonth < self.private.dateMin.getMonth() && selectedYear <= self.private.dateMin.getFullYear();
  const isAfterMaxDate = selectedMonth > self.private.dateMax.getMonth() && selectedYear >= self.private.dateMax.getFullYear();

  self.selectedYear = selectedYear;
  self.selectedMonth = isBeforeMinDate ? self.private.dateMin.getMonth() : isAfterMaxDate ? self.private.dateMax.getMonth() : selectedMonth;
};

const handleItemClick = (self: VanillaCalendar, event: MouseEvent, type: (typeof typeClick)[number], itemEl: HTMLElement) => {
  const selectByType = {
    year: () => {
      if (self.type === 'multiple') return handleMultipleYearSelection(self, itemEl);
      self.selectedYear = Number(itemEl.dataset.vcYearsYear);
    },
    month: () => {
      if (self.type === 'multiple') return handleMultipleMonthSelection(self, itemEl);
      self.selectedMonth = Number(itemEl.dataset.vcMonthsMonth);
    },
  };
  selectByType[type]();

  const actionByType = {
    year: () => self.actions.clickYear?.(event, self),
    month: () => self.actions.clickMonth?.(event, self),
  };
  actionByType[type]();

  self.private.currentType = self.type;
  create(self);
  self.private.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
};

const handleClickType = (self: VanillaCalendar, event: MouseEvent, type: (typeof typeClick)[number]) => {
  const target = event.target as HTMLElement;

  const headerEl = target.closest<HTMLElement>(`[data-vc="${type}"]`);
  const createByType = {
    year: () => createYears(self, target),
    month: () => createMonths(self, target),
  };
  if (headerEl && self.actions.clickTitle) self.actions.clickTitle(event, self);
  if (headerEl && self.private.currentType !== type) return createByType[type]();

  const itemEl = target.closest<HTMLElement>(`[data-vc-${type}s-${type}]`);
  if (itemEl) return handleItemClick(self, event, type, itemEl);

  const gridEl = target.closest<HTMLElement>('[data-vc="grid"]');
  const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

  if ((self.private.currentType === type && headerEl) || (self.type === 'multiple' && self.private.currentType === type && gridEl && !columnEl)) {
    self.private.currentType = self.type;
    create(self);
    self.private.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
  }
};

const handleClickMonthOrYear = (self: VanillaCalendar, event: MouseEvent) => {
  typeClick.forEach((type) => {
    if (!self.settings.selection[type] || !event.target) return;
    handleClickType(self, event, type);
  });
};

export default handleClickMonthOrYear;
