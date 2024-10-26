import type { FormatDateString, WeekDayID } from '@package/types';
import getDate from '@scripts/helpers/getDate';
import getDateString from '@scripts/helpers/getDateString';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateAttribute = (dateEl: HTMLElement, condition: boolean | undefined, attr: string, value = '') => {
  if (condition) {
    dateEl.setAttribute(attr, value);
  } else if (dateEl.hasAttribute(attr)) {
    dateEl.removeAttribute('data-vc-date-weekend');
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
    getDate(self.rangeMin) > getDate(dateStr) ||
    getDate(self.rangeMax) < getDate(dateStr) ||
    self.rangeDisabled?.includes(dateStr) ||
    (!self.settings.selection.month && monthType !== 'current') ||
    (!self.settings.selection.year && getDate(dateStr).getFullYear() !== currentYear);

  // Check if the date is disabled
  updateAttribute(dateEl, isDisabled, 'data-vc-date-disabled');
  updateAttribute(dateBtnEl, isDisabled, 'aria-disabled', 'true');
  updateAttribute(dateBtnEl, isDisabled, 'tabindex', '-1');

  // Check if the date is today
  updateAttribute(dateEl, self.settings.visibility.today && getDateString(self.date.today) === dateStr, 'data-vc-date-today');

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
  if (self.settings.range.edgesOnly && self.selectedDates.length > 1 && self.settings.selection.day === 'multiple-ranged') {
    const firstDate = +new Date(self.selectedDates[0]);
    const lastDate = +new Date(self.selectedDates[self.selectedDates.length - 1]);
    const nextDate = +new Date(dateStr);

    updateAttribute(dateEl, nextDate > firstDate && nextDate < lastDate, 'data-vc-date-selected', 'middle');
  }
};

export default setDateModifier;
