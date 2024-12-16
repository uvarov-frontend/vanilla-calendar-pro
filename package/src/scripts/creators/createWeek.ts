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

  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => {
    const templateWeekDayEl = !!self.onClickWeekDay ? document.createElement('button') : document.createElement('b');
    if (!!self.onClickWeekDay) (templateWeekDayEl as HTMLButtonElement).type = 'button';
    weekdays.forEach((weekday) => {
      const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;
      weekDayEl.innerText = weekday.titleShort;
      weekDayEl.className = self.styles.weekDay;
      weekDayEl.role = 'columnheader';
      weekDayEl.ariaLabel = weekday.titleLong;
      weekDayEl.dataset.vcWeekDay = String(weekday.id);
      if (weekday.isWeekend) weekDayEl.dataset.vcWeekDayOff = '';
      weekEl.appendChild(weekDayEl);
    });
  });
};

export default createWeek;
