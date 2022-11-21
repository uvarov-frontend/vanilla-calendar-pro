import { FormatDateString, IVanillaCalendar } from 'src/types';
import changeMonth from './changeMonth';
import createDays from './createDays';
import createMonths from './createMonths';
import createYears from './createYears';
import generateDate from './generateDate';
import update from './updateCalendar';

const clickCalendar = (self: IVanillaCalendar) => {
	(self.HTMLElement as HTMLElement).addEventListener('click', (e) => {
		const element = e.target as HTMLElement;

		const arrowEl: HTMLElement| null = element.closest(`.${self.CSSClasses.arrow}`);
		const arrowPrevEl: HTMLElement| null = element.closest(`.${self.CSSClasses.arrowPrev}`);
		const arrowNextEl: HTMLElement| null = element.closest(`.${self.CSSClasses.arrowNext}`);
		const dayBtnEl: HTMLElement| null = element.closest(`.${self.CSSClasses.dayBtn}`);
		const dayBtnPrevEl: HTMLElement| null = element.closest(`.${self.CSSClasses.dayBtnPrev}`);
		const dayBtnNextEl: HTMLElement| null = element.closest(`.${self.CSSClasses.dayBtnNext}`);
		const yearHeaderEl: HTMLElement| null = element.closest(`.${self.CSSClasses.year}`);
		const yearItemEl: HTMLElement| null = element.closest(`.${self.CSSClasses.yearsYear}`);
		const monthHeaderEl: HTMLElement| null = element.closest(`.${self.CSSClasses.month}`);
		const monthItemEl: HTMLElement| null = element.closest(`.${self.CSSClasses.monthsMonth}`);

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
			if (self.selectedDates.length > 1) self.selectedDates = [];
			self.selectedDates.push(dayBtnEl.dataset.calendarDay as FormatDateString);

			if (!self.selectedDates[1]) return;

			const startDate = new Date(Date.UTC(
				new Date(self.selectedDates[0]).getUTCFullYear(),
				new Date(self.selectedDates[0]).getUTCMonth(),
				new Date(self.selectedDates[0]).getUTCDate(),
			));

			const endDate = new Date(Date.UTC(
				new Date(self.selectedDates[1]).getUTCFullYear(),
				new Date(self.selectedDates[1]).getUTCMonth(),
				new Date(self.selectedDates[1]).getUTCDate(),
			));

			const addSelectedDate = (day: Date) => {
				if (!self.selectedDates) return;
				const date = generateDate(day);
				if (self.settings.range.disabled && self.settings.range.disabled.includes(date)) return;
				self.selectedDates.push(date);
			};

			self.selectedDates = [];

			if (endDate > startDate) {
				for (let i = startDate; i <= endDate; i.setUTCDate(i.getUTCDate() + 1)) {
					addSelectedDate(i);
				}
			} else {
				for (let i = startDate; i >= endDate; i.setUTCDate(i.getUTCDate() - 1)) {
					addSelectedDate(i);
				}
			}
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
				self.settings.selected.dates = self.selectedDates;

				if (dayBtnPrevEl) {
					changeMonth(self, 'prev');
				} else if (dayBtnNextEl) {
					changeMonth(self, 'next');
				} else {
					createDays(self);
				}
			}
		};

		const clickYear = () => {
			if (!self.settings.selection.year) return;
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
				update(self);
			} else if (yearItemEl) {
				if (self.selectedMonth === undefined || !self.dateMin || !self.dateMax) return;
				self.selectedYear = Number(yearItemEl.dataset.calendarYear);
				self.currentType = self.type;
				if (self.selectedMonth < self.dateMin.getUTCMonth() && self.selectedYear === self.dateMin.getUTCFullYear()) {
					self.settings.selected.month = self.dateMin.getUTCMonth();
				}
				if (self.selectedMonth > self.dateMax.getUTCMonth() && self.selectedYear === self.dateMax.getUTCFullYear()) {
					self.settings.selected.month = self.dateMax.getUTCMonth();
				}
				if (self.actions.clickYear) self.actions.clickYear(e, self.selectedYear);
				self.settings.selected.year = self.selectedYear;
				update(self);
			}
		};

		const clickMonth = () => {
			if (!self.settings.selection.month) return;
			if (self.currentType !== 'month' && monthHeaderEl) {
				createMonths(self);
			} else if (self.currentType === 'month' && monthHeaderEl) {
				self.currentType = self.type;
				update(self);
			} else if (monthItemEl) {
				self.selectedMonth = Number(monthItemEl.dataset.calendarMonth);
				self.currentType = self.type;
				if (self.actions.clickMonth) self.actions.clickMonth(e, self.selectedMonth);
				self.settings.selected.month = self.selectedMonth;
				update(self);
			}
		};

		clickArrowMonth();
		clickDay();
		clickYear();
		clickMonth();
	});
};

export default clickCalendar;
