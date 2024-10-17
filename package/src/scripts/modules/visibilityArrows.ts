import VanillaCalendar from '@src/vanilla-calendar';
import getDateString from '@scripts/helpers/getDateString';
import getDate from '@scripts/helpers/getDate';

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

const visibilityArrows = (self: VanillaCalendar) => {
	if (self.currentType === 'month') return;

	const arrowPrev: HTMLElement | null = self.HTMLElement?.querySelector(`.${self.CSSClasses.arrowPrev}`);
	const arrowNext: HTMLElement | null = self.HTMLElement?.querySelector(`.${self.CSSClasses.arrowNext}`);

	if (!arrowPrev || !arrowNext) return;

	const updateType = {
		default: () => {
			const currentSelectedDate = getDate(getDateString(new Date(self.selectedYear as number, self.selectedMonth as number, 1)));
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

export default visibilityArrows;
