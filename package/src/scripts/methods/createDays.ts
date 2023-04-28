import { FormatDateString, IVanillaCalendar } from '../../types';
import createPopup from './createPopup';
import createWeekNumbers from './createWeekNumbers';
import generateDate from '../helpers/generateDate';
import getWeekNumber from './getWeekNumber';

const createDays = (self: IVanillaCalendar) => {
	const daysEls = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.days}`) as NodeListOf<HTMLElement>;
	const weekNumbersEls = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.weekNumbers}`) as NodeListOf<HTMLElement>;

	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	const templateDayEl = document.createElement('div');
	const templateDayBtnEl = document.createElement('button');
	templateDayEl.className = self.CSSClasses.day;
	templateDayBtnEl.className = self.CSSClasses.dayBtn;
	templateDayBtnEl.type = 'button';

	self.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

	daysEls.forEach((_, index: number) => {
		const selectedMonth = new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth();
		const selectedYear = new Date(initDate.setFullYear((self.selectedYear as number), (self.selectedMonth as number) + index)).getFullYear();

		const firstDay = new Date(selectedYear, selectedMonth, 1);
		const daysSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

		let firstDayWeek = Number(firstDay.getDay());
		if (self.settings.iso8601) firstDayWeek = Number((firstDay.getDay() !== 0 ? firstDay.getDay() : 7) - 1);

		if (self.settings.selection.day && ['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day)) {
			daysEls[index].classList.add(self.CSSClasses.daysSelecting);
		}

		daysEls[index].innerHTML = '';

		const setDayModifier = (dayEl: HTMLElement, dayBtnEl: HTMLElement, dayID: number, date: string, otherMonth: boolean) => {
			// if range min/max
			if ((self.rangeMin as FormatDateString) > date || (self.rangeMax as FormatDateString) < date) {
				dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
				dayBtnEl.tabIndex = -1;
			}

			// if weekend
			if (self.settings.visibility.weekend && (dayID === 0 || dayID === 6)) {
				dayBtnEl.classList.add(self.CSSClasses.dayBtnWeekend);
			}

			// if holidays
			if (Array.isArray(self.selectedHolidays)) {
				self.selectedHolidays.forEach((holiday) => {
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
				if (self.settings.selection.day === 'multiple-ranged' && self.selectedDates.length > 1) {
					dayEl.classList.add(self.CSSClasses.daySelectedFirst);
				} else {
					dayEl.classList.add(self.CSSClasses.daySelected);
				}
				dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
			} else if (self.selectedDates && self.selectedDates[0] && (self.selectedDates.indexOf(date as FormatDateString) === self.selectedDates.length - 1)) {
				dayEl.classList.add(self.CSSClasses.daySelected);
				if (self.settings.selection.day === 'multiple-ranged') {
					dayEl.classList.add(self.CSSClasses.daySelectedLast);
				} else {
					dayEl.classList.add(self.CSSClasses.daySelected);
				}
				dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
			} else if (self.selectedDates && self.selectedDates.indexOf(date as FormatDateString) > 0 && self.settings.selection.day === 'multiple-ranged') {
				dayEl.classList.add(self.CSSClasses.daySelectedIntermediate);
				dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
				dayBtnEl.classList.add(self.CSSClasses.dayBtnIntermediate);
			} else if (self.selectedDates && self.selectedDates.indexOf(date as FormatDateString) > 0) {
				dayEl.classList.add(self.CSSClasses.daySelected);
				dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
			}

			// if range values
			if (Array.isArray(self.rangeDisabled) && self.rangeDisabled[0]) {
				self.rangeDisabled.forEach((dateDisabled) => {
					if (dateDisabled === date) {
						dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
						dayBtnEl.tabIndex = -1;
					}
				});
			}

			// if disabled selected
			if (!self.settings.selection.month && otherMonth) {
				dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
				dayBtnEl.tabIndex = -1;
			}
			if (!self.settings.selection.year && new Date(`${date} 00:00:00`).getFullYear() !== selectedYear) {
				dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
				dayBtnEl.tabIndex = -1;
			}
		};

		const createDay = (dayText: string, dayID: number, date: string, otherMonth: boolean, modifier: string | null) => {
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

			if (self.rangeEnabled?.[0] && self.settings.range.disableAllDays && !self.rangeDisabled?.includes(date as FormatDateString)) {
				self.rangeDisabled?.push(date as FormatDateString);
			}

			if (self.rangeEnabled?.[0] && self.rangeDisabled?.includes(date as FormatDateString)) {
				self.rangeDisabled = self.rangeDisabled?.filter((d: FormatDateString) => !self.rangeEnabled?.includes(d));
			}

			if (self.settings.range.disableWeekday?.includes(dayID) && !self.rangeDisabled?.includes(date as FormatDateString)) {
				self.rangeDisabled?.push(date as FormatDateString);
			}

			setDayModifier(dayEl, dayBtnEl, dayID, date, otherMonth);

			if (otherMonth) {
				if (self.settings.visibility.daysOutside) dayEl.append(dayBtnEl);
			} else {
				dayEl.append(dayBtnEl);
			}

			daysEls[index].append(dayEl);
		};

		const prevMonth = () => {
			const prevMonthDays = new Date(selectedYear, selectedMonth, 0).getDate();
			let day = prevMonthDays - firstDayWeek;
			let year = selectedYear;
			let month: number | string = selectedMonth;

			if (selectedMonth === 0) {
				month = self.locale.months.length;
				year = selectedYear - 1;
			} else if (selectedMonth < 10) {
				month = `0${selectedMonth}`;
			}

			for (let i = 0; i < firstDayWeek; i++) {
				day += 1;

				const date = `${year}-${month}-${day}` as FormatDateString;
				const dayIDCurrent = new Date(selectedYear, selectedMonth, day - 1);
				const prevMonthID = dayIDCurrent.getMonth() - 1;
				const dayID = new Date(selectedYear, prevMonthID, day).getDay();

				createDay(String(day), dayID, date, true, self.CSSClasses.dayBtnPrev);
			}
		};

		const currentMonth = () => {
			for (let i = 1; i <= daysSelectedMonth; i++) {
				const day = new Date(selectedYear, selectedMonth, i);
				const date = generateDate(day);
				const dayID = day.getDay();

				createDay(String(i), dayID, date, false, null);
			}
		};

		const nextMonth = () => {
			const total = firstDayWeek + daysSelectedMonth;
			const rows = Math.ceil(total / self.locale.weekday.length);
			const nextDays = (self.locale.weekday.length * rows) - total;

			let year = selectedYear;
			let month = String(selectedMonth + 2);

			if ((selectedMonth + 1) === self.locale.months.length) {
				month = '01';
				year = selectedYear + 1;
			} else if ((selectedMonth + 2) < 10) {
				month = `0${selectedMonth + 2}`;
			}

			for (let i = 1; i <= nextDays; i++) {
				const day = i < 10 ? `0${i}` : String(i);
				const date = `${year}-${month}-${day}` as FormatDateString;
				const dayIDCurrent = new Date(selectedYear, selectedMonth, i);
				const nextMonthID = dayIDCurrent.getMonth() + 1;
				const dayID = new Date(selectedYear, nextMonthID, i).getDay();

				createDay(String(i), dayID, date, true, self.CSSClasses.dayBtnNext);
			}
		};

		prevMonth();
		currentMonth();
		nextMonth();
		createPopup(self, (daysEls[index] as HTMLElement));
		createWeekNumbers(self, firstDayWeek, daysSelectedMonth, weekNumbersEls[index], daysEls[index]);
	});

	self.rangeDisabled?.sort((a, b) => +new Date(a) - +new Date(b));
};

export default createDays;
