import { FormatDateString, IVanillaCalendar } from '@src/types';
import generateDate from '@helpers/generateDate';
import getDate from '@helpers/getDate';
import createPopup from '@methods/createPopup';
import createWeekNumbers from '@methods/createWeekNumbers';
import getWeekNumber from '@methods/getWeekNumber';

const setDayModifier = (
	self: IVanillaCalendar,
	year: number,
	dayEl: HTMLElement,
	dayBtnEl: HTMLElement,
	dayWeekID: number,
	date: FormatDateString,
	otherMonth: boolean,
) => {
	if (
		getDate(self.rangeMin) > getDate(date)
		|| getDate(self.rangeMax) < getDate(date)
		|| self.rangeDisabled?.includes(date)
		|| (!self.settings.selection.month && otherMonth)
		|| (!self.settings.selection.year && getDate(date).getFullYear() !== year)) {
		dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
		dayBtnEl.tabIndex = -1;
	}

	// if today
	if (self.settings.visibility.today && generateDate(self.date.today) === date) {
		dayBtnEl.classList.add(self.CSSClasses.dayBtnToday);
	}

	// if weekend
	if (self.settings.visibility.weekend && (dayWeekID === 0 || dayWeekID === 6)) {
		dayBtnEl.classList.add(self.CSSClasses.dayBtnWeekend);
	}

	// if holidays
	if (self.selectedHolidays?.includes(date)) {
		dayBtnEl.classList.add(self.CSSClasses.dayBtnHoliday);
	}

	// if selected day
	if (self.selectedDates?.includes(date)) {
		dayEl.classList.add(self.CSSClasses.daySelected);
		dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);

		if (self.selectedDates.length > 1 && self.settings.selection.day === 'multiple-ranged') {
			if (self.selectedDates[0] === date) {
				dayEl.classList.add(self.CSSClasses.daySelectedFirst);
				dayBtnEl.classList.add(self.CSSClasses.daySelectedFirst);
			} else if (self.selectedDates[self.selectedDates.length - 1] === date) {
				dayEl.classList.add(self.CSSClasses.daySelectedLast);
				dayBtnEl.classList.add(self.CSSClasses.dayBtnSelectedLast);
			} else {
				dayEl.classList.add(self.CSSClasses.daySelectedIntermediate);
				dayBtnEl.classList.add(self.CSSClasses.dayBtnSelectedIntermediate);
			}
		}
	}
};

const createDay = (
	self: IVanillaCalendar,
	year: number,
	daysEl: HTMLElement,
	day: number,
	dayWeekID: number,
	date: FormatDateString,
	otherMonth: boolean,
	modifier: string | null,
) => {
	const dayEl = document.createElement('div');
	dayEl.className = self.CSSClasses.day;

	const dayBtnEl = document.createElement('button');
	dayBtnEl.className = `${self.CSSClasses.dayBtn}${modifier ? ` ${modifier}` : ''}`;
	dayBtnEl.type = 'button';
	dayBtnEl.innerText = String(day);
	dayBtnEl.dataset.calendarDay = date;

	const addWeekNumber = () => {
		const weekNumber = getWeekNumber(date, self.settings.iso8601);
		if (!weekNumber) return;
		dayBtnEl.dataset.calendarWeekNumber = String(weekNumber.week);
	};

	if (self.settings.visibility.weekNumbers) addWeekNumber();

	if (otherMonth) {
		if (self.settings.visibility.daysOutside) dayEl.append(dayBtnEl);
	} else {
		dayEl.append(dayBtnEl);
	}

	// TODO: refactoring this code
	if (self.rangeEnabled?.[0] && self.settings.range.disableAllDays && !self.rangeDisabled?.includes(date as FormatDateString)) {
		self.rangeDisabled?.push(date as FormatDateString);
	}

	if (self.rangeEnabled?.[0] && self.rangeDisabled?.includes(date as FormatDateString)) {
		self.rangeDisabled = self.rangeDisabled?.filter((d: FormatDateString) => !self.rangeEnabled?.includes(d));
	}

	if (self.settings.range.disableWeekday?.includes(dayWeekID) && !self.rangeDisabled?.includes(date as FormatDateString)) {
		self.rangeDisabled?.push(date as FormatDateString);
	}
	// end

	setDayModifier(self, year, dayEl, dayBtnEl, dayWeekID, date, otherMonth);

	daysEl.append(dayEl);
	if (self.actions.getDays) self.actions.getDays(day, date, dayEl, dayBtnEl);
};

