import VanillaCalendar from '@src/vanilla-calendar';
import getColumnID from '@scripts/helpers/getColumnID';
import createMonths from '@scripts/methods/createMonths';
import createYears from '@scripts/methods/createYears';
import create from '@scripts/create';

type HandleType = 'month' | 'year';

type HandleCSSClasses = {
	header: string;
	item: string;
	column: string;
};

const handleItemClick = (self: VanillaCalendar, event: MouseEvent, type: HandleType, CSSClasses: HandleCSSClasses, itemEl: HTMLElement) => {
	const actionByType = {
		year: () => self.actions.clickYear?.(event, self),
		month: () => self.actions.clickMonth?.(event, self),
	};
	const selectByType = {
		year: () => {
			if (self.type === 'multiple') {
				const selectedYear = getColumnID(self, self.CSSClasses.columnYear, self.CSSClasses.year, Number(itemEl.dataset.calendarYear), 'data-calendar-selected-year');

				const isBeforeMinDate = self.selectedMonth < self.dateMin.getMonth() && selectedYear <= self.dateMin.getFullYear();
				const isAfterMaxDate = self.selectedMonth > self.dateMax.getMonth() && selectedYear >= self.dateMax.getFullYear();
				const isBeforeMinYear = selectedYear < self.dateMin.getFullYear();
				const isAfterMaxYear = selectedYear > self.dateMax.getFullYear();

				if (isBeforeMinDate || isBeforeMinYear) {
					self.selectedYear = self.dateMin.getFullYear();
					self.selectedMonth = self.dateMin.getMonth();
				} else if (isAfterMaxDate || isAfterMaxYear) {
					self.selectedYear = self.dateMax.getFullYear();
					self.selectedMonth = self.dateMax.getMonth();
				} else {
					self.selectedYear = selectedYear;
				}
			} else {
				self.selectedYear = Number(itemEl.dataset.calendarYear);
			}
		},
		month: () => {
			if (self.type === 'multiple') {
				const selectedMonth = getColumnID(self, self.CSSClasses.columnMonth, self.CSSClasses.month, Number(itemEl.dataset.calendarMonth), 'data-calendar-selected-month');
				const column = itemEl.closest(`.${CSSClasses.column}`) as HTMLElement;
				const year = column.querySelector(`.${self.CSSClasses.year}`) as HTMLElement;
				self.selectedYear = Number(year.dataset.calendarSelectedYear);
				const isBeforeMinDate = selectedMonth < self.dateMin.getMonth() && self.selectedYear <= self.dateMin.getFullYear();
				const isAfterMaxDate = selectedMonth > self.dateMax.getMonth() && self.selectedYear >= self.dateMax.getFullYear();

				if (isBeforeMinDate) {
					self.selectedMonth = self.dateMin.getMonth();
				} else if (isAfterMaxDate) {
					self.selectedMonth = self.dateMax.getMonth();
				} else {
					self.selectedMonth = selectedMonth;
				}
			} else {
				self.selectedMonth = Number(itemEl.dataset.calendarMonth);
			}
		},
	};
	selectByType[type]();
	actionByType[type]();
	self.currentType = self.type;
	create(self);
};

const handleClickMonthOrYear = (self: VanillaCalendar, event: MouseEvent, type: HandleType, CSSClasses: HandleCSSClasses) => {
	if (!self.settings.selection[type]) return;

	const element = event.target as HTMLElement;
	const closest = (className: string): HTMLElement | null => element.closest(`.${className}`);

	const headerEl = closest(CSSClasses.header);
	const itemEl = closest(CSSClasses.item);
	const gridEl = closest(self.CSSClasses.grid);
	const columnEl = closest(self.CSSClasses.column);

	if (self.currentType !== type && headerEl) {
		const createByType = {
			year: () => createYears(self, element),
			month: () => createMonths(self, element),
		};
		createByType[type]();
	} else if (itemEl) {
		handleItemClick(self, event, type, CSSClasses, itemEl);
	} else if ((self.currentType === type && headerEl) || (self.type === 'multiple' && self.currentType === type && gridEl && !columnEl)) {
		self.currentType = self.type;
		create(self);
	}
};

export default handleClickMonthOrYear;
