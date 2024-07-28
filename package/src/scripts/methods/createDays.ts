import { FormatDateString } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import getDateString from '@scripts/helpers/getDateString';
import getDate from '@scripts/helpers/getDate';
import getWeekNumber from '@scripts/helpers/getWeekNumber';
import createPopup from '@scripts/methods/createPopup';
import createWeekNumbers from '@scripts/methods/createWeekNumbers';

const setDisabledDays = (self: VanillaCalendar, date: FormatDateString, dayWeekID: number) => {
	const isDisableWeekday = self.settings.range.disableWeekday?.includes(dayWeekID);
	const isDisableAllDaysAndIsRangeEnabled = self.settings.range.disableAllDays && !!self.rangeEnabled?.[0];

	if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !self.rangeEnabled?.includes(date) && !self.rangeDisabled?.includes(date)) {
		self.rangeDisabled.push(date);
		self.rangeDisabled?.sort((a, b) => +new Date(a) - +new Date(b));
	}
};

const setDayModifier = (
	self: VanillaCalendar,
	year: number,
	dayEl: HTMLElement,
	dayBtnEl: HTMLElement,
	dayWeekID: number,
	date: FormatDateString,
	month: string,
) => {
	if (
		getDate(self.rangeMin) > getDate(date)
		|| getDate(self.rangeMax) < getDate(date)
		|| self.rangeDisabled?.includes(date)
		|| (!self.settings.selection.month && (month === 'prev' || month === 'next'))
		|| (!self.settings.selection.year && getDate(date).getFullYear() !== year)) {
		dayBtnEl.classList.add(...self.CSSClasses.dayBtnDisabled.trim().split(' '));
		dayBtnEl.tabIndex = -1;
	}

	// if today
	if (self.settings.visibility.today && getDateString(self.date.today) === date) {
		dayBtnEl.classList.add(...self.CSSClasses.dayBtnToday.trim().split(' '));
	}

	// if weekend
	if (self.settings.visibility.weekend && (dayWeekID === 0 || dayWeekID === 6)) {
		dayBtnEl.classList.add(...self.CSSClasses.dayBtnWeekend.trim().split(' '));
	}

	// if holidays
	if (self.selectedHolidays?.includes(date)) {
		dayBtnEl.classList.add(...self.CSSClasses.dayBtnHoliday.trim().split(' '));
	}

	// if selected day
	if (self.selectedDates?.includes(date)) {
		dayBtnEl.classList.add(...self.CSSClasses.dayBtnSelected.trim().split(' '));
		if (self.selectedDates.length > 1 && self.settings.selection.day === 'multiple-ranged') {
			if (self.selectedDates[0] === date) {
				dayEl.classList.add(...self.CSSClasses.daySelectedFirst.trim().split(' '));
			}
			if (self.selectedDates[self.selectedDates.length - 1] === date) {
				dayEl.classList.add(...self.CSSClasses.daySelectedLast.trim().split(' '));
			}
			if (self.selectedDates[0] !== date && self.selectedDates[self.selectedDates.length - 1] !== date) {
				dayEl.classList.add(...self.CSSClasses.daySelectedIntermediate.trim().split(' '));
			}
		}
	}
};

const createDay = (
	self: VanillaCalendar,
	year: number,
	daysEl: HTMLElement,
	day: number,
	dayWeekID: number,
	date: FormatDateString,
	month: string,
	modifier: string | null,
) => {
	const dayEl = document.createElement('div');
	dayEl.className = self.CSSClasses.day;
	dayEl.setAttribute('data-calendar-day', '');

	const dayBtnEl = document.createElement('button');
	dayBtnEl.className = `${self.CSSClasses.dayBtn}${modifier ? ` ${modifier}` : ''}`;
	dayBtnEl.type = 'button';
	dayBtnEl.setAttribute('data-calendar-day-btn', month);
	dayBtnEl.innerText = String(day);
	dayBtnEl.dataset.calendarDay = date;

	const addWeekNumber = () => {
		const weekNumber = getWeekNumber(date, self.settings.iso8601);
		if (!weekNumber) return;
		dayBtnEl.dataset.calendarWeekNumber = String(weekNumber.week);
	};

	if (self.settings.visibility.weekNumbers) addWeekNumber();

	if (month === 'prev' || month === 'next') {
		if (self.settings.visibility.daysOutside) dayEl.appendChild(dayBtnEl);
	} else {
		dayEl.appendChild(dayBtnEl);
	}

	setDisabledDays(self, date, dayWeekID);
	setDayModifier(self, year, dayEl, dayBtnEl, dayWeekID, date, month);

	daysEl.appendChild(dayEl);
	if (self.actions.getDays) self.actions.getDays(day, date, dayEl, dayBtnEl, self);
};

