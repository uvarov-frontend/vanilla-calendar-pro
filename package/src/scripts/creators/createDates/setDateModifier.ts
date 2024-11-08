import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

const updateAttribute = (el: HTMLElement | HTMLButtonElement, condition: boolean | undefined, attr: string, value = '') => {
  if (condition) {
    el.setAttribute(attr, value);
  } else if (el.getAttribute(attr) === value) {
    el.removeAttribute(attr);
  }
};

const setDateModifier = (
  self: Calendar,
  currentYear: number,
  dateEl: HTMLElement,
  dateBtnEl: HTMLButtonElement | undefined,
  dayWeekID: WeekDayID,
  dateStr: FormatDateString,
  monthType: 'current' | 'prev' | 'next',
) => {
  const isDisabled =
    getDate(self.context.displayDateMin) > getDate(dateStr) ||
    getDate(self.context.displayDateMax) < getDate(dateStr) ||
    self.context.disableDates?.includes(dateStr) ||
    (!self.selectionMonthsMode && monthType !== 'current') ||
    (!self.selectionYearsMode && getDate(dateStr).getFullYear() !== currentYear);

  // Check if the date is disabled
  updateAttribute(dateEl, isDisabled, 'data-vc-date-disabled');
  if (dateBtnEl) updateAttribute(dateBtnEl, isDisabled, 'aria-disabled', 'true');
  if (dateBtnEl) updateAttribute(dateBtnEl, isDisabled, 'tabindex', '-1');

  // Check if the date is today
  updateAttribute(dateEl, !self.disableToday && self.context.dateToday === dateStr, 'data-vc-date-today');
  updateAttribute(dateEl, !self.disableToday && self.context.dateToday === dateStr, 'aria-current', 'date');

  // Check if the date is a weekend
  updateAttribute(dateEl, self.selectedWeekends?.includes(dayWeekID), 'data-vc-date-weekend');

  // Check if the date is a holiday
  const selectedHolidays = self.selectedHolidays?.[0] ? parseDates(self.selectedHolidays) : [];
  updateAttribute(dateEl, selectedHolidays.includes(dateStr), 'data-vc-date-holiday');

  // Check if the date is selected
  if (self.context.selectedDates?.includes(dateStr)) {
    dateEl.setAttribute('data-vc-date-selected', '');
    if (dateBtnEl) dateBtnEl.setAttribute('aria-selected', 'true');
    if (self.context.selectedDates.length > 1 && self.selectionDatesMode === 'multiple-ranged') {
      if (self.context.selectedDates[0] === dateStr) dateEl.setAttribute('data-vc-date-selected', 'first');
      if (self.context.selectedDates[self.context.selectedDates.length - 1] === dateStr) dateEl.setAttribute('data-vc-date-selected', 'last');
      if (self.context.selectedDates[0] !== dateStr && self.context.selectedDates[self.context.selectedDates.length - 1] !== dateStr)
        dateEl.setAttribute('data-vc-date-selected', 'middle');
    }
  } else if (dateEl.hasAttribute('data-vc-date-selected')) {
    dateEl.removeAttribute('data-vc-date-selected');
    if (dateBtnEl) dateBtnEl.removeAttribute('aria-selected');
  }

  // When using multiple-ranged with range edges only (only includes start/end selected dates)
  if (self.enableEdgeDatesOnly && self.context.selectedDates.length > 1 && self.selectionDatesMode === 'multiple-ranged') {
    const firstDate = getDate(self.context.selectedDates[0]);
    const lastDate = getDate(self.context.selectedDates[self.context.selectedDates.length - 1]);
    const currentDate = getDate(dateStr);
    updateAttribute(dateEl, currentDate > firstDate && currentDate < lastDate, 'data-vc-date-selected', 'middle');
  }
};

export default setDateModifier;
