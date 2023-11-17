import { IVanillaCalendar } from '@src/types';
import generateDate from '@helpers/generateDate';

const updateArrowVisibility = (self: IVanillaCalendar) => {
	if (self.currentType === 'month') return;

	const arrowPrev: HTMLElement | null | undefined = self.HTMLElement?.querySelector(`.${self.CSSClasses.arrowPrev}`);
	const arrowNext: HTMLElement | null | undefined = self.HTMLElement?.querySelector(`.${self.CSSClasses.arrowNext}`);

	if (!arrowPrev || !arrowNext) return;

	const updateVisibility = {
		default: () => {
			if (!self.dateMin || !self.dateMax) return;
			const jumpDateMin = new Date(`${generateDate(new Date(self.selectedYear as number, self.selectedMonth as number, 1))}T00:00:00`);
			const jumpDateMax = new Date(jumpDateMin.getTime());
			jumpDateMin.setMonth(jumpDateMin.getMonth() - self.jumpMonths);
			jumpDateMax.setMonth(jumpDateMax.getMonth() + self.jumpMonths);

			const isPrevHidden = !self.settings.selection.month
				|| jumpDateMin.getFullYear() < self.dateMin.getFullYear()
				|| (jumpDateMin.getFullYear() === self.dateMin.getFullYear()
				&& (jumpDateMin.getMonth() < self.dateMin.getMonth()));
			const isNextHidden = !self.settings.selection.month
				|| jumpDateMax.getFullYear() > self.dateMax.getFullYear()
				|| (jumpDateMax.getFullYear() === self.dateMax.getFullYear()
				&& jumpDateMax.getMonth() > self.dateMax.getMonth());

			arrowPrev.style.visibility = isPrevHidden ? 'hidden' : '';
			arrowNext.style.visibility = isNextHidden ? 'hidden' : '';
		},
		year: () => {
			if (!self.dateMin || !self.dateMax || self.viewYear === undefined) return;
			arrowPrev.style.visibility = self.dateMin.getFullYear() && (self.viewYear - 7) <= self.dateMin.getFullYear() ? 'hidden' : '';
			arrowNext.style.visibility = self.dateMax.getFullYear() && (self.viewYear + 7) >= self.dateMax.getFullYear() ? 'hidden' : '';
		},
	};

	updateVisibility[self.currentType === 'multiple' ? 'default' : self.currentType]();
};

export default updateArrowVisibility;
