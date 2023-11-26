import * as T from '@src/types';
import DOMDefault from '@scripts/templates/DOMDefault';
import DOMMultiple from '@scripts/templates/DOMMultiple';
import DOMMonth from '@scripts/templates/DOMMonth';
import DOMYear from '@scripts/templates/DOMYear';
import classes from '@src/classes';

export default class DefaultOptionsCalendar {
	input = false;
	type: T.TypesCalendar = 'default';
	months = 2;
	jumpMonths = 1;
	date: T.IDate = {
		min: '1970-01-01',
		max: '2470-12-31',
		today: new Date(),
	};
	settings: T.ISettings = {
		lang: 'en',
		iso8601: true,
		range: {
			min: '1970-01-01',
			max: '2470-12-31',
			disablePast: false,
			disableGaps: false,
			disableAllDays: false,
			disableWeekday: undefined,
			disabled: undefined,
			enabled: undefined,
		},
		selection: {
			day: 'single',
			month: true,
			year: true,
			time: false,
			controlTime: 'all',
			stepHours: 1,
			stepMinutes: 1,
		},
		selected: {
			dates: undefined,
			month: undefined,
			year: undefined,
			holidays: undefined,
			time: undefined,
		},
		visibility: {
			theme: 'system',
			themeDetect: 'html[data-theme]',
			monthShort: true,
			weekNumbers: false,
			weekend: true,
			today: true,
			disabled: false,
			daysOutside: true,
		},
	};
	locale: T.ILocale = {
		months: [],
		weekday: [],
	};
	actions: T.IActions = {
		clickDay: null,
		clickWeekNumber: null,
		clickMonth: null,
		clickYear: null,
		clickArrow: null,
		changeTime: null,
		changeToInput: null,
		getDays: null,
		hideCalendar: null,
		showCalendar: null,
	};
	popups: T.IPopups = {};
	CSSClasses: T.ICSSClasses = { ...classes };
	DOMTemplates: T.IDOMTemplates = {
		default: DOMDefault(this.CSSClasses),
		multiple: DOMMultiple(this.CSSClasses),
		month: DOMMonth(this.CSSClasses),
		year: DOMYear(this.CSSClasses),
	};
	HTMLElement!: HTMLElement;
	HTMLOriginalElement!: HTMLElement;
	HTMLInputElement?: HTMLInputElement;
	rangeMin!: T.FormatDateString;
	rangeMax!: T.FormatDateString;
	rangeDisabled!: T.FormatDateString[];
	rangeEnabled!: T.FormatDateString[];
	selectedDates!: T.FormatDateString[];
	selectedHolidays!: T.FormatDateString[];
	selectedMonth!: number;
	selectedYear!: number;
	selectedHours!: string;
	selectedMinutes!: string;
	selectedKeeping!: string;
	selectedTime!: string;
	userTime!: boolean;
	currentType!: T.TypesCalendar;
	correctMonths!: number;
	viewYear!: number;
	dateMin!: Date;
	dateMax!: Date;
}
