import state from '@scripts/handles/handleSelectDateRange/state';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import setContext from '@scripts/utils/setContext';

const updateDisabledDates = () => {
  if (!state.self?.context?.selectedDates?.[0] || !state.self.context.disableDates?.[0]) return;
  const selectedDate = getDate(state.self.context.selectedDates[0]);

  const [startDate, endDate] = state.self.context.disableDates
    .map((dateStr) => getDate(dateStr))
    .reduce<
      [Date | null, Date | null]
    >(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);

  if (startDate) setContext(state.self, 'displayDateMin', getDateString(new Date(startDate.setDate(startDate.getDate() + 1))));
  if (endDate) setContext(state.self, 'displayDateMax', getDateString(new Date(endDate.setDate(endDate.getDate() - 1))));

  const isDisablePast =
    state.self.disableDatesPast && !state.self.disableAllDates && getDate(state.self.context.displayDateMin) < getDate(state.self.context.dateToday);
  if (isDisablePast) setContext(state.self, 'displayDateMin', state.self.context.dateToday);
};

export default updateDisabledDates;
