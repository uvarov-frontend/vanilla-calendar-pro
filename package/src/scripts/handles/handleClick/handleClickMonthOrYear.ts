import create from '@scripts/creators/create';
import createMonths from '@scripts/creators/createMonths';
import createYears from '@scripts/creators/createYears';
import setMonthOrYearModifier from '@scripts/creators/setMonthOrYearModifier';
import getDate from '@scripts/utils/getDate';
import type { Range, VanillaCalendarPro } from '@src/index';

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
  const dateMin = getDate(self.private.dateMin);
  const dateMax = getDate(self.private.dateMax);

  const isBeforeMinDate = self.private.selectedMonth < dateMin.getMonth() && selectedYear <= dateMin.getFullYear();
  const isAfterMaxDate = self.private.selectedMonth > dateMax.getMonth() && selectedYear >= dateMax.getFullYear();
  const isBeforeMinYear = selectedYear < dateMin.getFullYear();
  const isAfterMaxYear = selectedYear > dateMax.getFullYear();

  self.private.selectedYear =
    isBeforeMinDate || isBeforeMinYear ? dateMin.getFullYear() : isAfterMaxDate || isAfterMaxYear ? dateMax.getFullYear() : selectedYear;
  self.private.selectedMonth = (
    isBeforeMinDate || isBeforeMinYear ? dateMin.getMonth() : isAfterMaxDate || isAfterMaxYear ? dateMax.getMonth() : self.private.selectedMonth
  ) as Range<12>;
};

const handleMultipleMonthSelection = (self: VanillaCalendarPro, itemEl: HTMLElement) => {
  const column = itemEl.closest('[data-vc-column="month"]') as HTMLElement;
  const yearEl = column.querySelector('[data-vc="year"]') as HTMLElement;
  const selectedMonth = getColumnID(self, 'month', Number(itemEl.dataset.vcMonthsMonth));
  const selectedYear = Number(yearEl.dataset.vcYear);
  const dateMin = getDate(self.private.dateMin);
  const dateMax = getDate(self.private.dateMax);

  const isBeforeMinDate = selectedMonth < dateMin.getMonth() && selectedYear <= dateMin.getFullYear();
  const isAfterMaxDate = selectedMonth > dateMax.getMonth() && selectedYear >= dateMax.getFullYear();

  self.private.selectedYear = selectedYear;
  self.private.selectedMonth = (isBeforeMinDate ? dateMin.getMonth() : isAfterMaxDate ? dateMax.getMonth() : selectedMonth) as Range<12>;
};

const handleItemClick = (self: VanillaCalendarPro, event: MouseEvent, type: (typeof typeClick)[number], itemEl: HTMLButtonElement) => {
  const selectByType = {
    year: () => {
      if (self.type === 'multiple') return handleMultipleYearSelection(self, itemEl);
      self.private.selectedYear = Number(itemEl.dataset.vcYearsYear);
    },
    month: () => {
      if (self.type === 'multiple') return handleMultipleMonthSelection(self, itemEl);
      self.private.selectedMonth = Number(itemEl.dataset.vcMonthsMonth) as Range<12>;
    },
  };
  selectByType[type]();

  const actionByType = {
    year: () => self.onClickYear?.(self, event),
    month: () => self.onClickMonth?.(self, event),
  };
  actionByType[type]();

  if (self.private.currentType !== self.type) {
    self.private.currentType = self.type;
    create(self);
    self.private.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
  } else {
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
  if (headerEl && self.onClickTitle) self.onClickTitle(self, event);
  if (headerEl && self.private.currentType !== type) return createByType[type]();

  const itemEl = target.closest<HTMLButtonElement>(`[data-vc-${type}s-${type}]`);
  if (itemEl) return handleItemClick(self, event, type, itemEl);

  const gridEl = target.closest<HTMLElement>('[data-vc="grid"]');
  const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

  if ((self.private.currentType === type && headerEl) || (self.type === 'multiple' && self.private.currentType === type && gridEl && !columnEl)) {
    self.private.currentType = self.type;
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
