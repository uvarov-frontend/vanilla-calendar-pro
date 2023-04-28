import { FormatDateString, IVanillaCalendar } from '../../types';
import changeMonth from './changeMonth';
import createDays from './createDays';
import createMonths from './createMonths';
import createYears from './createYears';
import generateDate from '../helpers/generateDate';
import mainMethod from './mainMethod';
import handlerMultipleRanged from './handlerMultipleRanged';

const clickCalendar = (self: IVanillaCalendar) => {
	(self.HTMLElement as HTMLElement).addEventListener('click', (e) => {
		const element = e.target as HTMLElement;

		const arrowEl: HTMLElement | null = element.closest(`.${self.CSSClasses.arrow}`);
		const arrowPrevEl: HTMLElement | null = element.closest(`.${self.CSSClasses.arrowPrev}`);
		const arrowNextEl: HTMLElement | null = element.closest(`.${self.CSSClasses.arrowNext}`);
		const dayBtnEl: HTMLElement | null = element.closest(`.${self.CSSClasses.dayBtn}`);
		const dayBtnPrevEl: HTMLElement | null = element.closest(`.${self.CSSClasses.dayBtnPrev}`);
		const dayBtnNextEl: HTMLElement | null = element.closest(`.${self.CSSClasses.dayBtnNext}`);
		const weekNumberEl: HTMLElement | null = element.closest(`.${self.CSSClasses.weekNumber}`);
		const yearHeaderEl: HTMLElement | null = element.closest(`.${self.CSSClasses.year}`);
		const yearItemEl: HTMLElement | null = element.closest(`.${self.CSSClasses.yearsYear}`);
		const monthHeaderEl: HTMLElement | null = element.closest(`.${self.CSSClasses.month}`);
		const monthItemEl: HTMLElement | null = element.closest(`.${self.CSSClasses.monthsMonth}`);

		const clickArrowMonth = () => {
			if (arrowEl && self.currentType !== 'year' && self.currentType !== 'month') {
				changeMonth(self, element.dataset.calendarArrow);
			}
			if (arrowEl) {
				if (self.actions.clickArrow) self.actions.clickArrow(e, Number(self.selectedYear), Number(self.selectedMonth));
			}
		};

		const clickDaySingle = () => {
			if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay) return;
			if (dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected)) {
				self.selectedDates.splice(self.selectedDates.indexOf(dayBtnEl.dataset.calendarDay as FormatDateString), 1);
			} else {
				self.selectedDates = [];
				self.selectedDates.push(dayBtnEl.dataset.calendarDay as FormatDateString);
			}
		};

		const clickDayMultiple = () => {
			if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay) return;
			if (dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected)) {
				self.selectedDates.splice(self.selectedDates.indexOf(dayBtnEl.dataset.calendarDay as FormatDateString), 1);
			} else {
				self.selectedDates.push(dayBtnEl.dataset.calendarDay as FormatDateString);
			}
		};

		const clickDayMultipleRanged = () => {
			if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay) return;

			if (self.selectedDates.length <= 1 && self.selectedDates[0] && self.selectedDates[0].includes(dayBtnEl.dataset.calendarDay)) {
				self.selectedDates = [];
			} else {
				if (self.selectedDates.length > 1) self.selectedDates = [];
				self.selectedDates.push(dayBtnEl.dataset.calendarDay as FormatDateString);
			}

			if (self.selectedDates[1]) {
				const startDate = new Date(
					new Date(`${self.selectedDates[0]} 00:00:00`).getFullYear(),
					new Date(`${self.selectedDates[0]} 00:00:00`).getMonth(),
					new Date(`${self.selectedDates[0]} 00:00:00`).getDate(),
				);

				const endDate = new Date(
					new Date(`${self.selectedDates[1]} 00:00:00`).getFullYear(),
					new Date(`${self.selectedDates[1]} 00:00:00`).getMonth(),
					new Date(`${self.selectedDates[1]} 00:00:00`).getDate(),
				);

				const addSelectedDate = (day: Date) => {
					if (!self.selectedDates) return;
					const date = generateDate(day);
					if (self.rangeDisabled && self.rangeDisabled.includes(date)) return;
					self.selectedDates.push(date);
				};

				self.selectedDates = [];

				if (endDate > startDate) {
					for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
						addSelectedDate(i);
					}
				} else {
					for (let i = startDate; i >= endDate; i.setDate(i.getDate() - 1)) {
						addSelectedDate(i);
					}
				}
			}

			handlerMultipleRanged(self);
		};

		const clickDay = () => {
			if (self.settings.selection.day && ['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) && dayBtnEl) {
				switch (self.settings.selection.day) {
					case 'single':
						clickDaySingle();
						break;
					case 'multiple':
						clickDayMultiple();
						break;
					case 'multiple-ranged':
						clickDayMultipleRanged();
						break;
					// no default
				}

				if (self.actions.clickDay) self.actions.clickDay(e, self.selectedDates);

				if (self.input && self.HTMLInputElement && self.actions.changeToInput) {
					self.actions.changeToInput(e, self.HTMLInputElement, self.selectedDates, self.selectedTime, self.selectedHours, self.selectedMinutes, self.selectedKeeping);
				}

				if (dayBtnPrevEl) {
					changeMonth(self, 'prev');
				} else if (dayBtnNextEl) {
					changeMonth(self, 'next');
				} else {
					createDays(self);
				}
			}
		};

		const clickWeekNumber = () => {
			if (!self.settings.visibility.weekNumbers || !weekNumberEl || !self.actions.clickWeekNumber) return;
			const daysToWeeks = self.HTMLElement?.querySelectorAll('[data-calendar-week-number]');
			if (!daysToWeeks) return;

			const weekNumberValue = Number(weekNumberEl.innerText);
			const yearWeek = Number(weekNumberEl.dataset.calendarYearWeek);
			const daysOfThisWeek = [...daysToWeeks].filter((day) => Number((day as HTMLElement).dataset.calendarWeekNumber) === weekNumberValue);

			self.actions.clickWeekNumber(e, weekNumberValue, daysOfThisWeek as HTMLElement[], yearWeek);
		};

		const clickYear = () => {
			if (!self.settings.selection.year || self.currentType === 'multiple') return;
			if (arrowEl && self.currentType === 'year') {
				if (self.viewYear === undefined) return;
				if (arrowNextEl) {
					self.viewYear += 15;
				} else if (arrowPrevEl) {
					self.viewYear -= 15;
				}
				createYears(self);
			} else if (self.currentType !== 'year' && yearHeaderEl) {
				createYears(self);
			} else if (self.currentType === 'year' && yearHeaderEl) {
				self.currentType = self.type;
				mainMethod(self);
			} else if (yearItemEl) {
				if (self.selectedMonth === undefined || !self.dateMin || !self.dateMax) return;
				self.selectedYear = Number(yearItemEl.dataset.calendarYear);
				self.currentType = self.type;
				if (self.selectedMonth < self.dateMin.getMonth() && self.selectedYear === self.dateMin.getFullYear()) {
					self.selectedMonth = self.dateMin.getMonth();
				}
				if (self.selectedMonth > self.dateMax.getMonth() && self.selectedYear === self.dateMax.getFullYear()) {
					self.selectedMonth = self.dateMax.getMonth();
				}
				if (self.actions.clickYear) self.actions.clickYear(e, self.selectedYear);
				mainMethod(self);
			}
		};

		const clickMonth = () => {
			if (!self.settings.selection.month || self.currentType === 'multiple') return;
			if (self.currentType !== 'month' && monthHeaderEl) {
				createMonths(self);
			} else if (self.currentType === 'month' && monthHeaderEl) {
				self.currentType = self.type;
				mainMethod(self);
			} else if (monthItemEl) {
				self.selectedMonth = Number(monthItemEl.dataset.calendarMonth);
				self.currentType = self.type;
				if (self.actions.clickMonth) self.actions.clickMonth(e, self.selectedMonth);
				mainMethod(self);
			}
		};

		clickArrowMonth();
		clickDay();
		clickWeekNumber();
		clickYear();
		clickMonth();
	});
};

export default clickCalendar;
