import type VanillaCalendar from '@src/vanilla-calendar';

const createDaysOfTheWeek = (self: VanillaCalendar, weekEl: HTMLElement, weekday: string[]) => {
  const templateWeekDayEl: HTMLElement = document.createElement('b');

  for (let i = 0; i < weekday.length; i++) {
    const weekDayName = weekday[i];
    const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;

    weekDayEl.className = self.CSSClasses.weekDay;
    weekDayEl.dataset.vcWeekDay =
      self.settings.visibility.weekend && self.settings.iso8601
        ? i === 5 || i === 6
          ? `off`
          : 'work'
        : self.settings.visibility.weekend && !self.settings.iso8601
          ? i === 0 || i === 6
            ? `off`
            : 'work'
          : '';
    weekDayEl.innerText = weekDayName;
    weekEl.appendChild(weekDayEl);
  }
};

const createWeek = (self: VanillaCalendar) => {
  const weekday = [...self.locale.weekday];
  if (!weekday[0]) return;

  if (self.settings.iso8601) weekday.push(weekday.shift() as string);
  self.HTMLElement.querySelectorAll<HTMLElement>('[data-vc="week"]').forEach((weekEl) => createDaysOfTheWeek(self, weekEl, weekday));
};

export default createWeek;
