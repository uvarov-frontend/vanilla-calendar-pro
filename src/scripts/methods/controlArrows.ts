import { IVanillaCalendar } from 'src/types';

const controlArrows = (self: IVanillaCalendar) => {
	if (!['default', 'year'].includes(self.currentType)) return;

	const arrowPrev = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-arrow_prev');
	const arrowNext = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-arrow_next');

	if (arrowPrev instanceof HTMLElement && arrowNext instanceof HTMLElement) {
		const defaultControl = () => {
			if (!self.dateMin || !self.dateMax || self.currentType !== 'default') return;

			const isSelectedMinMount = self.selectedMonth === self.dateMin.getUTCMonth();
			const isSelectedMaxMount = self.selectedMonth === self.dateMax.getUTCMonth();
			const isSelectedMinYear = !self.settings.selection.year ? true : self.selectedYear === self.dateMin.getUTCFullYear();
			const isSelectedMaxYear = !self.settings.selection.year ? true : self.selectedYear === self.dateMax.getUTCFullYear();

			if ((isSelectedMinMount && isSelectedMinYear) || !self.settings.selection.month) {
				arrowPrev.style.visibility = 'hidden';
			} else {
				arrowPrev.style.visibility = '';
			}
			if ((isSelectedMaxMount && isSelectedMaxYear) || !self.settings.selection.month) {
				arrowNext.style.visibility = 'hidden';
			} else {
				arrowNext.style.visibility = '';
			}
		};

		const yearControl = () => {
			if (!self.dateMin || !self.dateMax || self.currentType !== 'year' || self.viewYear === undefined) return;

			if (self.dateMin.getUTCFullYear() && (self.viewYear - 7) <= self.dateMin.getUTCFullYear()) {
				arrowPrev.style.visibility = 'hidden';
			} else {
				arrowPrev.style.visibility = '';
			}

			if (self.dateMax.getUTCFullYear() && (self.viewYear + 7) >= self.dateMax.getUTCFullYear()) {
				arrowNext.style.visibility = 'hidden';
			} else {
				arrowNext.style.visibility = '';
			}
		};

		defaultControl();
		yearControl();
	}
};

export default controlArrows;
