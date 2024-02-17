import VanillaCalendar from '@src/vanilla-calendar';
import parseDates from '@scripts/helpers/parseDates';
import getDateString from '@scripts/helpers/getDateString';
import transformTime12 from '@scripts/helpers/transformTime12';
import getDate from '@scripts/helpers/getDate';
import messages from './getMessages';

const initSelectedMonthYear = (self: VanillaCalendar) => {
	const isValidMonth = self.settings.selected.month !== undefined && Number(self.settings.selected.month) >= 0 && Number(self.settings.selected.month) < 12;
	const isValidYear = self.settings.selected.year !== undefined && Number(self.settings.selected.year) >= 0 && Number(self.settings.selected.year) <= 9999;

	self.selectedMonth = isValidMonth ? Number(self.settings.selected.month) : self.date.today.getMonth();
	self.selectedYear = isValidYear ? Number(self.settings.selected.year) : self.date.today.getFullYear();
	self.viewYear = self.selectedYear;
};

const initRange = (self: VanillaCalendar) => {
	// set self.rangeMin and self.rangeMax
	self.settings.range.min = getDate(self.date.min) >= getDate(self.settings.range.min) ? self.date.min : self.settings.range.min;
	self.settings.range.max = getDate(self.date.max) <= getDate(self.settings.range.max) ? self.date.max : self.settings.range.max;

	const isDisablePast = self.settings.range.disablePast && !self.settings.range.disableAllDays && getDate(self.settings.range.min) < self.date.today;
	self.rangeMin = isDisablePast
		? getDateString(self.date.today)
		: self.settings.range.disableAllDays
			? getDateString(self.date.today)
			: self.settings.range.min;
	self.rangeMax = self.settings.range.disableAllDays
		? getDateString(self.date.today)
		: self.settings.range.max;

	// set self.rangeDisabled
	self.rangeDisabled = self.settings.range.disabled && !self.settings.range.disableAllDays
		? parseDates(self.settings.range.disabled)
		: self.settings.range.disableAllDays
			? [self.rangeMin]
			: [];
	if (self.rangeDisabled.length > 1) self.rangeDisabled.sort((a, b) => +new Date(a) - +new Date(b));

	// set self.rangeEnabled
	self.rangeEnabled = self.settings.range.enabled ? parseDates(self.settings.range.enabled) : [];
	if (self.rangeEnabled?.[0] && self.rangeDisabled?.[0]) self.rangeDisabled = self.rangeDisabled.filter((d) => !self.rangeEnabled.includes(d));
	if (self.rangeEnabled.length > 1) self.rangeEnabled.sort((a, b) => +new Date(a) - +new Date(b));

	if (self.rangeEnabled?.[0] && self.settings.range.disableAllDays) {
		self.rangeMin = self.rangeEnabled[0];
		self.rangeMax = self.rangeEnabled[self.rangeEnabled.length - 1];
	}
};

const initSelectedDates = (self: VanillaCalendar) => {
	self.selectedDates = self.settings.selected.dates?.[0] ? parseDates(self.settings.selected.dates) : [];
	self.selectedHolidays = self.settings.selected.holidays?.[0] ? parseDates(self.settings.selected.holidays) : [];
};

const initDateMinMax = (self: VanillaCalendar) => {
	self.dateMin = self.settings.visibility.disabled ? getDate(self.date.min) : getDate(self.rangeMin);
	self.dateMax = self.settings.visibility.disabled ? getDate(self.date.max) : getDate(self.rangeMax);
};

const initTime = (self: VanillaCalendar) => {
	const time12 = self.settings.selection.time === true || self.settings.selection.time === 12;
	if (time12 || self.settings.selection.time === 24) {
		let userTime = false;

		if (typeof self.settings.selected.time === 'string') {
			const regExr = time12 ? /^([0-9]|0[1-9]|1[0-2]):([0-5][0-9])|(AM|PM)/g
				: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])/g;

			self.settings.selected.time.replace(regExr, (_, p1: string, p2: string, p3: string) => {
				if (p1 && p2) {
					userTime = true;
					self.selectedHours = p1;
					self.selectedMinutes = p2;
				}
				if (p3 && time12) {
					self.selectedKeeping = p3;
				} else if (time12) {
					self.selectedKeeping = 'AM';
				}
				return '';
			});
		}

		if (!userTime && (time12)) {
			self.selectedHours = transformTime12(String(self.date.today.getHours()));
			self.selectedMinutes = String(self.date.today.getMinutes());
			self.selectedKeeping = Number(self.date.today.getHours()) >= 12 ? 'PM' : 'AM';
		} else if (!userTime) {
			self.selectedHours = String(self.date.today.getHours());
			self.selectedMinutes = String(self.date.today.getMinutes());
		}

		self.selectedHours = Number(self.selectedHours) < 10 ? `0${Number(self.selectedHours)}` : `${self.selectedHours}`;
		self.selectedMinutes = Number(self.selectedMinutes) < 10 ? `0${Number(self.selectedMinutes)}` : `${self.selectedMinutes}`;
		self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;
	} else if (self.settings.selection.time) {
		throw new Error(messages.incorrectTime);
	}
};

const initCorrectMonths = (self: VanillaCalendar) => {
	self.correctMonths = self.type === 'multiple'
		? self.months === 1
			? 2
			: self.months > 12
				? 12
				: self.months
		: 1;
};

const setVariables = (self: VanillaCalendar) => {
	self.currentType = self.type;
	initSelectedMonthYear(self);
	initRange(self);
	initSelectedDates(self);
	initDateMinMax(self);
	initTime(self);
	initCorrectMonths(self);
};

export default setVariables;
