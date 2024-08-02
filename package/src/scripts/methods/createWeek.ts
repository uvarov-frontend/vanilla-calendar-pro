import VanillaCalendar from '@src/vanilla-calendar';

const createWeekDays = (self: VanillaCalendar, weekEl: HTMLElement, weekday: string[]) => {
	const templateWeekDayEl = document.createElement('b');
	weekEl.textContent = '';

	for (let i = 0; i < weekday.length; i++) {
		const weekDayName = weekday[i];
		const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;
		weekDayEl.setAttribute('data-calendar-week-day', '');
		if (self.settings.visibility.weekend && self.settings.iso8601 && (i === 5 || i === 6)) {
			weekDayEl.setAttribute('data-calendar-week-day-weekend', '');
		}
		weekDayEl.className = `${self.CSSClasses.weekDay}`;
		weekDayEl.className = `${self.CSSClasses.weekDay}${self.settings.visibility.weekend && self.settings.iso8601
			? (i === 5 || i === 6
				? ` ${self.CSSClasses.weekDayWeekend}` : '')
			: self.settings.visibility.weekend && !self.settings.iso8601
				? (i === 0 || i === 6 ? ` ${self.CSSClasses.weekDayWeekend}` : '')
				: ''}`;
		weekDayEl.innerText = `${weekDayName}`;
		weekEl.appendChild(weekDayEl);
	}
};

const createWeek = (self: VanillaCalendar) => {
	const weekday = [...self.locale.weekday];
	if (!weekday[0]) return;
	if (self.settings.iso8601) weekday.push((weekday.shift() as string));
	const weekEls: NodeListOf<HTMLElement> = self.HTMLElement.querySelectorAll('[data-calendar-week]');
	weekEls.forEach((weekEl) => createWeekDays(self, weekEl, weekday));
};

export default createWeek;
