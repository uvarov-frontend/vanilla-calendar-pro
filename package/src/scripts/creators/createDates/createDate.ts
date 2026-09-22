import { getDateRules, prepareDateRules } from '@scripts/creators/createDates/dateRules';
import setDateModifier from '@scripts/creators/createDates/setDateModifier';
import getDate from '@scripts/utils/getDate';
import getLocaleString from '@scripts/utils/getLocaleString';
import sortDates from '@scripts/utils/sortDates';
import { getExtensions } from '@src/extension';
import type { Calendar, FormatDateString, WeekDayID } from '@src/index';

export const setDaysAsDisabled = (self: Calendar, date: FormatDateString, dayWeekID: WeekDayID) => {
  const isDisableWeekday = self.disableWeekdays?.includes(dayWeekID);
  const isDisableAllDaysAndIsRangeEnabled = self.disableAllDates && !!self.context.enableDates?.[0];

  const rules = getDateRules(self);
  if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !rules.enabled.set.has(date) && !rules.disabled.set.has(date)) {
    const dates = self.context.disableDates;
    rules.disabled.set.add(date);
    // Callbacks can change the public array's order. Keep their existing sorting
    // behavior; otherwise insert into the sorted list without sorting it again.
    if (!!self.onCreateDateEls) {
      dates.push(date);
      sortDates(dates);
      rules.disabled.values = dates.slice();
    } else {
      const time = +new Date(date);
      let low = 0;
      let high = dates.length;
      while (low < high) {
        const middle = (low + high) >>> 1;
        if (+new Date(dates[middle]) <= time) low = middle + 1;
        else high = middle;
      }
      dates.splice(low, 0, date);
      rules.disabled.values.splice(low, 0, date);
    }
  }
};

const createDate = (
  self: Calendar,
  currentYear: number,
  datesContainer: { addDate: (dateEl: HTMLElement) => void },
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

  let dateBtnEl: HTMLButtonElement | undefined;
  if (monthType !== 'current' ? self.displayDatesOutside : true) {
    dateBtnEl = document.createElement('button');
    dateBtnEl.className = self.styles.dateBtn;
    dateBtnEl.type = 'button';
    dateBtnEl.dataset.vcDateBtn = '';
    dateBtnEl.ariaLabel = getLocaleString(dateStr, localeDate);
    dateBtnEl.innerText = String(dateID);
    dateEl.appendChild(dateBtnEl);
  }

  if (self.enableWeekNumbers) getExtensions(self).weeks?.date(self, dateEl, dateStr);

  setDaysAsDisabled(self, dateStr, dayWeekID);
  setDateModifier(self, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType);

  datesContainer.addDate(dateEl);
  if (!!self.onCreateDateEls) {
    self.onCreateDateEls(self, dateEl);
    prepareDateRules(self);
  }
};

export default createDate;