const prevMonth = (self: IVanillaCalendar, daysEl: HTMLElement, selectedYear: number, selectedMonth: number, firstDayWeek: number) => {
	let day = new Date(selectedYear, selectedMonth, 0).getDate() - (firstDayWeek - 1);
	const year = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
	const month = selectedMonth === 0 ? 12 : selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;

	for (let i = firstDayWeek; i > 0; i--, day++) {
		const date = `${year}-${month}-${day}` as FormatDateString;
		const dayWeekID = getDate(date).getDay();
		createDay(self, selectedYear, daysEl, day, dayWeekID, date, true, self.CSSClasses.dayBtnPrev);
	}
};

const currentMonth = (self: IVanillaCalendar, daysEl: HTMLElement, daysSelectedMonth: number, selectedYear: number, selectedMonth: number) => {
	for (let i = 1; i <= daysSelectedMonth; i++) {
		const day = new Date(selectedYear, selectedMonth, i);
		const date = generateDate(day);
		const dayWeekID = day.getDay();

		createDay(self, selectedYear, daysEl, i, dayWeekID, date, false, null);
	}
};

const nextMonth = (self: IVanillaCalendar, daysEl: HTMLElement, daysSelectedMonth: number, selectedYear: number, selectedMonth: number, firstDayWeek: number) => {
	const currentTotalDays = firstDayWeek + daysSelectedMonth;
	const rowsDays = Math.ceil(currentTotalDays / self.locale.weekday.length);
	const daysNextMonth = (self.locale.weekday.length * rowsDays) - currentTotalDays;
	const year = (selectedMonth + 1) === 12 ? selectedYear + 1 : selectedYear;
	const month = (selectedMonth + 1) === 12 ? '01' : (selectedMonth + 2) < 10 ? `0${selectedMonth + 2}` : selectedMonth + 2;

	for (let i = 1; i <= daysNextMonth; i++) {
		const day = i < 10 ? `0${i}` : String(i);
		const date = `${year}-${month}-${day}` as FormatDateString;
		const dayWeekID = getDate(date).getDay();
		createDay(self, selectedYear, daysEl, i, dayWeekID, date, true, self.CSSClasses.dayBtnNext);
	}
};

const createDays = (self: IVanillaCalendar) => {
	const daysEls: NodeListOf<HTMLElement> = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.days}`);
	const weekNumbersEls: NodeListOf<HTMLElement> = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.weekNumbers}`);
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);
	self.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

	daysEls.forEach((daysEl, index: number) => {
		const selectedDate = new Date(initDate);
		selectedDate.setMonth(selectedDate.getMonth() + index);

		const selectedMonth = selectedDate.getMonth();
		const selectedYear = selectedDate.getFullYear();

		const firstDay = new Date(selectedYear, selectedMonth, 1);
		const daysSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
		const firstDayWeek = self.settings.iso8601 ? (firstDay.getDay() !== 0 ? firstDay.getDay() : 7) - 1 : firstDay.getDay();

		if (self.settings.selection.day) daysEl.classList.add(self.CSSClasses.daysSelecting);
		daysEl.innerHTML = '';

		prevMonth(self, daysEl, selectedYear, selectedMonth, firstDayWeek);
		currentMonth(self, daysEl, daysSelectedMonth, selectedYear, selectedMonth);
		nextMonth(self, daysEl, daysSelectedMonth, selectedYear, selectedMonth, firstDayWeek);
		createWeekNumbers(self, firstDayWeek, daysSelectedMonth, weekNumbersEls[index], daysEl);
		createPopup(self, daysEl);
	});

	self.rangeDisabled?.sort((a, b) => +new Date(a) - +new Date(b));
};

export default createDays;
