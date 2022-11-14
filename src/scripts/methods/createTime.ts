import { IVanillaCalendar } from 'src/types';
import controlTime from './controlTime';
import transformTime24 from './transformTime24';

const createTime = (self: IVanillaCalendar) => {
	const timeEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.time}`);
	if (!timeEl) return;
	const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
	const range = self.settings.selection.controlTime === 'range';

	timeEl.innerHTML = `
	<div class="${self.CSSClasses.timeContent}">
		<label class="${self.CSSClasses.timeHours}">
			<input type="text"
				name="hours"
				maxlength="2"
				value="${self.selectedHours}"
				${range ? 'disabled' : ''}>
		</label>
		<label class="${self.CSSClasses.timeMinutes}">
			<input type="text"
				name="minutes"
				maxlength="2"
				value="${self.selectedMinutes}"
				${range ? 'disabled' : ''}>
		</label>
		${keepingTime === 12 ? `
		<button type="button"
			class="${self.CSSClasses.timeKeeping}"
			${range ? 'disabled' : ''}>${self.selectedKeeping}</button>
		` : ''}
	</div>
	<div class="${self.CSSClasses.timeRanges}">
		<label class="${self.CSSClasses.timeRange}">
			<input type="range"
				name="hours"
				min="0"
				max="23"
				step="${self.settings.selection.stepHours}"
				value="${self.selectedKeeping ? transformTime24(self.selectedHours, self.selectedKeeping) : self.selectedHours}">
		</label>
		<label class="${self.CSSClasses.timeRange}">
			<input type="range"
				name="minutes"
				min="0"
				max="59"
				step="${self.settings.selection.stepMinutes}"
				value="${self.selectedMinutes}">
		</label>
	</div>`;

	controlTime(self, keepingTime);
};

export default createTime;
