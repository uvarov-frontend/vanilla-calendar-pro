import { IVanillaCalendar } from 'src/types';
import controlTime from './controlTime';
import transformTime24 from './transformTime24';

const createTime = (self: IVanillaCalendar) => {
	const timeEl = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-time');
	if (!timeEl) return;
	const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
	const range = self.settings.selection.controlTime === 'range';

	timeEl.innerHTML = `
	<div class="vanilla-calendar-time__content">
		<label class="vanilla-calendar-time__hours">
			<input type="text"
				name="hours"
				maxlength="2"
				value="${self.selectedHours}"
				${range ? 'disabled' : ''}>
		</label>
		<label class="vanilla-calendar-time__minutes">
			<input type="text"
				name="minutes"
				maxlength="2"
				value="${self.selectedMinutes}"
				${range ? 'disabled' : ''}>
		</label>
		${keepingTime === 12 ? `
		<button type="button"
			class="vanilla-calendar-time__keeping"
			${range ? 'disabled' : ''}>${self.selectedKeeping}</button>
		` : ''}
	</div>
	<div class="vanilla-calendar-time__ranges">
		<label class="vanilla-calendar-time__range">
			<input type="range"
				name="hours"
				min="0"
				max="23"
				step="${self.settings.selection.stepHours}"
				value="${self.selectedKeeping ? transformTime24(self.selectedHours, self.selectedKeeping) : self.selectedHours}">
		</label>
		<label class="vanilla-calendar-time__range">
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
