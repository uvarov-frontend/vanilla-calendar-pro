import { IVanillaCalendar } from 'src/types';
import transformTime12 from './transformTime12';

const setVariablesDates = (self: IVanillaCalendar) => {
	if (self.settings.selected.dates !== null) {
		self.selectedDates = self.settings.selected.dates;
	} else {
		self.selectedDates = [];
	}

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
	self.dateMin = self.settings.visibility.disabled ? new Date(self.date.min) : new Date(self.settings.range.min);
	self.dateMax = self.settings.visibility.disabled ? new Date(self.date.max) : new Date(self.settings.range.max);

	const time12 = self.settings.selection.time === true || self.settings.selection.time === 12;
	if (time12 || self.settings.selection.time === 24) {
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
			self.selectedKeeping = Number(self.date.today.getHours()) > 12 ? 'PM' : 'AM';
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
};

export default setVariablesDates;
