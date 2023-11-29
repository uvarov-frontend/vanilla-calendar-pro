type LeadingZero = `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type MM = LeadingZero | 10 | 11 | 12;
type DD = LeadingZero | `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | 30 | 31;
export type FormatDateString = `${number}-${MM}-${DD}`;

export type TypesCalendar = 'default' | 'multiple' | 'month' | 'year';

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
	disableWeekday?: number[];
	disabled?: string[];
	enabled?: string[];
}

export interface ISelection {
	day: false | 'single' | 'multiple' | 'multiple-ranged';
	month: boolean | 'only-arrows';
	year: boolean | 'only-arrows';
	time: boolean | 12 | 24;
	controlTime: 'all' | 'range';
	stepHours: number;
	stepMinutes: number;
}

export interface ISelected {
	dates?: string[];
	month?: number;
	year?: number;
	holidays?: string[];
	time?: string;
}

export interface IVisibility {
	theme: 'light' | 'dark' | 'system';
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
	clickDay: ((e: MouseEvent, dates: FormatDateString[] | undefined) => void) | null;
	clickWeekNumber: ((e: MouseEvent, number: number, days: HTMLElement[], year: number) => void) | null;
	clickMonth: ((e: MouseEvent, month: number, year: number) => void) | null;
	clickYear: ((e: MouseEvent, year: number, month: number) => void) | null;
	clickArrow: ((e: MouseEvent, year: number, month: number) => void) | null;
	changeTime: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
	changeToInput: ((
		e: Event,
		calendar: {
			hide(): void;
			show(): void;
			HTMLInputElement: HTMLInputElement;
			HTMLElement: HTMLElement;
		},
		dates?: FormatDateString[],
		time?: string,
		hours?: string,
		minutes?: string,
		keeping?: string
	) => void) | null;
	getDays: ((day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement) => void) | null;
	hideCalendar: ((HTMLInputElement: HTMLInputElement, HTMLElement: HTMLElement) => void) | null;
	showCalendar: ((HTMLInputElement: HTMLInputElement, HTMLElement: HTMLElement) => void) | null;
}

export type IPopup = {
	modifier?: string;
	html?: string;
};

export type IPopups = {
	[date in FormatDateString]: IPopup;
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
	controls: string;
	grid: string;
	gridDisabled: string;
	column: string;
	columnMonth: string;
	columnYear: string;
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
	dayBtnSelectedFirst: string;
	dayBtnSelectedLast: string;
	dayBtnSelectedIntermediate: string;
	dayBtnHover: string;
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
	input?: boolean;
	type?: TypesCalendar;
	months?: number;
	jumpMonths?: number;
	date?: Partial<IDate>;
	settings?: Partial<{
		lang: string;
		iso8601: boolean;
		range: Partial<IRange>;
		selection: Partial<ISelection>;
		selected: Partial<ISelected>;
		visibility: Partial<IVisibility>;
	}>;
	locale?: Partial<ILocale>;
	actions?: Partial<IActions>;
	popups?: IPopups;
	CSSClasses?: Partial<ICSSClasses>;
	DOMTemplates?: Partial<IDOMTemplates>;
}
