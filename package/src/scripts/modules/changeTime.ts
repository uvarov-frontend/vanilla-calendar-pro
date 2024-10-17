import VanillaCalendar from '@src/vanilla-calendar';
import transformTime12 from '@scripts/helpers/transformTime12';
import transformTime24 from '@scripts/helpers/transformTime24';

type TypeTime = 'hours' | 'minutes';

const getInputElement = (
	timeEl: HTMLElement,
	className: string,
	name?: string,
) => timeEl.querySelector(`.${className}${name ? ` input[name="${name}"]` : ''}`) as HTMLInputElement;

const addMouseEvents = (range: HTMLInputElement, input: HTMLInputElement, CSSClass: string) => {
	range.addEventListener('mouseover', () => input.classList.add(CSSClass));
	range.addEventListener('mouseout', () => input.classList.remove(CSSClass));
};

const setTime = (self: VanillaCalendar, e: Event, value: string, type: TypeTime) => {
	const typeMap = {
		hours: () => { self.selectedHours = value; },
		minutes: () => { self.selectedMinutes = value; },
	};
	typeMap[type]();

	self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;

	if (self.actions.changeTime) self.actions.changeTime(e, self);

	if (self.input && self.HTMLInputElement && self.actions.changeToInput) self.actions.changeToInput(e, self);
};

const changeRange = (self: VanillaCalendar, range: HTMLInputElement, input: HTMLInputElement, btnKeepingTime: HTMLButtonElement | null, type: TypeTime, max: number) => {
	range.addEventListener('input', (e) => {
		const inputEl = e.target as HTMLInputElement;
		const value = Number(inputEl.value);
		const valueStr = value < 10 ? `0${value}` : `${value}`;

		if (type !== 'hours' || max !== 12) {
			input.value = valueStr;
			setTime(self, e, valueStr, type);
			return;
		}

		if (value < max && value > 0) {
			input.value = valueStr;
			self.selectedKeeping = 'AM';
			(btnKeepingTime as HTMLButtonElement).innerText = self.selectedKeeping;
			setTime(self, e, valueStr, type);
		} else {
			if (value === 0) {
				self.selectedKeeping = 'AM';
				(btnKeepingTime as HTMLButtonElement).innerText = 'AM';
			} else {
				self.selectedKeeping = 'PM';
				(btnKeepingTime as HTMLButtonElement).innerText = 'PM';
			}
			input.value = transformTime12(inputEl.value);
			setTime(self, e, transformTime12(inputEl.value), type);
		}
	});
};

const changeInput = (self: VanillaCalendar, range: HTMLInputElement, input: HTMLInputElement, btnKeepingTime: HTMLButtonElement | null, type: TypeTime, max: number) => {
	input.addEventListener('change', (e) => {
		const inputEl = e.target as HTMLInputElement;
		const value = Number(inputEl.value);
		const valueStr = value < 10 ? `0${value}` : `${value}`;

		if (type === 'hours' && max === 12) {
			if (inputEl.value && value <= max && value > 0) {
				inputEl.value = valueStr;
				range.value = transformTime24(valueStr, self.selectedKeeping);
				setTime(self, e, valueStr, type);
			} else if (inputEl.value && value < 24 && (value > max || value === 0)) {
				if (value === 0) {
					self.selectedKeeping = 'AM';
					(btnKeepingTime as HTMLButtonElement).innerText = 'AM';
				} else {
					self.selectedKeeping = 'PM';
					(btnKeepingTime as HTMLButtonElement).innerText = 'PM';
				}
				inputEl.value = transformTime12(inputEl.value);
				range.value = valueStr;
				setTime(self, e, transformTime12(inputEl.value), type);
			} else {
				inputEl.value = self.selectedHours;
			}
		} else if (inputEl.value && value <= max && value >= 0) {
			inputEl.value = valueStr;
			range.value = valueStr;
			setTime(self, e, valueStr, type);
		} else if (type === 'hours') {
			inputEl.value = self.selectedHours;
		} else if (type === 'minutes') {
			inputEl.value = self.selectedMinutes;
		}
	});
};

const clickBtnKeepingTime = (self: VanillaCalendar, btnKeepingTime: HTMLButtonElement, rangeHours: HTMLInputElement) => {
	btnKeepingTime.addEventListener('click', (e) => {
		self.selectedKeeping = btnKeepingTime.innerText.includes('AM') ? 'PM' : 'AM';
		btnKeepingTime.innerText = self.selectedKeeping;
		rangeHours.value = transformTime24(self.selectedHours, self.selectedKeeping);
		setTime(self, e, self.selectedHours, 'hours');
	});
};

const changeTime = (self: VanillaCalendar, timeEl: HTMLElement, keepingTime: false | 12 | 24) => {
	const maxTime = keepingTime === 24 ? 23 : keepingTime || 12;
	const rangeHours = getInputElement(timeEl, self.CSSClasses.timeRange, 'hours');
	const rangeMinutes = getInputElement(timeEl, self.CSSClasses.timeRange, 'minutes');
	const inputHours = getInputElement(timeEl, self.CSSClasses.timeHours, 'hours');
	const inputMinutes = getInputElement(timeEl, self.CSSClasses.timeMinutes, 'minutes');
	const btnKeepingTime: HTMLButtonElement | null = timeEl.querySelector(`.${self.CSSClasses.timeKeeping}`);

	addMouseEvents(rangeHours, inputHours, self.CSSClasses.isFocus);
	addMouseEvents(rangeMinutes, inputMinutes, self.CSSClasses.isFocus);

	changeRange(self, rangeHours, inputHours, btnKeepingTime, 'hours', maxTime);
	changeRange(self, rangeMinutes, inputMinutes, btnKeepingTime, 'minutes', 0);

	changeInput(self, rangeHours, inputHours, btnKeepingTime, 'hours', maxTime);
	changeInput(self, rangeMinutes, inputMinutes, btnKeepingTime, 'minutes', 59);

	if (btnKeepingTime) clickBtnKeepingTime(self, btnKeepingTime, rangeHours);
};

export default changeTime;
