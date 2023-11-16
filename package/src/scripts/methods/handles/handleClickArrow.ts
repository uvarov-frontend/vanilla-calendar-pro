import { IVanillaCalendar } from '@src/types';
import changeMonth from '@methods/changeMonth';
import createYears from '@methods/createYears';

const handleClickArrow = (self: IVanillaCalendar, event: MouseEvent) => {
	const element = event.target as HTMLElement;
	const arrowEl: HTMLElement | null = element.closest(`.${self.CSSClasses.arrow}`);

	if (!arrowEl) return;

	if (['default', 'multiple'].includes(self.currentType)) {
		changeMonth(self, arrowEl.dataset.calendarArrow as 'prev' | 'next');
	} else if (self.currentType === 'year' && self.viewYear !== undefined) {
		self.viewYear += ({ prev: -15, next: 15 })[arrowEl.dataset.calendarArrow as 'prev' | 'next'];
		createYears(self, event.target as HTMLElement);
	}

	if (self.actions.clickArrow) self.actions.clickArrow(event, self.selectedYear as number, self.selectedMonth as number);
};

export default handleClickArrow;