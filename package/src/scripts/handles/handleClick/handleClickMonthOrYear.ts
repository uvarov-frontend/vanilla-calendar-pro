import create from '@scripts/creators/create';
import createMonths from '@scripts/creators/createMonths';
import createYears from '@scripts/creators/createYears';
import setMonthOrYearModifier from '@scripts/creators/setMonthOrYearModifier';
import animate, { captureOpacity, playOpacity } from '@scripts/utils/animate';
import getColumnID from '@scripts/utils/getColumnID';
import getDate from '@scripts/utils/getDate';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';

const typeClick = ['month', 'year'] as const;

const WRAPPER = '[data-vc="wrapper"]';
const COLUMN = '[data-vc="column"]';

const getColumnIndex = (self: Calendar, el: HTMLElement) => {
  const columnEl = el.closest<HTMLElement>(COLUMN);
  if (!columnEl) return 0;
  return Array.from(self.context.mainElement.querySelectorAll<HTMLElement>(COLUMN)).indexOf(columnEl);
};

// Only one column is re-rendered, but the dim of the others changes along with it,
// so the opacity is captured before the render and played out afterwards.
const changeType = (self: Calendar, columnIndex: number, render: () => void) => {
  const dim = captureOpacity(self, COLUMN);
  animate(self, WRAPPER, 'fade', render, columnIndex);
  playOpacity(self, COLUMN, dim);
};

// Both callers leave the picker the same way: find which column is showing it, switch the
// context back, animate that column, and restore focus to the header that opened it.
const leavePicker = (self: Calendar, type: (typeof typeClick)[number]) => {
  const { columnID } = getColumnID(self, self.context.currentType);
  setContext(self, 'currentType', self.type);
  changeType(self, columnID, () => create(self));
  self.context.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
};

const getValue = (self: Calendar, type: (typeof typeClick)[number], id: number) => {
  const { currentValue, columnID } = getColumnID(self, type);

  if (self.context.currentType === 'month' && columnID >= 0) return id - columnID;
  if (self.context.currentType === 'year' && self.context.selectedYear !== currentValue) return id - 1;
  return id;
};

const handleMultipleYearSelection = (self: Calendar, itemEl: HTMLElement) => {
  const selectedYear = getValue(self, 'year', Number(itemEl.dataset.vcYearsYear));
  const dateMin = getDate(self.context.dateMin);
  const dateMax = getDate(self.context.dateMax);
  const monthCount = self.context.displayMonthsCount - 1;
  const { columnID } = getColumnID(self, 'year');

  const isBeforeMinDate = self.context.selectedMonth < dateMin.getMonth() && selectedYear <= dateMin.getFullYear();
  const isAfterMaxDate = self.context.selectedMonth > dateMax.getMonth() - monthCount + columnID && selectedYear >= dateMax.getFullYear();
  const isBeforeMinYear = selectedYear < dateMin.getFullYear();
  const isAfterMaxYear = selectedYear > dateMax.getFullYear();

  const newSelectedYear = isBeforeMinDate || isBeforeMinYear ? dateMin.getFullYear() : isAfterMaxDate || isAfterMaxYear ? dateMax.getFullYear() : selectedYear;
  const newSelectedMonth =
    isBeforeMinDate || isBeforeMinYear
      ? dateMin.getMonth()
      : isAfterMaxDate || isAfterMaxYear
        ? dateMax.getMonth() - monthCount + columnID
        : self.context.selectedMonth;

  setContext(self, 'selectedYear', newSelectedYear);
  setContext(self, 'selectedMonth', newSelectedMonth as Range<12>);
};

const handleMultipleMonthSelection = (self: Calendar, itemEl: HTMLElement) => {
  const column = itemEl.closest('[data-vc-column="month"]') as HTMLElement;
  const yearEl = column.querySelector('[data-vc="year"]') as HTMLElement;
  const selectedMonth = getValue(self, 'month', Number(itemEl.dataset.vcMonthsMonth));
  const selectedYear = Number(yearEl.dataset.vcYear);
  const dateMin = getDate(self.context.dateMin);
  const dateMax = getDate(self.context.dateMax);

  const isBeforeMinDate = selectedMonth < dateMin.getMonth() && selectedYear <= dateMin.getFullYear();
  const isAfterMaxDate = selectedMonth > dateMax.getMonth() && selectedYear >= dateMax.getFullYear();

  setContext(self, 'selectedYear', selectedYear);
  setContext(self, 'selectedMonth', (isBeforeMinDate ? dateMin.getMonth() : isAfterMaxDate ? dateMax.getMonth() : selectedMonth) as Range<12>);
};

const handleItemClick = (self: Calendar, event: MouseEvent, type: (typeof typeClick)[number], itemEl: HTMLButtonElement) => {
  const selectByType = {
    year: () => {
      if (self.type === 'multiple') return handleMultipleYearSelection(self, itemEl);
      setContext(self, 'selectedYear', Number(itemEl.dataset.vcYearsYear));
    },
    month: () => {
      if (self.type === 'multiple') return handleMultipleMonthSelection(self, itemEl);
      setContext(self, 'selectedMonth', Number(itemEl.dataset.vcMonthsMonth) as Range<12>);
    },
  };
  selectByType[type]();

  const actionByType = {
    year: () => self.onClickYear?.(self, event),
    month: () => self.onClickMonth?.(self, event),
  };
  actionByType[type]();

  if (self.context.currentType !== self.type) {
    leavePicker(self, type);
  } else {
    setMonthOrYearModifier(self, itemEl, type, true, true);
  }
};

// The picker is opened by a click, so the focus follows it onto its own tab stop. It must not
// move on any other render: navigating the year list would otherwise pull the focus off the arrow.
const focusPicker = (self: Calendar, type: (typeof typeClick)[number], columnEl: HTMLElement | null) =>
  (columnEl ?? self.context.mainElement).querySelector<HTMLElement>(`[data-vc-${type}s-${type}][tabindex="0"]`)?.focus();

const handleClickType = (self: Calendar, event: MouseEvent, type: (typeof typeClick)[number]) => {
  const target = event.target as HTMLElement;

  const headerEl = target.closest<HTMLElement>(`[data-vc="${type}"]`);
  const columnIndex = getColumnIndex(self, target);
  const createByType = {
    year: () => changeType(self, columnIndex, () => createYears(self, target)),
    month: () => changeType(self, columnIndex, () => createMonths(self, target)),
  };
  if (headerEl && self.onClickTitle) self.onClickTitle(self, event);
  if (headerEl && self.context.currentType !== type) {
    const columnEl = target.closest<HTMLElement>(COLUMN);
    createByType[type]();
    return focusPicker(self, type, columnEl);
  }

  const itemEl = target.closest<HTMLButtonElement>(`[data-vc-${type}s-${type}]`);
  if (itemEl) return handleItemClick(self, event, type, itemEl);

  const gridEl = target.closest<HTMLElement>('[data-vc="grid"]');
  const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

  if ((self.context.currentType === type && headerEl) || (self.type === 'multiple' && self.context.currentType === type && gridEl && !columnEl)) {
    leavePicker(self, type);
  }
};

const handleClickMonthOrYear = (self: Calendar, event: MouseEvent) => {
  const typesMap = { month: self.selectionMonthsMode, year: self.selectionYearsMode };

  typeClick.forEach((type) => {
    if (!typesMap[type] || !event.target) return;
    handleClickType(self, event, type);
  });
};

export default handleClickMonthOrYear;
