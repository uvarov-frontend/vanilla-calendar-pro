import { getDateRules } from '@scripts/creators/createDates/dateRules';
import getDate from '@scripts/utils/getDate';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

const updateAttribute = (el: HTMLElement | HTMLButtonElement, condition: boolean | undefined, attr: string, value = '') => {
  if (condition) {
    if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
  } else if (el.getAttribute(attr) === value) {
    el.removeAttribute(attr);
  }
};

const getDateTime = (date: FormatDateString) => Date.parse(`${date}T00:00:00`);

const setDateModifier = (
  self: Calendar,
  currentYear: number,
  dateEl: HTMLElement,
  dateBtnEl: HTMLButtonElement | undefined,
  dayWeekID: WeekDayID,
  dateStr: FormatDateString,
  monthType: 'current' | 'prev' | 'next',
) => {
  const dateTime = getDateTime(dateStr);
  const rules = getDateRules(self);
  const isDisabled =
    rules.min > dateTime ||
    rules.max < dateTime ||
    rules.disabled.set.has(dateStr) ||
    (!self.selectionMonthsMode && monthType !== 'current') ||
    (!self.selectionYearsMode && getDate(dateStr).getFullYear() !== currentYear);

  // Check if the date is disabled
  updateAttribute(dateEl, isDisabled, 'data-vc-date-disabled');
  if (dateBtnEl) updateAttribute(dateBtnEl, isDisabled, 'aria-disabled', 'true');
  // Roving focus updates every button after this pass. Removing tabindex from
  // enabled cells here would immediately write it back on almost the whole grid.
  if (dateBtnEl && isDisabled) updateAttribute(dateBtnEl, true, 'tabindex', '-1');
  if (dateBtnEl && dateBtnEl.disabled !== !!isDisabled) dateBtnEl.disabled = !!isDisabled;

  // Check if the date is today
  updateAttribute(dateEl, !self.disableToday && self.context.dateToday === dateStr, 'data-vc-date-today');
  updateAttribute(dateEl, !self.disableToday && self.context.dateToday === dateStr, 'aria-current', 'date');

  // Check if the date is a weekend
  updateAttribute(dateEl, self.selectedWeekends?.includes(dayWeekID), 'data-vc-date-weekend');

  // Check if the date is a holiday
  updateAttribute(dateEl, rules.holidays.has(dateStr), 'data-vc-date-holiday');

  // Check if the date is selected: aria-selected belongs on the gridcell, a button does not support it
  const selected = rules.selected.set.has(dateStr);
  let selectedValue: string | undefined = selected ? '' : undefined;
  if (selected) {
    updateAttribute(dateEl, true, 'aria-selected', 'true');
    if (self.context.selectedDates.length > 1 && self.selectionDatesMode === 'multiple-ranged') {
      if (self.context.selectedDates[0] === dateStr && self.context.selectedDates[self.context.selectedDates.length - 1] === dateStr) {
        selectedValue = 'first-and-last';
      } else if (self.context.selectedDates[0] === dateStr) {
        selectedValue = 'first';
      } else if (self.context.selectedDates[self.context.selectedDates.length - 1] === dateStr) {
        selectedValue = 'last';
      }

      if (self.context.selectedDates[0] !== dateStr && self.context.selectedDates[self.context.selectedDates.length - 1] !== dateStr) selectedValue = 'middle';
    }
  } else if (dateEl.hasAttribute('data-vc-date-selected')) {
    dateEl.removeAttribute('aria-selected');
  }

  // When using multiple-ranged with range edges only (only includes start/end selected dates)
  if (!rules.disabled.set.has(dateStr) && self.enableEdgeDatesOnly && self.context.selectedDates.length > 1 && self.selectionDatesMode === 'multiple-ranged') {
    if (dateTime > rules.first && dateTime < rules.last) selectedValue = 'middle';
    else if (selectedValue === 'middle') selectedValue = undefined;
  }
  if (selectedValue !== undefined) updateAttribute(dateEl, true, 'data-vc-date-selected', selectedValue);
  else if (dateEl.hasAttribute('data-vc-date-selected')) dateEl.removeAttribute('data-vc-date-selected');
};

export default setDateModifier;
