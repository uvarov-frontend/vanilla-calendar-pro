import type { WeekDayID } from '@package/types';
import type VanillaCalendar from '@src/vanilla-calendar';

type WeekdaysData = Array<{
  id: WeekDayID;
  titleShort: string;
  titleLong: string;
  isWeekend: boolean;
}>;

const createWeek = (self: VanillaCalendar) => {
  const weekend = self.settings.selected.weekend ? [...self.settings.selected.weekend] : [];
  const weekdaysData = [...self.locale.weekday.long].reduce(
    (acc, day, index) => [
      ...acc,
      {
        id: index as WeekDayID,
        titleShort: self.locale.weekday.short[index],
        titleLong: day,
        isWeekend: weekend.includes(index as WeekDayID),
      },
    ],
    [] as WeekdaysData,
  );
  const weekdays = [...weekdaysData.slice(self.weekStartDay), ...weekdaysData.slice(0, self.weekStartDay)];

  self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => {
    const templateWeekDayEl = document.createElement('button');
    templateWeekDayEl.type = 'button';
    weekdays.forEach((weekday) => {
      const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;
      weekDayEl.innerText = weekday.titleShort;
      weekDayEl.className = self.CSSClasses.weekDay;
      weekDayEl.role = 'columnheader';
      weekDayEl.ariaLabel = weekday.titleLong;
      weekDayEl.dataset.vcWeekDay = String(weekday.id);
      if (weekday.isWeekend) weekDayEl.dataset.vcWeekDayOff = '';
      weekEl.appendChild(weekDayEl);
    });
  });
};

export default createWeek;
