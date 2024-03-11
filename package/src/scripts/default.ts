import classes from '@package/classes';
import * as T from '@package/types';
import DOMDefault from '@scripts/templates/DOMDefault';
import DOMMultiple from '@scripts/templates/DOMMultiple';
import DOMMonth from '@scripts/templates/DOMMonth';
import DOMYear from '@scripts/templates/DOMYear';

export default class DefaultOptionsCalendar {
	isInit = false;
	input = false;
	type: T.TypesCalendar = 'default';
	months = 2;
	jumpMonths = 1;
	date: T.IDates = {
		min: '1970-01-01',
		max: '2470-12-31',
		today: new Date(),
	};
	settings: T.ISettings = {
		lang: 'en',
		iso8601: true,
		range: {
			min: this.date.min,
			max: this.date.max,
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
			cancelableDay: true,
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
			positionToInput: 'left',
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
		getMonths: null,
		getYears: null,
		initCalendar: null,
		updateCalendar: null,
		destroyCalendar: null,
		showCalendar: null,
		hideCalendar: null,
	};
	popups: T.IPopups = {};
	CSSClasses: T.CSSClasses = { ...classes };
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
	currentType!: T.TypesCalendar;
	correctMonths!: number;
	viewYear!: number;
	dateMin!: Date;
	dateMax!: Date;
}
