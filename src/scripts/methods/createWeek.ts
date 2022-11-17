import { IVanillaCalendar } from 'src/types';

const createWeek = (self: IVanillaCalendar) => {
	const weekday = [...self.locale.weekday];
	if (!weekday[0]) return;

	const weekEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.week}`) as HTMLElement;
	const templateWeekDayEl = document.createElement('b');
	templateWeekDayEl.className = self.CSSClasses.weekDay;

	if (self.settings.iso8601) weekday.push((weekday.shift() as string));

	weekEl.innerHTML = '';

	for (let i = 0; i < weekday.length; i++) {
		const weekDayName = weekday[i];
		const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;

		if (self.settings.visibility.weekend && self.settings.iso8601) {
			if (i === 5 || i === 6) {
				weekDayEl.classList.add(self.CSSClasses.weekDayWeekend);
			}
		} else if (self.settings.visibility.weekend && !self.settings.iso8601) {
			if (i === 0 || i === 6) {
				weekDayEl.classList.add(self.CSSClasses.weekDayWeekend);
			}
		}

		weekDayEl.innerText = `${weekDayName}`;
		weekEl.append(weekDayEl);
	}
};

export default createWeek;
