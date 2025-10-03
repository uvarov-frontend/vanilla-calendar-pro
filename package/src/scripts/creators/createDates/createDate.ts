import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import getDate from '@scripts/utils/getDate';
import getLocaleString from '@scripts/utils/getLocaleString';
import getWeekNumber from '@scripts/utils/getWeekNumber';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

export interface DateContainer {
  addDate: (dateEl: HTMLElement) => void;
}

const addWeekNumberForDate = (self: Calendar, dateEl: HTMLElement, dateStr: FormatDateString) => {
  const weekNumber = getWeekNumber(dateStr, self.firstWeekday);
  if (!weekNumber) return;
  dateEl.dataset.vcDateWeekNumber = String(weekNumber.week);
};

const setDaysAsDisabled = (self: Calendar, date: FormatDateString, dayWeekID: WeekDayID) => {
  const isDisableWeekday = self.disableWeekdays?.includes(dayWeekID);
  const isDisableAllDaysAndIsRangeEnabled = self.disableAllDates && !!self.context.enableDates?.[0];

  if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !self.context.enableDates?.includes(date) && !self.context.disableDates?.includes(date)) {
    self.context.disableDates.push(date);
    self.context.disableDates?.sort((a, b) => +new Date(a) - +new Date(b));
  }
};

const createDate = (
  self: Calendar,
  currentYear: number,
  datesContainer: DateContainer,
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
  dateEl.role = 'gridcell';

  let dateBtnEl: HTMLButtonElement | undefined = undefined;
  if (monthType !== 'current' ? self.displayDatesOutside : true) {
    dateBtnEl = document.createElement('button');
    dateBtnEl.className = self.styles.dateBtn;
    dateBtnEl.type = 'button';
    dateBtnEl.ariaLabel = getLocaleString(dateStr, localeDate, { dateStyle: 'long', timeZone: 'UTC' });
    dateBtnEl.dataset.vcDateBtn = '';
    dateBtnEl.innerText = String(dateID);
    dateEl.appendChild(dateBtnEl);
  }

  if (self.enableWeekNumbers) addWeekNumberForDate(self, dateEl, dateStr);

  setDaysAsDisabled(self, dateStr, dayWeekID);
  setDateModifier(self, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType);

  datesContainer.addDate(dateEl);
  if (self.onCreateDateEls) self.onCreateDateEls(self, dateEl);
};

export default createDate;
