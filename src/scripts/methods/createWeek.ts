import { IVanillaCalendar } from 'src/types';

const createWeek = (self: IVanillaCalendar) => {
	const weekday = [...self.locale.weekday];
	if (!weekday[0]) return;

	const weekEl = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-week');
	const templateWeekDayEl = document.createElement('b');
	templateWeekDayEl.className = 'vanilla-calendar-week__day';

	if (self.settings.iso8601) weekday.push((weekday.shift() as string));

	if (weekEl instanceof HTMLElement) {
		weekEl.innerHTML = '';

		for (let i = 0; i < weekday.length; i++) {
			const weekDayName = weekday[i];
			const weekDayEl = templateWeekDayEl.cloneNode(true);

			if (weekDayEl instanceof HTMLElement) {
				if (self.settings.visibility.weekend && self.settings.iso8601) {
					if (i === 5 || i === 6) {
						weekDayEl.classList.add('vanilla-calendar-week__day_weekend');
					}
				} else if (self.settings.visibility.weekend && !self.settings.iso8601) {
					if (i === 0 || i === 6) {
						weekDayEl.classList.add('vanilla-calendar-week__day_weekend');
					}
				}

				weekDayEl.innerText = `${weekDayName}`;
				weekEl.append(weekDayEl);
			}
		}
	}
};

export default createWeek;
