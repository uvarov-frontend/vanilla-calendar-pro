import VanillaCalendar from '@scripts/vanilla-calendar';
import { InputTime, RangeTime } from '@scripts/helpers/createComponents';
import transformTime24 from '@scripts/helpers/transformTime24';
import controlTime from '@scripts/methods/controlTime';

const createTime = (self: VanillaCalendar) => {
	const timeEl = self.HTMLElement.querySelector(`.${self.CSSClasses.time}`);
	if (!timeEl) return;

	const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
	const range = self.settings.selection.controlTime === 'range';
	const [minHour, maxHour] = [0, 23];
	const [minMinutes, maxMinutes] = [0, 59];

	timeEl.innerHTML = (`
		<div class="${self.CSSClasses.timeContent}">
			${InputTime('hours', self.CSSClasses.timeHours, self.selectedHours, range)}
			${InputTime('minutes', self.CSSClasses.timeMinutes, self.selectedMinutes, range)}
			${keepingTime === 12 ? `
			<button type="button" class="${self.CSSClasses.timeKeeping}"
				${range ? 'disabled' : ''}>${self.selectedKeeping}</button>` : ''}
		</div>
		<div class="${self.CSSClasses.timeRanges}">
			${RangeTime('hours', self.CSSClasses.timeRange, minHour, maxHour, self.settings.selection.stepHours, self.selectedKeeping
			? transformTime24(self.selectedHours, self.selectedKeeping) : self.selectedHours)}
			${RangeTime('minutes', self.CSSClasses.timeRange, minMinutes, maxMinutes, self.settings.selection.stepMinutes, self.selectedMinutes)}
		</div>
	`);

	controlTime(self, keepingTime);
};

export default createTime;
