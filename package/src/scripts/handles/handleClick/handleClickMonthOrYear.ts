import create from '@scripts/creators/create';
import createMonths from '@scripts/creators/createMonths';
import createYears from '@scripts/creators/createYears';
import setMonthOrYearModifier from '@scripts/creators/setMonthOrYearModifier';
import getColumnID from '@scripts/utils/getColumnID';
import getDate from '@scripts/utils/getDate';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';

const typeClick = ['month', 'year'] as const;

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
    setContext(self, 'currentType', self.type);
    create(self);
    self.context.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
  } else {
    setMonthOrYearModifier(self, itemEl, type, true, true);
  }
};

const handleClickType = (self: Calendar, event: MouseEvent, type: (typeof typeClick)[number]) => {
  const target = event.target as HTMLElement;

  const headerEl = target.closest<HTMLElement>(`[data-vc="${type}"]`);
  const createByType = {
    year: () => createYears(self, target),
    month: () => createMonths(self, target),
  };
  if (headerEl && self.onClickTitle) self.onClickTitle(self, event);
  if (headerEl && self.context.currentType !== type) return createByType[type]();

  const itemEl = target.closest<HTMLButtonElement>(`[data-vc-${type}s-${type}]`);
  if (itemEl) return handleItemClick(self, event, type, itemEl);

  const gridEl = target.closest<HTMLElement>('[data-vc="grid"]');
  const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

  if ((self.context.currentType === type && headerEl) || (self.type === 'multiple' && self.context.currentType === type && gridEl && !columnEl)) {
    setContext(self, 'currentType', self.type);
    create(self);
    self.context.mainElement.querySelector<HTMLElement>(`[data-vc="${type}"]`)?.focus();
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
