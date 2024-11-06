import state from '@scripts/handles/handleSelectDateRange/state';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';

const updateDisabledDates = () => {
  if (!state.self?.context?.selectedDates?.[0] || !state.self.context.disableDates?.[0]) return;
  const selectedDate = getDate(state.self.context.selectedDates[0]);

  const [startDate, endDate] = state.self.context.disableDates
    .map((dateStr) => getDate(dateStr))
    .reduce<
      [Date | null, Date | null]
    >(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);

  if (startDate) state.self.context.displayDateMin = getDateString(new Date(startDate.setDate(startDate.getDate() + 1)));
  if (endDate) state.self.context.displayDateMax = getDateString(new Date(endDate.setDate(endDate.getDate() - 1)));

  const isDisablePast =
    state.self.disableDatesPast && !state.self.disableAllDates && getDate(state.self.context.displayDateMin) < getDate(state.self.context.dateToday);
  if (isDisablePast) state.self.context.displayDateMin = state.self.context.dateToday;
};

export default updateDisabledDates;
