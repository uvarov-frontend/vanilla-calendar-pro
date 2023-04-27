import { IVanillaCalendar } from '../../types';

const controlArrows = (self: IVanillaCalendar) => {
	if (!['default', 'multiple', 'year'].includes(self.currentType)) return;

	const arrowPrev: HTMLElement | null = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.arrowPrev}`);
	const arrowNext: HTMLElement | null = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.arrowNext}`);

	if (!arrowPrev || !arrowNext) return;

	const defaultControl = () => {
		if (!self.dateMin || !self.dateMax) return;

		const isSelectedMinMount = self.selectedMonth === self.dateMin.getMonth();
		const isSelectedMaxMount = self.selectedMonth === self.dateMax.getMonth();
		const isSelectedMinYear = !self.settings.selection.year ? true : self.selectedYear === self.dateMin.getFullYear();
		const isSelectedMaxYear = !self.settings.selection.year ? true : self.selectedYear === self.dateMax.getFullYear();

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
		if (!self.dateMin || !self.dateMax || self.viewYear === undefined) return;

		if (self.dateMin.getFullYear() && (self.viewYear - 7) <= self.dateMin.getFullYear()) {
			arrowPrev.style.visibility = 'hidden';
		} else {
			arrowPrev.style.visibility = '';
		}

		if (self.dateMax.getFullYear() && (self.viewYear + 7) >= self.dateMax.getFullYear()) {
			arrowNext.style.visibility = 'hidden';
		} else {
			arrowNext.style.visibility = '';
		}
	};

	if (self.currentType === 'default' || self.currentType === 'multiple') defaultControl();
	if (self.currentType === 'year') yearControl();
};

export default controlArrows;
