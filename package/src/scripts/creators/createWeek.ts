import type { VanillaCalendarPro, WeekDayID } from '@src/index';

const createWeek = (self: VanillaCalendarPro) => {
  const weekend = self.selectedWeekends ? [...self.selectedWeekends] : [];
  const weekdaysData = [...self.private.locale.weekdays.long].reduce(
    (acc, day, index) => [
      ...acc,
      {
        id: index as WeekDayID,
        titleShort: self.private.locale.weekdays.short[index],
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

  self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => {
    const templateWeekDayEl = document.createElement('button');
    templateWeekDayEl.type = 'button';
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
