type oneToNine = 1|2|3|4|5|6|7|8|9;
type zeroToNine = 0|1|2|3|4|5|6|7|8|9;
type MM = `0${oneToNine}` | `1${0|1|2}`;
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`;
export type FormatDateString = `${number}-${MM}-${DD}`;

export interface IDate {
	min: string;
	max: string;
	today: Date;
}

export interface IRange {
	min: FormatDateString;
	max: FormatDateString;
	disabled: FormatDateString[] | null;
	enabled: FormatDateString[] | null;
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
	dates: FormatDateString[] | undefined | null;
	month: number | null;
	year: number | null;
	holidays: FormatDateString[] | null;
	time: string | null;
}

export interface IVisibility {
	monthShort: boolean;
	weekNumbers: boolean;
	weekend: boolean;
	today: boolean;
	disabled: boolean;
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
	clickMonth: ((e: MouseEvent, month: number) => void) | null;
	clickYear: ((e: MouseEvent, year: number) => void) | null;
	clickArrow: ((e: MouseEvent, year: number, month: number) => void) | null;
	changeTime: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
}

export type IPopups = {
	[date in FormatDateString]: {
		modifier?: string | null;
		html: string;
	} | null;
}

export interface IDOMTemplates {
	default: string;
	month: string;
	year: string;
}

export interface ICSSClasses {
	calendar: string;
	calendarDefault: string;
	calendarMonth: string;
	calendarYear: string;
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
	dayPopup: string;
	dayBtn: string;
	dayBtnPrev: string;
	dayBtnNext: string;
	dayBtnSelected: string;
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
	type: string;
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
	selectedKeeping: string | null;
	userTime: boolean;
	update: () => void;
	init: () => void;
}

export interface IVanillaCalendar extends IVariables {
	selectedDates?: FormatDateString[];
	selectedMonth?: number;
	selectedYear?: number;
	selectedHours?: string;
	selectedMinutes?: string;
	selectedTime?: string;
	viewYear?: number;
	dateMin?: Date;
	dateMax?: Date;
}
