import { IVanillaCalendar } from '@src/types';
import generateDate from '@helpers/generateDate';

const setVisibilityArrows = ({
	arrowPrev, arrowNext, isPrevHidden, isNextHidden,
}: {
	arrowPrev: HTMLElement
	arrowNext: HTMLElement
	isPrevHidden: boolean | 0
	isNextHidden: boolean | 0
}) => {
	arrowPrev.style.visibility = isPrevHidden ? 'hidden' : '';
	arrowNext.style.visibility = isNextHidden ? 'hidden' : '';
};

const updateVisibilityArrows = (self: IVanillaCalendar) => {
	if (self.currentType === 'month') return;

	const arrowPrev: HTMLElement | null | undefined = self.HTMLElement?.querySelector(`.${self.CSSClasses.arrowPrev}`);
	const arrowNext: HTMLElement | null | undefined = self.HTMLElement?.querySelector(`.${self.CSSClasses.arrowNext}`);

	if (!arrowPrev || !arrowNext) return;

	const updateType = {
		default: () => {
			if (!self.dateMin || !self.dateMax) return;
			const currentSelectedDate = new Date(`${generateDate(new Date(self.selectedYear as number, self.selectedMonth as number, 1))}T00:00:00`);
			const jumpDateMin = new Date(currentSelectedDate.getTime());
			const jumpDateMax = new Date(currentSelectedDate.getTime());
			jumpDateMin.setMonth(jumpDateMin.getMonth() - self.jumpMonths);
			jumpDateMax.setMonth(jumpDateMax.getMonth() + self.jumpMonths);

			if (!self.settings.selection.year) {
				self.dateMin.setFullYear(currentSelectedDate.getFullYear());
				self.dateMax.setFullYear(currentSelectedDate.getFullYear());
			}

			const isPrevHidden = !self.settings.selection.month
				|| jumpDateMin.getFullYear() < self.dateMin.getFullYear()
				|| (jumpDateMin.getFullYear() === self.dateMin.getFullYear()
				&& (jumpDateMin.getMonth() < self.dateMin.getMonth()));
			const isNextHidden = !self.settings.selection.month
				|| jumpDateMax.getFullYear() > self.dateMax.getFullYear()
				|| (jumpDateMax.getFullYear() === self.dateMax.getFullYear()
				&& jumpDateMax.getMonth() > self.dateMax.getMonth());

			setVisibilityArrows({
				arrowPrev, arrowNext, isPrevHidden, isNextHidden,
			});
		},
		year: () => {
			if (!self.dateMin || !self.dateMax || self.viewYear === undefined) return;
			setVisibilityArrows({
				arrowPrev,
				arrowNext,
				isPrevHidden: self.dateMin.getFullYear() && (self.viewYear - 7) <= self.dateMin.getFullYear(),
				isNextHidden: self.dateMax.getFullYear() && (self.viewYear + 7) >= self.dateMax.getFullYear(),
			});
		},
	};

	updateType[self.currentType === 'multiple' ? 'default' : self.currentType]();
};

export default updateVisibilityArrows;
