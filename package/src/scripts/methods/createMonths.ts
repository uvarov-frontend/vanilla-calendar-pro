import { IVanillaCalendar } from '@src/types';
import createDOM from '@methods/createDOM';
import showMonth from '@methods/showMonth';
import showYear from '@methods/showYear';

const columnID = (self: IVanillaCalendar) => {
	if (self.type !== 'multiple') return 0;
	const columnEls: NodeListOf<HTMLElement> = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.column}`);
	const indexColumn = [...columnEls].findIndex((column) => column.classList.contains(`${self.CSSClasses.columnMonth}`));
	return indexColumn > 0 ? indexColumn : 0;
};

const createMonthEl = (self: IVanillaCalendar, selectedMonth: number, monthTitle: string, monthDisabled: boolean, i: number) => {
	const monthEl = document.createElement('button');
	monthEl.type = 'button';
	monthEl.className = `${self.CSSClasses.monthsMonth}${selectedMonth === i ? ` ${self.CSSClasses.monthsMonthSelected}`
		: monthDisabled ? ` ${self.CSSClasses.monthsMonthDisabled}` : ''}`;
	monthEl.title = monthTitle;
	monthEl.innerText = `${self.settings.visibility.monthShort ? monthTitle.substring(0, 3) : monthTitle}`;
	monthEl.dataset.calendarMonth = String(i);
	if (monthDisabled) monthEl.tabIndex = -1;
	return monthEl;
};

const createMonths = (self: IVanillaCalendar, target?: HTMLElement) => {
	const selectedMonth = target?.dataset.calendarSelectedMonth ? Number(target.dataset.calendarSelectedMonth) : self.selectedMonth as number;
	const yearEl = target?.closest(`.${self.CSSClasses.column}`)?.querySelector(`.${self.CSSClasses.year}`) as HTMLElement;
	const selectedYear = yearEl ? Number(yearEl.dataset.calendarSelectedYear) : self.selectedYear as number;
	self.currentType = 'month';
	createDOM(self, target);
	showMonth(self);
	showYear(self);

	const monthsEl = self.HTMLElement?.querySelector(`.${self.CSSClasses.months}`);
	if (!self.settings.selection.month || !self.dateMin || !self.dateMax || !monthsEl) return;

	monthsEl.classList.add(self.CSSClasses.monthsSelecting);

	const activeMonthsID = self.jumpMonths > 1 ? self.locale.months
		.map((_, i) => selectedMonth - self.jumpMonths * i)
		.concat(self.locale.months.map((_, i) => selectedMonth + self.jumpMonths * i))
		.filter((monthID) => monthID >= 0 && monthID <= 12) : Array.from(Array(12).keys());

	for (let i = 0; i < 12; i++) {
		const monthTitle = self.locale.months[i];
		const monthDisabled = (i < self.dateMin.getMonth() + columnID(self) && selectedYear <= self.dateMin.getFullYear())
		|| (i > self.dateMax.getMonth() + columnID(self) && selectedYear >= self.dateMax.getFullYear())
		|| (i !== selectedMonth && !activeMonthsID.includes(i));
		monthsEl.append(createMonthEl(self, selectedMonth, monthTitle, monthDisabled, i));
	}
};

export default createMonths;
