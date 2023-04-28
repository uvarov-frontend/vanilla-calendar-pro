import { IVanillaCalendar } from '../../types';
import parserDates from '../helpers/parserDates';
import generateDate from '../helpers/generateDate';
import transformTime12 from '../helpers/transformTime12';

const setVariablesDates = (self: IVanillaCalendar) => {
	self.rangeMin = self.settings.range.min;
	self.rangeMax = self.settings.range.max;
	self.rangeDisabled = self.settings.range.disabled ? parserDates([...self.settings.range.disabled]) : [];
	self.rangeEnabled = self.settings.range.enabled ? parserDates([...self.settings.range.enabled]) : [];
	self.selectedDates = self.settings.selected.dates ? parserDates([...self.settings.selected.dates]) : [];
	self.selectedHolidays = self.settings.selected.holidays ? parserDates([...self.settings.selected.holidays]) : [];

	if (self.settings.range.disablePast && !self.settings.range.disableAllDays && new Date(`${self.settings.range.min} 00:00:00`) < self.date.today) {
		self.rangeMin = generateDate(self.date.today);
	}

	if (self.settings.range.disableAllDays) {
		self.rangeMin = generateDate(self.date.today);
		self.rangeMax = generateDate(self.date.today);
		self.rangeDisabled?.push(generateDate(self.date.today));
	}

	if (self.rangeEnabled) self.rangeEnabled.sort((a, b) => +new Date(a) - +new Date(b));

	if (self.rangeEnabled?.[0] && self.settings.range.disableAllDays) {
		self.rangeMin = self.rangeEnabled[0];
		self.rangeMax = self.rangeEnabled[self.rangeEnabled.length - 1];
	}

	const firstDay = new Date(`${self.rangeMin} 00:00:00`);
	const lastDay = new Date(`${self.rangeMax} 00:00:00`);
	firstDay.setDate(firstDay.getDate() - 1);
	lastDay.setDate(lastDay.getDate() + 1);
	self.rangeDisabled.push(generateDate(firstDay));
	self.rangeDisabled.push(generateDate(lastDay));

	if (self.settings.selected.month !== null && self.settings.selected.month >= 0 && self.settings.selected.month < 12) {
		self.selectedMonth = self.settings.selected.month;
	} else {
		self.selectedMonth = self.date.today.getMonth();
	}

	if (self.settings.selected.year !== null && self.settings.selected.year >= 0 && self.settings.selected.year <= 9999) {
		self.selectedYear = self.settings.selected.year;
	} else {
		self.selectedYear = self.date.today.getFullYear();
	}

	self.viewYear = self.selectedYear;
	self.dateMin = self.settings.visibility.disabled ? new Date(`${self.date.min} 00:00:00`) : new Date(`${self.rangeMin} 00:00:00`);
	self.dateMax = self.settings.visibility.disabled ? new Date(`${self.date.max} 00:00:00`) : new Date(`${self.rangeMax} 00:00:00`);

	const time12 = self.settings.selection.time === true || self.settings.selection.time === 12;
	if (time12 || self.settings.selection.time === 24) {
		self.userTime = false;

		if (typeof self.settings.selected.time === 'string') {
			const regExr = time12 ? /^([0-9]|0[1-9]|1[0-2]):([0-5][0-9])|(AM|PM)/g
				: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])/g;

			self.settings.selected.time.replace(regExr, (_, p1: string, p2: string, p3: string) => {
				if (p1 && p2) {
					self.userTime = true;
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

		if (!self.userTime && (time12)) {
			self.selectedHours = transformTime12(String(self.date.today.getHours()));
			self.selectedMinutes = String(self.date.today.getMinutes());
			self.selectedKeeping = Number(self.date.today.getHours()) >= 12 ? 'PM' : 'AM';
		} else if (!self.userTime) {
			self.selectedHours = String(self.date.today.getHours());
			self.selectedMinutes = String(self.date.today.getMinutes());
		}

		self.selectedHours = Number(self.selectedHours) < 10 ? `0${Number(self.selectedHours)}` : `${self.selectedHours}`;
		self.selectedMinutes = Number(self.selectedMinutes) < 10 ? `0${Number(self.selectedMinutes)}` : `${self.selectedMinutes}`;
		self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;
	} else if (self.settings.selection.time) {
		self.settings.selection.time = false;
		// eslint-disable-next-line no-console
		console.error('The value of the time property can be: false, true, 12 or 24.');
	}

	if (self.type !== 'multiple') return;

	if (self.months === 1) {
		// eslint-disable-next-line no-console
		console.warn('The value of the «months» parameter cannot be less than «2», the minimum available value will be initialized.');
		self.correctMonths = 2;
	} else if (self.months > 12) {
		// eslint-disable-next-line no-console
		console.warn('The value of the «months» parameter cannot be greater than «12», the maximum available value will be initialized.');
		self.correctMonths = 12;
	} else {
		self.correctMonths = self.months;
	}
};

export default setVariablesDates;
