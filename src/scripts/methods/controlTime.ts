import { IVanillaCalendar } from 'src/types';
import transformTime12 from './transformTime12';
import transformTime24 from './transformTime24';

const controlTime = (self: IVanillaCalendar, keepingTime: number | false) => {
	const rangeHours = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.timeRange} input[name="hours"]`);
	const rangeMinutes = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.timeRange} input[name="minutes"]`);
	const inputHours = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.timeHours} input[name="hours"]`);
	const inputMinutes = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.timeMinutes} input[name="minutes"]`);
	const btnKeepingTime = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.timeKeeping}`);

	const mouseoverRange = (range: HTMLInputElement, input: HTMLInputElement) => {
		range.addEventListener('mouseover', () => input.classList.add(self.CSSClasses.isFocus));
	};

	const mouseoutRange = (range: HTMLInputElement, input: HTMLInputElement) => {
		range.addEventListener('mouseout', () => input.classList.remove(self.CSSClasses.isFocus));
	};

	const setTime = (e: Event, value: string, type: string) => {
		if (type === 'hours') {
			self.selectedHours = `${value}`;
		} else if (type === 'minutes') {
			self.selectedMinutes = `${value}`;
		}
		self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;
		self.settings.selected.time = self.selectedTime;

		if (self.actions.changeTime) {
			self.actions.changeTime(e, self.selectedTime, (self.selectedHours as string), (self.selectedMinutes as string), (self.selectedKeeping as string));
		}
	};

	const changeRange = (range: HTMLInputElement, input: HTMLInputElement, type: string, max: number) => {
		range.addEventListener('input', (e) => {
			let value: number | string = Number((e.target as HTMLInputElement).value);
			value = value < 10 ? `0${value}` : `${value}`;

			if (type === 'hours' && max === 12) {
				if (Number((e.target as HTMLInputElement).value) < max && Number((e.target as HTMLInputElement).value) > 0) {
					input.value = value;
					self.selectedKeeping = 'AM';
					(btnKeepingTime as HTMLElement).innerText = self.selectedKeeping;
					setTime(e, value, type);
				} else {
					if (Number((e.target as HTMLInputElement).value) === 0) {
						self.selectedKeeping = 'AM';
						(btnKeepingTime as HTMLElement).innerText = 'AM';
					} else {
						self.selectedKeeping = 'PM';
						(btnKeepingTime as HTMLElement).innerText = 'PM';
					}
					input.value = transformTime12((e.target as HTMLInputElement).value);
					setTime(e, transformTime12((e.target as HTMLInputElement).value), type);
				}
			} else {
				input.value = value;
				setTime(e, value, type);
			}
		});
	};

	const changeInput = (range: HTMLInputElement, input: HTMLInputElement, type: string, max: number) => {
		input.addEventListener('change', (e) => {
			const changeInputEl: HTMLInputElement = (e.target as HTMLInputElement);

			let value: number | string = Number(changeInputEl.value);
			value = value < 10 ? `0${value}` : `${value}`;

			if (type === 'hours' && max === 12) {
				if (changeInputEl.value && Number(changeInputEl.value) <= max && Number(changeInputEl.value) > 0) {
					changeInputEl.value = value;
					range.value = transformTime24(value, self.selectedKeeping);
					setTime(e, value, type);
				} else if (changeInputEl.value && Number(changeInputEl.value) < 24 && (Number(changeInputEl.value) > max || Number(changeInputEl.value) === 0)) {
					if (Number(changeInputEl.value) === 0) {
						self.selectedKeeping = 'AM';
						(btnKeepingTime as HTMLElement).innerText = 'AM';
					} else {
						self.selectedKeeping = 'PM';
						(btnKeepingTime as HTMLElement).innerText = 'PM';
					}
					changeInputEl.value = transformTime12(changeInputEl.value);
					range.value = value;
					setTime(e, transformTime12(changeInputEl.value), type);
				} else {
					changeInputEl.value = (self.selectedHours as string);
				}
			} else if (changeInputEl.value && Number(changeInputEl.value) <= max && Number(changeInputEl.value) >= 0) {
				changeInputEl.value = value;
				range.value = value;
				setTime(e, value, type);
			} else if (type === 'hours') {
				changeInputEl.value = (self.selectedHours as string);
			} else if (type === 'minutes') {
				changeInputEl.value = (self.selectedMinutes as string);
			}
		});
	};

	mouseoverRange((rangeHours as HTMLInputElement), (inputHours as HTMLInputElement));
	mouseoverRange((rangeMinutes as HTMLInputElement), (inputMinutes as HTMLInputElement));
	mouseoutRange((rangeHours as HTMLInputElement), (inputHours as HTMLInputElement));
	mouseoutRange((rangeMinutes as HTMLInputElement), (inputMinutes as HTMLInputElement));
	changeRange((rangeHours as HTMLInputElement), (inputHours as HTMLInputElement), 'hours', keepingTime === 24 ? 23 : 12);
	changeRange((rangeMinutes as HTMLInputElement), (inputMinutes as HTMLInputElement), 'minutes', 0);
	changeInput((rangeHours as HTMLInputElement), (inputHours as HTMLInputElement), 'hours', keepingTime === 24 ? 23 : 12);
	changeInput((rangeMinutes as HTMLInputElement), (inputMinutes as HTMLInputElement), 'minutes', 59);

	if (!btnKeepingTime) return;
	btnKeepingTime.addEventListener('click', (e) => {
		if ((btnKeepingTime as HTMLElement).innerText.includes('AM')) {
			self.selectedKeeping = 'PM';
		} else {
			self.selectedKeeping = 'AM';
		}
		(rangeHours as HTMLInputElement).value = transformTime24(self.selectedHours, self.selectedKeeping);
		setTime(e, (self.selectedHours as string), 'hours');
		(btnKeepingTime as HTMLElement).innerText = self.selectedKeeping;
	});
};

export default controlTime;
