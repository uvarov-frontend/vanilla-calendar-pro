import type { FormatDateString } from '@package/types';
import getDate from '@scripts/helpers/getDate';
import getDateString from '@scripts/helpers/getDateString';
import type VanillaCalendar from '@src/vanilla-calendar';

const setDateModifier = (
  self: VanillaCalendar,
  currentYear: number,
  dateEl: HTMLElement,
  dayWeekID: number,
  dateStr: FormatDateString,
  monthType: 'current' | 'prev' | 'next',
) => {
  // if disabled
  const isDisabled =
    getDate(self.rangeMin) > getDate(dateStr) ||
    getDate(self.rangeMax) < getDate(dateStr) ||
    self.rangeDisabled?.includes(dateStr) ||
    (!self.settings.selection.month && monthType !== 'current') ||
    (!self.settings.selection.year && getDate(dateStr).getFullYear() !== currentYear);
  if (isDisabled) {
    dateEl.tabIndex = -1;
    dateEl.dataset.vcDateDisabled = '';
  }

  // if today
  if (self.settings.visibility.today && getDateString(self.date.today) === dateStr) dateEl.dataset.vcDateToday = '';

  // if weekend
  if (self.settings.visibility.weekend && (dayWeekID === 0 || dayWeekID === 6)) dateEl.dataset.vcDateWeekend = '';

  // if holidays
  if (self.selectedHolidays?.includes(dateStr)) dateEl.dataset.vcDateHoliday = '';

  // if selected day
  if (self.selectedDates?.includes(dateStr)) {
    dateEl.dataset.vcDateSelected = '';
    if (self.selectedDates.length > 1 && self.settings.selection.day === 'multiple-ranged') {
      if (self.selectedDates[0] === dateStr) dateEl.dataset.vcDateSelected = 'first';
      if (self.selectedDates[self.selectedDates.length - 1] === dateStr) dateEl.dataset.vcDateSelected = 'last';
      if (self.selectedDates[0] !== dateStr && self.selectedDates[self.selectedDates.length - 1] !== dateStr) dateEl.dataset.vcDateSelected = 'middle';
    }
  }

  // when using multiple-ranged with range edges only (only includes start/end selected dates)
  if (self.settings.range.edgesOnly && self.selectedDates.length > 1 && self.settings.selection.day === 'multiple-ranged') {
    const firstDate = +new Date(self.selectedDates[0]);
    const lastDate = +new Date(self.selectedDates[self.selectedDates.length - 1]);
    const nextDate = +new Date(dateStr);

    if (nextDate > firstDate && nextDate < lastDate) dateEl.dataset.vcDateSelected = 'middle';
  }
};

export default setDateModifier;
