import create from '@scripts/creators/create';
import createMonths from '@scripts/creators/createMonths';
import createYears from '@scripts/creators/createYears';
import setMonthOrYearModifier from '@scripts/creators/setMonthOrYearModifier';
import type { VanillaCalendarPro } from '@src/index';

const typeClick = ['month', 'year'] as const;

const getColumnID = (self: VanillaCalendarPro, type: (typeof typeClick)[number], id: number) => {
  const columnEls: NodeListOf<HTMLElement> = self.private.mainElement.querySelectorAll('[data-vc="column"]');
  const indexColumn = Array.from(columnEls).findIndex((column) => column.closest(`[data-vc-column="${type}"]`));
  const currentValue = Number((columnEls[indexColumn].querySelector(`[data-vc="${type}"]`) as HTMLElement).getAttribute(`data-vc-${type}`));

  return self.private.currentType === 'month' && indexColumn >= 0
    ? id - indexColumn
    : self.private.currentType === 'year' && self.private.selectedYear !== currentValue
      ? id - 1
      : id;
};

const handleMultipleYearSelection = (self: VanillaCalendarPro, itemEl: HTMLElement) => {
  const selectedYear = getColumnID(self, 'year', Number(itemEl.dataset.vcYearsYear));
  const isBeforeMinDate = self.private.selectedMonth < self.private.dateMin.getMonth() && selectedYear <= self.private.dateMin.getFullYear();
  const isAfterMaxDate = self.private.selectedMonth > self.private.dateMax.getMonth() && selectedYear >= self.private.dateMax.getFullYear();
  const isBeforeMinYear = selectedYear < self.private.dateMin.getFullYear();
  const isAfterMaxYear = selectedYear > self.private.dateMax.getFullYear();

  self.private.selectedYear =
    isBeforeMinDate || isBeforeMinYear
      ? self.private.dateMin.getFullYear()
      : isAfterMaxDate || isAfterMaxYear
        ? self.private.dateMax.getFullYear()
        : selectedYear;
  self.private.selectedMonth =
    isBeforeMinDate || isBeforeMinYear
      ? self.private.dateMin.getMonth()
      : isAfterMaxDate || isAfterMaxYear
        ? self.private.dateMax.getMonth()
        : self.private.selectedMonth;
};

const handleMultipleMonthSelection = (self: VanillaCalendarPro, itemEl: HTMLElement) => {
  const column = itemEl.closest('[data-vc-column="month"]') as HTMLElement;
  const yearEl = column.querySelector('[data-vc="year"]') as HTMLElement;
  const selectedMonth = getColumnID(self, 'month', Number(itemEl.dataset.vcMonthsMonth));
  const selectedYear = Number(yearEl.dataset.vcYear);

  const isBeforeMinDate = selectedMonth < self.private.dateMin.getMonth() && selectedYear <= self.private.dateMin.getFullYear();
  const isAfterMaxDate = selectedMonth > self.private.dateMax.getMonth() && selectedYear >= self.private.dateMax.getFullYear();

  self.private.selectedYear = selectedYear;
  self.private.selectedMonth = isBeforeMinDate ? self.private.dateMin.getMonth() : isAfterMaxDate ? self.private.dateMax.getMonth() : selectedMonth;
};

const handleItemClick = (self: VanillaCalendarPro, event: MouseEvent, type: (typeof typeClick)[number], itemEl: HTMLButtonElement) => {
  const selectByType = {
    year: () => {
      if (self.viewType === 'multiple') return handleMultipleYearSelection(self, itemEl);
      self.private.selectedYear = Number(itemEl.dataset.vcYearsYear);
    },
    month: () => {
      if (self.viewType === 'multiple') return handleMultipleMonthSelection(self, itemEl);
      self.private.selectedMonth = Number(itemEl.dataset.vcMonthsMonth);
    },
  };
  selectByType[type]();

  const actionByType = {
    year: () => self.onClickYear?.(event, self),
    month: () => self.onClickMonth?.(event, self),
  };
  actionByType[type]();

  if (self.private.currentType !== self.viewType) {
    self.private.currentType = self.viewType;
    create(self);
    self.private.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
  } else {
    console.log(self, itemEl);
    setMonthOrYearModifier(self, itemEl, type, true, true);
  }
};

const handleClickType = (self: VanillaCalendarPro, event: MouseEvent, type: (typeof typeClick)[number]) => {
  const target = event.target as HTMLElement;

  const headerEl = target.closest<HTMLElement>(`[data-vc="${type}"]`);
  const createByType = {
    year: () => createYears(self, target),
    month: () => createMonths(self, target),
  };
  if (headerEl && self.onClickTitle) self.onClickTitle(event, self);
  if (headerEl && self.private.currentType !== type) return createByType[type]();

  const itemEl = target.closest<HTMLButtonElement>(`[data-vc-${type}s-${type}]`);
  if (itemEl) return handleItemClick(self, event, type, itemEl);

  const gridEl = target.closest<HTMLElement>('[data-vc="grid"]');
  const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

  if ((self.private.currentType === type && headerEl) || (self.viewType === 'multiple' && self.private.currentType === type && gridEl && !columnEl)) {
    self.private.currentType = self.viewType;
    create(self);
    self.private.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
  }
};

const handleClickMonthOrYear = (self: VanillaCalendarPro, event: MouseEvent) => {
  const typesMap = { month: self.selectionMonthsMode, year: self.selectionYearsMode };

  typeClick.forEach((type) => {
    if (!typesMap[type] || !event.target) return;
    handleClickType(self, event, type);
  });
};

export default handleClickMonthOrYear;
