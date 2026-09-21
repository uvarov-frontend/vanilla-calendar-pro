import { getExtensions } from '@src/extension';
import type { Calendar, WeekDayID } from '@src/index';

const createWeek = (self: Calendar) => {
  const weekend = self.selectedWeekends ? [...self.selectedWeekends] : [];
  const weekdaysData = [...self.context.locale.weekdays.long].map((day, index) => ({
    id: index as WeekDayID,
    titleShort: self.context.locale.weekdays.short[index],
    titleLong: day,
    isWeekend: weekend.includes(index as WeekDayID),
  }));
  const weekdays = [...weekdaysData.slice(self.firstWeekday), ...weekdaysData.slice(0, self.firstWeekday)];

  // A columnheader is not a role a button may carry, so the clickable variant keeps the header
  // cell as its own element and nests the button inside it.
  const createButton = getExtensions(self).weeks?.weekday(self);
  const templateWeekDayEl = document.createElement(createButton ? 'div' : 'b');

  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => {
    weekdays.forEach((weekday) => {
      const weekDayEl = templateWeekDayEl.cloneNode(false) as HTMLElement;
      weekDayEl.className = self.styles.weekDay;
      weekDayEl.role = 'columnheader';
      weekDayEl.ariaLabel = weekday.titleLong;
      weekDayEl.dataset.vcWeekDay = String(weekday.id);
      if (weekday.isWeekend) weekDayEl.dataset.vcWeekDayOff = '';

      if (createButton) createButton(weekDayEl, weekday.titleShort, weekday.titleLong);
      else weekDayEl.innerText = weekday.titleShort;

      weekEl.appendChild(weekDayEl);
    });
  });
};

export default createWeek;