const prevMonth = (self: VanillaCalendar, daysEl: HTMLElement, selectedYear: number, selectedMonth: number, firstDayWeek: number) => {
	let day = new Date(selectedYear, selectedMonth, 0).getDate() - (firstDayWeek - 1);
	const year = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
	const month = selectedMonth === 0 ? 12 : selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;

	for (let i = firstDayWeek; i > 0; i--, day++) {
		const date = `${year}-${month}-${day}` as FormatDateString;
		const dayWeekID = getDate(date).getDay();
		createDay(self, selectedYear, daysEl, day, dayWeekID, date, 'prev', self.CSSClasses.dayBtnPrev);
	}
};

const currentMonth = (self: VanillaCalendar, daysEl: HTMLElement, daysSelectedMonth: number, selectedYear: number, selectedMonth: number) => {
	for (let i = 1; i <= daysSelectedMonth; i++) {
		const day = new Date(selectedYear, selectedMonth, i);
		const date = getDateString(day);
		const dayWeekID = day.getDay();

		createDay(self, selectedYear, daysEl, i, dayWeekID, date, 'current', null);
	}
};

const nextMonth = (self: VanillaCalendar, daysEl: HTMLElement, daysSelectedMonth: number, selectedYear: number, selectedMonth: number, firstDayWeek: number) => {
	const currentTotalDays = firstDayWeek + daysSelectedMonth;
	const rowsDays = Math.ceil(currentTotalDays / 7);
	const daysNextMonth = (7 * rowsDays) - currentTotalDays;
	const year = (selectedMonth + 1) === 12 ? selectedYear + 1 : selectedYear;
	const month = (selectedMonth + 1) === 12 ? '01' : (selectedMonth + 2) < 10 ? `0${selectedMonth + 2}` : selectedMonth + 2;

	for (let i = 1; i <= daysNextMonth; i++) {
		const day = i < 10 ? `0${i}` : String(i);
		const date = `${year}-${month}-${day}` as FormatDateString;
		const dayWeekID = getDate(date).getDay();
		createDay(self, selectedYear, daysEl, i, dayWeekID, date, 'next', self.CSSClasses.dayBtnNext);
	}
};

const createDays = (self: VanillaCalendar) => {
	const daysEls: NodeListOf<HTMLElement> = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.days}`);
	const weekNumbersEls: NodeListOf<HTMLElement> = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.weekNumbers}`);
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	daysEls.forEach((daysEl, index: number) => {
		const selectedDate = new Date(initDate);
		selectedDate.setMonth(selectedDate.getMonth() + index);

		const selectedMonth = selectedDate.getMonth();
		const selectedYear = selectedDate.getFullYear();

		const firstDay = new Date(selectedYear, selectedMonth, 1);
		const daysSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
		const firstDayWeek = self.settings.iso8601 ? (firstDay.getDay() !== 0 ? firstDay.getDay() : 7) - 1 : firstDay.getDay();

		if (self.settings.selection.day) daysEl.classList.add(self.CSSClasses.daysSelecting);
		daysEl.textContent = '';

		prevMonth(self, daysEl, selectedYear, selectedMonth, firstDayWeek);
		currentMonth(self, daysEl, daysSelectedMonth, selectedYear, selectedMonth);
		nextMonth(self, daysEl, daysSelectedMonth, selectedYear, selectedMonth, firstDayWeek);
		createWeekNumbers(self, firstDayWeek, daysSelectedMonth, weekNumbersEls[index], daysEl);
		createPopup(self, daysEl);
	});
};

export default createDays;
