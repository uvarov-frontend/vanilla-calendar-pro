import type { WeekDayID } from '@package/types';
import type VanillaCalendar from '@src/vanilla-calendar';

type WeekdaysData = Array<{
  id: WeekDayID;
  value: string;
  isWeekend: boolean;
}>;

const createWeek = (self: VanillaCalendar) => {
  const weekend = self.settings.selected.weekend ? [...self.settings.selected.weekend] : [];
  const weekdaysData = [...self.locale.weekday].reduce(
    (acc, day, index) => [
      ...acc,
      {
        id: index as WeekDayID,
        value: day,
        isWeekend: weekend.includes(index as WeekDayID),
      },
    ],
    [] as WeekdaysData,
  );
  const weekdays = [...weekdaysData.slice(self.weekStartDay), ...weekdaysData.slice(0, self.weekStartDay)];

  self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => {
    const templateWeekDayEl: HTMLElement = document.createElement('b');
    weekdays.forEach((weekday) => {
      const weekDayName = weekday.value;
      const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;
      weekDayEl.innerText = weekDayName;
      weekDayEl.className = self.CSSClasses.weekDay;
      weekDayEl.dataset.vcWeekDay = String(weekday.id);
      if (weekday.isWeekend) weekDayEl.dataset.vcWeekDayOff = '';

      weekEl.appendChild(weekDayEl);
    });
  });
};

export default createWeek;
