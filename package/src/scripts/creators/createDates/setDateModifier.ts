import type { FormatDateString, WeekDayID } from '@package/types';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateAttribute = (dateEl: HTMLElement, condition: boolean | undefined, attr: string, value = '') => {
  if (condition) {
    dateEl.setAttribute(attr, value);
  } else if (dateEl.getAttribute(attr) === value) {
    dateEl.removeAttribute(attr);
  }
};

const setDateModifier = (
  self: VanillaCalendar,
  currentYear: number,
  dateEl: HTMLElement,
  dateBtnEl: HTMLButtonElement,
  dayWeekID: WeekDayID,
  dateStr: FormatDateString,
  monthType: 'current' | 'prev' | 'next',
) => {
  const isDisabled =
    getDate(self.private.displayDateMin) > getDate(dateStr) ||
    getDate(self.private.displayDateMax) < getDate(dateStr) ||
    self.private.disableDates?.includes(dateStr) ||
    (!self.settings.selection.month && monthType !== 'current') ||
    (!self.settings.selection.year && getDate(dateStr).getFullYear() !== currentYear);

  // Check if the date is disabled
  updateAttribute(dateEl, isDisabled, 'data-vc-date-disabled');
  updateAttribute(dateBtnEl, isDisabled, 'aria-disabled', 'true');
  updateAttribute(dateBtnEl, isDisabled, 'tabindex', '-1');

  // Check if the date is today
  updateAttribute(dateEl, self.settings.visibility.today && getDateString(self.date.today) === dateStr, 'data-vc-date-today');
  updateAttribute(dateEl, self.settings.visibility.today && getDateString(self.date.today) === dateStr, 'aria-current', 'date');

  // Check if the date is a weekend
  updateAttribute(dateEl, self.settings.selected.weekend?.includes(dayWeekID), 'data-vc-date-weekend');

  // Check if the date is a holiday
  updateAttribute(dateEl, self.settings.selected.holidays?.includes(dateStr), 'data-vc-date-holiday');

  // Check if the date is selected
  if (self.selectedDates?.includes(dateStr)) {
    dateEl.setAttribute('data-vc-date-selected', '');
    dateBtnEl.setAttribute('aria-selected', 'true');
    if (self.selectedDates.length > 1 && self.settings.selection.day === 'multiple-ranged') {
      if (self.selectedDates[0] === dateStr) dateEl.setAttribute('data-vc-date-selected', 'first');
      if (self.selectedDates[self.selectedDates.length - 1] === dateStr) dateEl.setAttribute('data-vc-date-selected', 'last');
      if (self.selectedDates[0] !== dateStr && self.selectedDates[self.selectedDates.length - 1] !== dateStr)
        dateEl.setAttribute('data-vc-date-selected', 'middle');
    }
  } else if (dateEl.hasAttribute('data-vc-date-selected')) {
    dateEl.removeAttribute('data-vc-date-selected');
    dateBtnEl.removeAttribute('aria-selected');
  }

  // When using multiple-ranged with range edges only (only includes start/end selected dates)
  if (
    !self.private.disableDates.includes(dateStr) &&
    self.settings.range.edgesOnly &&
    self.selectedDates.length > 1 &&
    self.settings.selection.day === 'multiple-ranged'
  ) {
    const firstDate = getDate(self.selectedDates[0]);
    const lastDate = getDate(self.selectedDates[self.selectedDates.length - 1]);
    const currentDate = getDate(dateStr);
    updateAttribute(dateEl, currentDate > firstDate && currentDate < lastDate, 'data-vc-date-selected', 'middle');
  }
};

export default setDateModifier;
