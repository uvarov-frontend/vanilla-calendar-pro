import themes from './scripts/themes';

type OneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type ZeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type MM = `0${OneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${OneToNine}` | `${1 | 2}${ZeroToNine}` | `3${0 | 1}`;
export type FormatDateString = `${number}-${MM}-${DD}`;

export interface IDate {
	min: FormatDateString;
	max: FormatDateString;
	today: Date;
}

export interface IRange {
	min: FormatDateString;
	max: FormatDateString;
	disablePast: boolean;
	disableGaps: boolean;
	disableAllDays: boolean;
	disableWeekday: number[] | null;
	disabled: string[] | null;
	enabled: string[] | null;
}

export interface ISelection {
	day: false | 'single' | 'multiple' | 'multiple-ranged';
	month: boolean;
	year: boolean;
	time: boolean | number;
	controlTime: 'all' | 'range';
	stepHours: number;
	stepMinutes: number;
}

export interface ISelected {
	dates: string[] | undefined | null;
	month: number | null;
	year: number | null;
	holidays: string[] | null;
	time: string | null;
}

export interface IVisibility {
	theme: typeof themes[number];
	themeDetect: string | false;
	monthShort: boolean;
	weekNumbers: boolean;
	weekend: boolean;
	today: boolean;
	disabled: boolean;
	daysOutside: boolean;
}

export interface ISettings {
	lang: string;
	iso8601: boolean;
	range: IRange;
	selection: ISelection;
	selected: ISelected;
	visibility: IVisibility;
}

export interface ILocale {
	months: string[] | [];
	weekday: string[] | [];
}

export interface IActions {
	clickDay: ((e: MouseEvent, dates: string[] | undefined) => void) | null;
	clickWeekNumber: ((e: MouseEvent, number: number, days: HTMLElement[], year: number) => void) | null;
	clickMonth: ((e: MouseEvent, month: number) => void) | null;
	clickYear: ((e: MouseEvent, year: number) => void) | null;
	clickArrow: ((e: MouseEvent, year: number, month: number) => void) | null;
	changeTime: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
	changeToInput: ((e: Event, HTMLInputElement: HTMLElement, dates?: string[], time?: string, hours?: string, minutes?: string, keeping?: string) => void) | null;
}

export type IPopups = {
	[date in FormatDateString]: {
		modifier?: string | null;
		html: string;
	} | null;
};

export interface IDOMTemplates {
	default: string;
	multiple: string;
	month: string;
	year: string;
}

export interface ICSSClasses {
	calendar: string;
	calendarDefault: string;
	calendarMultiple: string;
	calendarMonth: string;
	calendarYear: string;
	calendarHidden: string;
	calendarToInput: string;
	calendarInputWrapper: string;
	controls: string;
	grid: string;
	column: string;
	header: string;
	headerContent: string;
	month: string;
	monthDisabled: string;
	year: string;
	yearDisabled: string;
	arrow: string;
	arrowPrev: string;
	arrowNext: string;
	wrapper: string;
	content: string;
	week: string;
	weekDay: string;
	weekDayWeekend: string;
	days: string;
	daysSelecting: string;
	months: string;
	monthsSelecting: string;
	monthsMonth: string;
	monthsMonthSelected: string;
	monthsMonthDisabled: string;
	years: string;
	yearsSelecting: string;
	yearsYear: string;
	yearsYearSelected: string;
	yearsYearDisabled: string;
	time: string;
	timeContent: string;
	timeHours: string;
	timeMinutes: string;
	timeKeeping: string;
	timeRanges: string;
	timeRange: string;
	day: string;
	daySelected: string;
	daySelectedFirst: string;
	daySelectedLast: string;
	daySelectedIntermediate: string;
	dayPopup: string;
	dayBtn: string;
	dayBtnPrev: string;
	dayBtnNext: string;
	dayBtnSelected: string;
	dayBtnHover: string;
	dayBtnIntermediate: string;
	dayBtnDisabled: string;
	dayBtnToday: string;
	dayBtnWeekend: string;
	dayBtnHoliday: string;
	weekNumbers: string;
	weekNumbersTitle: string;
	weekNumbersContent: string;
	weekNumber: string;
	isFocus: string;
}

export interface IOptions {
	input: boolean;
	type: 'default' | 'multiple' | 'month' | 'year';
	months: number;
	date: IDate;
	settings: ISettings;
	locale: ILocale;
	actions: IActions;
	popups?: IPopups | null;
	DOMTemplates: IDOMTemplates;
	CSSClasses: ICSSClasses;
}

export interface IVariables extends IOptions {
	HTMLElement: HTMLElement | null;
	currentType: string;
	reset: () => void;
	update: () => void;
	init: () => void;
}

export interface IVanillaCalendar extends IVariables {
	HTMLInputElement?: HTMLElement;
	rangeMin?: FormatDateString;
	rangeMax?: FormatDateString;
	rangeDisabled?: FormatDateString[];
	rangeEnabled?: FormatDateString[];
	selectedDates?: FormatDateString[];
	selectedHolidays?: FormatDateString[];
	selectedMonth?: number;
	selectedYear?: number;
	selectedHours?: string;
	selectedMinutes?: string;
	selectedKeeping?: string;
	selectedTime?: string;
	userTime?: boolean;
	correctMonths?: number;
	viewYear?: number;
	dateMin?: Date;
	dateMax?: Date;
}
