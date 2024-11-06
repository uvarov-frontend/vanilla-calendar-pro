import state from '@scripts/handles/handleSelectDateRange/state';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';

const updateDisabledDates = () => {
  if (!state.self?.private?.selectedDates?.[0] || !state.self.private.disableDates?.[0]) return;
  const selectedDate = getDate(state.self.private.selectedDates[0]);

  const [startDate, endDate] = state.self.private.disableDates
    .map((dateStr) => getDate(dateStr))
    .reduce<
      [Date | null, Date | null]
    >(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);

  if (startDate) state.self.private.displayDateMin = getDateString(new Date(startDate.setDate(startDate.getDate() + 1)));
  if (endDate) state.self.private.displayDateMax = getDateString(new Date(endDate.setDate(endDate.getDate() - 1)));

  const isDisablePast =
    state.self.disableDatesPast && !state.self.disableAllDates && getDate(state.self.private.displayDateMin) < getDate(state.self.private.dateToday);
  if (isDisablePast) state.self.private.displayDateMin = state.self.private.dateToday;
};

export default updateDisabledDates;
