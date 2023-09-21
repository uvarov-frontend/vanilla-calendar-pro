import { IVanillaCalendar } from '../../types';
import generateDate from '../helpers/generateDate';

const controlArrows = (self: IVanillaCalendar) => {
	if (!['default', 'multiple', 'year'].includes(self.currentType)) return;

	const arrowPrev: HTMLElement | null = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.arrowPrev}`);
	const arrowNext: HTMLElement | null = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.arrowNext}`);

	if (!arrowPrev || !arrowNext) return;

	const defaultControl = () => {
		if (!self.dateMin || !self.dateMax) return;

		const jumpDateMin = new Date(`${generateDate(new Date(self.selectedYear as number, self.selectedMonth as number, 1))}T00:00:00`);
		const jumpDateMax = new Date(jumpDateMin.getTime());
		jumpDateMin.setMonth(jumpDateMin.getMonth() - self.jumpMonths);
		jumpDateMax.setMonth(jumpDateMax.getMonth() + self.jumpMonths);

		if (!self.settings.selection.month
			|| jumpDateMin.getFullYear() < self.dateMin.getFullYear()
			|| (jumpDateMin.getFullYear() === self.dateMin.getFullYear()
			&& (jumpDateMin.getMonth() < self.dateMin.getMonth()))) {
			arrowPrev.style.visibility = 'hidden';
		} else {
			arrowPrev.style.visibility = '';
		}
		if (!self.settings.selection.month
			|| jumpDateMax.getFullYear() > self.dateMax.getFullYear()
			|| (jumpDateMax.getFullYear() === self.dateMax.getFullYear()
			&& jumpDateMax.getMonth() > self.dateMax.getMonth())) {
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
