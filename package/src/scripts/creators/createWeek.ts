import type { Calendar, WeekDayID } from '@src/index';

const createWeek = (self: Calendar) => {
  const weekend = self.selectedWeekends ? [...self.selectedWeekends] : [];
  const weekdaysData = [...self.context.locale.weekdays.long].reduce(
    (acc, day, index) => [
      ...acc,
      {
        id: index as WeekDayID,
        titleShort: self.context.locale.weekdays.short[index],
        titleLong: day,
        isWeekend: weekend.includes(index as WeekDayID),
      },
    ],
    [] as Array<{
      id: WeekDayID;
      titleShort: string;
      titleLong: string;
      isWeekend: boolean;
    }>,
  );
  const weekdays = [...weekdaysData.slice(self.firstWeekday), ...weekdaysData.slice(0, self.firstWeekday)];

  // A columnheader is not a role a button may carry, so the clickable variant keeps the header
  // cell as its own element and nests the button inside it.
  const isClickable = !!self.onClickWeekDay;
  const templateWeekDayEl = document.createElement(isClickable ? 'div' : 'b');
  const templateWeekDayBtnEl = document.createElement('button');
  templateWeekDayBtnEl.type = 'button';
  templateWeekDayBtnEl.className = self.styles.weekDayBtn;
  templateWeekDayBtnEl.dataset.vcWeekDayBtn = '';

  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => {
    weekdays.forEach((weekday) => {
      const weekDayEl = templateWeekDayEl.cloneNode(false) as HTMLElement;
      weekDayEl.className = self.styles.weekDay;
      weekDayEl.role = 'columnheader';
      weekDayEl.ariaLabel = weekday.titleLong;
      weekDayEl.dataset.vcWeekDay = String(weekday.id);
      if (weekday.isWeekend) weekDayEl.dataset.vcWeekDayOff = '';

      if (isClickable) {
        const weekDayBtnEl = templateWeekDayBtnEl.cloneNode(false) as HTMLButtonElement;
        weekDayBtnEl.innerText = weekday.titleShort;
        weekDayBtnEl.ariaLabel = weekday.titleLong;
        weekDayEl.appendChild(weekDayBtnEl);
      } else {
        weekDayEl.innerText = weekday.titleShort;
      }

      weekEl.appendChild(weekDayEl);
    });
  });
};

export default createWeek;
