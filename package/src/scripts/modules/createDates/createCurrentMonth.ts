import getDateString from '@scripts/helpers/getDateString';
import createDate from '@scripts/modules/createDates/createDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const createCurrentMonth = (self: VanillaCalendar, datesEl: HTMLElement, days: number, currentYear: number, currentMonth: number) => {
  for (let dateID = 1; dateID <= days; dateID++) {
    const date = new Date(currentYear, currentMonth, dateID);
    createDate(self, currentYear, datesEl, dateID, date.getDay(), getDateString(date), 'current');
  }
};

export default createCurrentMonth;
