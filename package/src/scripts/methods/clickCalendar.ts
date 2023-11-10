import { IVanillaCalendar } from '../../types';
import changeMonth from './changeMonth';
import createMonths from './createMonths';
import createYears from './createYears';
import mainMethod from './mainMethod';

import getColumnID from '../helpers/getColumnID';
import handleClickDay from './handleClick/handleClickDay';

const clickCalendar = (self: IVanillaCalendar) => {
	(self.HTMLElement as HTMLElement).addEventListener('click', (e) => {
		const element = e.target as HTMLElement;
		const closest = (className: string): HTMLElement | null => element.closest(`.${className}`);

		const arrowEl = closest(self.CSSClasses.arrow);
		const arrowPrevEl = closest(self.CSSClasses.arrowPrev);
		const arrowNextEl = closest(self.CSSClasses.arrowNext);
		const weekNumberEl = closest(self.CSSClasses.weekNumber);
		const yearHeaderEl = closest(self.CSSClasses.year);
		const yearItemEl = closest(self.CSSClasses.yearsYear);
		const monthHeaderEl = closest(self.CSSClasses.month);
		const monthItemEl = closest(self.CSSClasses.monthsMonth);
		const gridEl = closest(self.CSSClasses.grid);
		const columnEl = closest(self.CSSClasses.column);

		const handleClickArrowMonth = () => {
			if (!arrowEl) return;
			if (self.currentType !== 'year' && self.currentType !== 'month') changeMonth(self, element.dataset.calendarArrow as 'prev' | 'next');
			if (self.actions.clickArrow) self.actions.clickArrow(e, Number(self.selectedYear), Number(self.selectedMonth));
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
			if (!self.settings.selection.year) return;
			if (arrowEl && self.currentType === 'year') {
				if (self.viewYear === undefined) return;
				if (arrowNextEl) {
					self.viewYear += 15;
				} else if (arrowPrevEl) {
					self.viewYear -= 15;
				}
				createYears(self, e.target as HTMLElement);
			} else if (self.currentType !== 'year' && yearHeaderEl) {
				createYears(self, e.target as HTMLElement);
			} else if (self.currentType === 'year' && yearHeaderEl) {
				self.currentType = self.type;
				mainMethod(self);
			} else if (yearItemEl) {
				if (self.selectedMonth === undefined || !self.dateMin || !self.dateMax) return;
				self.selectedYear = self.type === 'multiple'
					? getColumnID(self, self.CSSClasses.columnYear, self.CSSClasses.year, Number(yearItemEl.dataset.calendarYear), 'data-calendar-selected-year')
					: Number(yearItemEl.dataset.calendarYear);
				self.currentType = self.type;
				if ((self.selectedMonth < self.dateMin.getMonth() && self.selectedYear <= self.dateMin.getFullYear()) || self.selectedYear < self.dateMin.getFullYear()) {
					self.selectedMonth = self.dateMin.getMonth();
					self.selectedYear = self.dateMin.getFullYear();
				}
				if ((self.selectedMonth > self.dateMax.getMonth() && self.selectedYear >= self.dateMax.getFullYear()) || self.selectedYear > self.dateMax.getFullYear()) {
					self.selectedMonth = self.dateMax.getMonth();
					self.selectedYear = self.dateMax.getFullYear();
				}
				if (self.actions.clickYear) self.actions.clickYear(e, self.selectedYear);
				mainMethod(self);
			} else if (self.type === 'multiple' && self.currentType === 'year' && gridEl && !columnEl) {
				self.currentType = self.type;
				mainMethod(self);
			}
		};

		const clickMonth = () => {
			if (!self.settings.selection.month) return;
			if (self.currentType !== 'month' && monthHeaderEl) {
				createMonths(self, e.target as HTMLElement);
			} else if (self.currentType === 'month' && monthHeaderEl) {
				self.currentType = self.type;
				mainMethod(self);
			} else if (monthItemEl) {
				if (self.selectedMonth === undefined || !self.dateMin || !self.dateMax) return;
				self.selectedMonth = self.type === 'multiple'
					? getColumnID(self, self.CSSClasses.columnMonth, self.CSSClasses.month, Number(monthItemEl.dataset.calendarMonth), 'data-calendar-selected-month')
					: Number(monthItemEl.dataset.calendarMonth);
				if (self.type === 'multiple') {
					const column = monthItemEl.closest(`.${self.CSSClasses.columnMonth}`) as HTMLElement;
					const year = column.querySelector(`.${self.CSSClasses.year}`) as HTMLElement;
					self.selectedYear = Number(year.dataset.calendarSelectedYear);
					if (self.selectedMonth < self.dateMin.getMonth() && self.selectedYear <= self.dateMin.getFullYear()) {
						self.selectedMonth = self.dateMin.getMonth();
					}
					if (self.selectedMonth > self.dateMax.getMonth() && self.selectedYear >= self.dateMax.getFullYear()) {
						self.selectedMonth = self.dateMax.getMonth();
					}
				}
				self.currentType = self.type;
				if (self.actions.clickMonth) self.actions.clickMonth(e, self.selectedMonth);
				mainMethod(self);
			} else if (self.type === 'multiple' && self.currentType === 'month' && gridEl && !columnEl) {
				self.currentType = self.type;
				mainMethod(self);
			}
		};

		handleClickArrowMonth();
		handleClickDay(self, e);
		clickWeekNumber();
		clickYear();
		clickMonth();
	});
};

export default clickCalendar;
