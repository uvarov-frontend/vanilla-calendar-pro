import VanillaCalendar from '@src/vanilla-calendar';

const createWeekDays = (self: VanillaCalendar, weekEl: HTMLElement, weekday: string[], longWeekday: string[]) => {
	const templateWeekDayEl = document.createElement('b');
	weekEl.textContent = '';

	for (let i = 0; i < weekday.length; i++) {
		const weekDayName = weekday[i];
		const longWeekdayName = longWeekday[i];
		const weekDayEl = templateWeekDayEl.cloneNode(true) as HTMLElement;
		weekDayEl.ariaLabel = longWeekdayName;
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
	const longWeekday = [...self.locale.longWeekday];
	if (!weekday[0]) return;
	if (self.settings.iso8601) weekday.push((weekday.shift() as string));
	if (self.settings.iso8601) longWeekday.push((longWeekday.shift() as string));
	const weekEls: NodeListOf<HTMLElement> = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.week}`);
	weekEls.forEach((weekEl) => createWeekDays(self, weekEl, weekday, longWeekday));
};

export default createWeek;
