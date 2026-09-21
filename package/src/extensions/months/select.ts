import getDate from '@scripts/utils/getDate';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';
import getColumnID from './column';

const getValue = (self: Calendar, type: 'month' | 'year', id: number) => {
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

export default (self: Calendar, type: 'month' | 'year', item: HTMLElement) =>
  type === 'month' ? handleMultipleMonthSelection(self, item) : handleMultipleYearSelection(self, item);
