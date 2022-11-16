import { FormatDateString, IVanillaCalendar } from 'src/types';
import createPopup from './createPopup';
import createWeekNumbers from './createWeekNumbers';
import generateDate from './generateDate';
import getWeekNumber from './getWeekNumber';

const createDays = (self: IVanillaCalendar) => {
	if (self.selectedMonth === undefined || self.selectedYear === undefined) return;
	const firstDay = new Date(Date.UTC(self.selectedYear, self.selectedMonth, 1));
	const daysSelectedMonth = new Date(Date.UTC(self.selectedYear, self.selectedMonth + 1, 0)).getUTCDate();

	let firstDayWeek = Number(firstDay.getUTCDay());
	if (self.settings.iso8601) firstDayWeek = Number((firstDay.getUTCDay() !== 0 ? firstDay.getUTCDay() : 7) - 1);

	const daysEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.days}`);
	if (!daysEl) return;
	const templateDayEl = document.createElement('div');
	const templateDayBtnEl = document.createElement('button');
	templateDayEl.className = self.CSSClasses.day;
	templateDayBtnEl.className = self.CSSClasses.dayBtn;
	templateDayBtnEl.type = 'button';

	if (self.settings.selection.day && ['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day)) {
		daysEl.classList.add(self.CSSClasses.daysSelecting);
	}

	daysEl.innerHTML = '';

	const setDayModifier = (dayBtnEl: HTMLElement, dayID: number, date: string, currentMonth: boolean) => {
		// if weekend
		if (self.settings.visibility.weekend && (dayID === 0 || dayID === 6)) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnWeekend);
		}

		// if holidays
		if (Array.isArray(self.settings.selected.holidays)) {
			self.settings.selected.holidays.forEach((holiday) => {
				if (holiday === date) {
					dayBtnEl.classList.add(self.CSSClasses.dayBtnHoliday);
				}
			});
		}

		// if today
		let thisToday: string | number = self.date.today.getDate();
		let thisMonth: string | number = self.date.today.getMonth() + 1;
		thisToday = thisToday < 10 ? `0${thisToday}` : thisToday;
		thisMonth = thisMonth < 10 ? `0${thisMonth}` : thisMonth;

		const thisDay = `${self.date.today.getFullYear()}-${thisMonth}-${thisToday}`;

		if (self.settings.visibility.today && dayBtnEl.dataset.calendarDay === thisDay) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnToday);
		}

		// if selected day
		if (self.selectedDates && self.selectedDates.indexOf(date as FormatDateString) === 0) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
		} else if (self.selectedDates && self.selectedDates[0] && (self.selectedDates.indexOf(date as FormatDateString) === self.selectedDates.length - 1)) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
		} else if (self.selectedDates && self.selectedDates.indexOf(date as FormatDateString) > 0 && self.settings.selection.day === 'multiple-ranged') {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
			dayBtnEl.classList.add(self.CSSClasses.dayBtnIntermediate);
		} else if (self.selectedDates && self.selectedDates.indexOf(date as FormatDateString) > 0) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
		}

		// if range min/max
		if (self.settings.range.min > date || self.settings.range.max < date) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
			dayBtnEl.tabIndex = -1;
		}

		// if disabled selected
		if (!self.settings.selection.month && !currentMonth) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
			dayBtnEl.tabIndex = -1;
		}
		if (!self.settings.selection.year && new Date(date).getFullYear() !== self.selectedYear) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
			dayBtnEl.tabIndex = -1;
		}

		// if range values
		if (Array.isArray(self.settings.range.disabled)) {
			self.settings.range.disabled.forEach((dateDisabled) => {
				if (dateDisabled === date) {
					dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
					dayBtnEl.tabIndex = -1;
				}
			});
		} else if (Array.isArray(self.settings.range.enabled)) {
			dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
			dayBtnEl.tabIndex = -1;
			self.settings.range.enabled.forEach((dateEnabled) => {
				if (dateEnabled === date) {
					dayBtnEl.classList.remove(self.CSSClasses.dayBtnDisabled);
					dayBtnEl.tabIndex = 0;
				}
			});
		}
	};

	const createDay = (dayText: string, dayID: number, date: string, currentMonth: boolean, modifier: string | null) => {
		const dayEl = templateDayEl.cloneNode(true) as HTMLDivElement;
		const dayBtnEl = templateDayBtnEl.cloneNode(true) as HTMLButtonElement;

		if (modifier) dayBtnEl.classList.add(modifier);
		dayBtnEl.innerText = dayText;
		dayBtnEl.dataset.calendarDay = date;

		if (self.settings.visibility.weekNumbers) {
			const weekNumber = getWeekNumber(date, self.settings.iso8601);
			if (!weekNumber) return;
			dayBtnEl.dataset.calendarWeekNumber = `${weekNumber.week}`;
		}

		setDayModifier(dayBtnEl, dayID, date, currentMonth);
		dayEl.append(dayBtnEl);
		daysEl.append(dayEl);
	};

	const prevMonth = () => {
		if (self.selectedMonth === undefined || self.selectedYear === undefined) return;
		const prevMonthDays = new Date(Date.UTC(self.selectedYear, self.selectedMonth, 0)).getUTCDate();
		let day = prevMonthDays - firstDayWeek;
		let year = self.selectedYear;
		let month: number | string = self.selectedMonth;

		if (self.selectedMonth === 0) {
			month = self.locale.months.length;
			year = self.selectedYear - 1;
		} else if (self.selectedMonth < 10) {
			month = `0${self.selectedMonth}`;
		}

		for (let i = 0; i < firstDayWeek; i++) {
			day += 1;

			const date = `${year}-${month}-${day}` as FormatDateString;
			const dayIDCurrent = new Date(Date.UTC(self.selectedYear, self.selectedMonth, day - 1));
			const prevMonthID = dayIDCurrent.getUTCMonth() - 1;
			const dayID = new Date(Date.UTC(self.selectedYear, prevMonthID, day)).getUTCDay();

			createDay(String(day), dayID, date, false, self.CSSClasses.dayBtnPrev);
		}
	};

	const selectedMonth = () => {
		if (self.selectedMonth === undefined || self.selectedYear === undefined) return;
		for (let i = 1; i <= daysSelectedMonth; i++) {
			const day = new Date(Date.UTC(self.selectedYear, self.selectedMonth, i));
			const date = generateDate(day);
			const dayID = day.getUTCDay();

			createDay(String(i), dayID, date, true, null);
		}
	};

	const nextMonth = () => {
		if (self.selectedMonth === undefined || self.selectedYear === undefined) return;
		const total = firstDayWeek + daysSelectedMonth;
		const rows = Math.ceil(total / self.locale.weekday.length);
		const nextDays = (self.locale.weekday.length * rows) - total;

		let year = self.selectedYear;
		let month = String(self.selectedMonth + 2);

		if ((self.selectedMonth + 1) === self.locale.months.length) {
			month = '01';
			year = self.selectedYear + 1;
		} else if ((self.selectedMonth + 2) < 10) {
			month = `0${self.selectedMonth + 2}`;
		}

		for (let i = 1; i <= nextDays; i++) {
			const day = i < 10 ? `0${i}` : String(i);
			const date = `${year}-${month}-${day}` as FormatDateString;
			const dayIDCurrent = new Date(Date.UTC(self.selectedYear, self.selectedMonth, i));
			const nextMonthID = dayIDCurrent.getUTCMonth() + 1;
			const dayID = new Date(Date.UTC(self.selectedYear, nextMonthID, i)).getUTCDay();

			createDay(String(i), dayID, date, false, self.CSSClasses.dayBtnNext);
		}
	};

	prevMonth();
	selectedMonth();
	nextMonth();
	createPopup(self, (daysEl as HTMLElement));
	createWeekNumbers(self, firstDayWeek, daysSelectedMonth);
};

export default createDays;
