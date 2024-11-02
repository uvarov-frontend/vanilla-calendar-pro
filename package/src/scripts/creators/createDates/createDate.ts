import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import getDate from '@scripts/utils/getDate';
import getLocaleString from '@scripts/utils/getLocaleString';
import getWeekNumber from '@scripts/utils/getWeekNumber';
import type { FormatDateString, VanillaCalendarPro, WeekDayID } from '@src/index';

const addWeekNumberForDate = (self: VanillaCalendarPro, dateEl: HTMLElement, dateStr: FormatDateString) => {
  const weekNumber = getWeekNumber(dateStr, self.firstWeekday);
  if (!weekNumber) return;
  dateEl.dataset.vcDateWeekNumber = String(weekNumber.week);
};

const setDaysAsDisabled = (self: VanillaCalendarPro, date: FormatDateString, dayWeekID: WeekDayID) => {
  const isDisableWeekday = self.disableWeekdays?.includes(dayWeekID);
  const isDisableAllDaysAndIsRangeEnabled = self.disableAllDates && !!self.private.enableDates?.[0];

  if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !self.private.enableDates?.includes(date) && !self.private.disableDates?.includes(date)) {
    self.private.disableDates.push(date);
    self.private.disableDates?.sort((a, b) => +new Date(a) - +new Date(b));
  }
};

const createDate = (
  self: VanillaCalendarPro,
  currentYear: number,
  datesEl: HTMLElement,
  dateID: number,
  dateStr: FormatDateString,
  monthType: 'current' | 'prev' | 'next',
) => {
  const dayWeekID = getDate(dateStr).getDay() as WeekDayID;
  const localeDate = typeof self.locale === 'string' && self.locale.length ? self.locale : 'en';

  const dateEl = document.createElement('div');
  dateEl.className = self.styles.date;
  dateEl.dataset.vcDate = dateStr;
  dateEl.dataset.vcDateMonth = monthType;
  dateEl.dataset.vcDateWeekDay = String(dayWeekID);

  const dateBtnEl = document.createElement('button');
  dateBtnEl.className = self.styles.dateBtn;
  dateBtnEl.type = 'button';
  dateBtnEl.role = 'gridcell';
  dateBtnEl.ariaLabel = getLocaleString(dateStr, localeDate, { dateStyle: 'long', timeZone: 'UTC' });
  dateBtnEl.dataset.vcDateBtn = '';
  dateBtnEl.innerText = String(dateID);

  if (self.enableWeekNumbers) addWeekNumberForDate(self, dateEl, dateStr);
  if (monthType !== 'current' ? self.displayDatesOutside : true) dateEl.appendChild(dateBtnEl);

  setDaysAsDisabled(self, dateStr, dayWeekID);
  setDateModifier(self, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType);

  datesEl.appendChild(dateEl);
  if (self.onCreateDateEls) self.onCreateDateEls(dateEl, self);
};

export default createDate;
