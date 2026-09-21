import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const updateDisabledDates = (self: Calendar) => {
  if (!self?.context?.selectedDates?.[0] || !self.context.disableDates?.[0]) return;
  const selectedDate = getDate(self.context.selectedDates[0]);

  const [startDate, endDate] = self.context.disableDates
    .map((dateStr) => getDate(dateStr))
    .reduce<
      [Date | null, Date | null]
    >(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);

  if (startDate) setContext(self, 'displayDateMin', getDateString(new Date(startDate.setDate(startDate.getDate() + 1))));
  if (endDate) setContext(self, 'displayDateMax', getDateString(new Date(endDate.setDate(endDate.getDate() - 1))));

  const isDisablePast = self.disableDatesPast && !self.disableAllDates && getDate(self.context.displayDateMin) < getDate(self.context.dateToday);
  if (isDisablePast) setContext(self, 'displayDateMin', self.context.dateToday);
};

export default updateDisabledDates;
