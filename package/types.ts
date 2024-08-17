import classes from './classes';

type LeadingZero = `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type MM = LeadingZero | 10 | 11 | 12;
type DD = LeadingZero | `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | 30 | 31;
export type FormatDateString = `${number}-${MM}-${DD}`;

export type Positions = 'bottom' | 'top' | 'center' | 'left' | 'right';

export interface HtmlElementPosition {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

export type TypesCalendar = 'default' | 'multiple' | 'month' | 'year';

export type CSSClasses = typeof classes;

export interface IDates {
	min: FormatDateString | 'today';
	max: FormatDateString | 'today';
	today: Date;
}

export interface IRange {
	/** This parameter sets the minimum date that the user can choose */
	min?: FormatDateString | 'today';
	/** This parameter sets the maximum date that the user can choose */
	max?: FormatDateString | 'today';
	/** This parameter disables all past days. */
	disablePast: boolean;
	/**
	 * This parameter disables the selection of days within a range with disabled dates.
	 * Only works when `settings.selection.day` is set to `'multiple-ranged'`.
	 */
	disableGaps: boolean;
	/**
	 * This parameter will only keep references of the date range edges (start/end dates) in the `settings.selected.dates` array.
	 * Only works when `settings.selection.day` is set to `'multiple-ranged'`.
	 */
	edgesOnly?: boolean;
	/** This parameter disables all days and can be useful when using `settings.range.enabled` */
	disableAllDays: boolean;
	/** This parameter allows you to disable specified weekdays. */
	disableWeekday?: number[];
	/** This parameter allows you to disable specific dates regardless of the specified range. */
	disabled?: Array<Date | number | FormatDateString>;
	/** This parameter allows you to enable specific dates regardless of the range and disabled dates. */
	enabled?: Array<Date | number | FormatDateString>;
}

export interface ISelection {
	day: false | 'single' | 'multiple' | 'multiple-ranged';
	month: boolean | 'only-arrows';
	year: boolean | 'only-arrows';
	time: boolean | 12 | 24;
	controlTime: 'all' | 'range';
	stepHours: number;
	stepMinutes: number;
	cancelableDay: boolean;
}

export interface ISelected {
	dates?: Array<Date | number | FormatDateString>;
	month?: number;
	year?: number;
	holidays?: Array<Date | number | FormatDateString>;
	time?: string;
}

export type ToggleSelected = boolean | ((self: IVanillaCalendar) => boolean);

export interface IVisibility {
	/** This parameter determines the theme of the calendar. By default, the theme is determined by the user's system or website settings. */
	theme: 'light' | 'dark' | 'system';
	/** To automatically detect and apply the website's theme to the calendar, you can pass a string value as a CSS selector. */
	themeDetect: string | false;
	/** This parameter allows you to use abbreviated month names when selecting a month. */
	monthShort: boolean;
	/** With this parameter, you can decide whether to display week numbers in the calendar. */
	weekNumbers: boolean;
	/** This parameter allows you to highlight weekends in the calendar. */
	weekend: boolean;
	/** With this parameter, you can highlight the current day in the calendar. */
	today: boolean;
	/** This parameter determines whether all days, including disabled days, will be displayed. */
	disabled: boolean;
	/** With this parameter, you can decide whether to display days from the previous and next months. */
	daysOutside: boolean;
	/** This parameter specifies the position of the calendar relative to input, if the calendar is initialized with the `input` parameter. */
	positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'];
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
	clickDay: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
	clickWeekNumber: ((e: MouseEvent, number: number, days: HTMLElement[], year: number, self: IVanillaCalendar) => void) | null;
	clickMonth: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
	clickYear: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
	clickArrow: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
	changeTime: ((e: Event, self: IVanillaCalendar) => void) | null;
	changeToInput: ((e: Event, self: IVanillaCalendar) => void) | null;
	getDays: ((day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) => void) | null;
	getMonths: ((month: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
	getYears: ((year: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
	initCalendar: ((self: IVanillaCalendar) => void) | null;
	updateCalendar: ((self: IVanillaCalendar) => void) | null;
	destroyCalendar: ((self: IVanillaCalendar) => void) | null;
	showCalendar: ((self: IVanillaCalendar) => void) | null;
	hideCalendar: ((self: IVanillaCalendar) => void) | null;
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

export interface IReset {
	year?: boolean;
	month?: boolean;
	dates?: boolean | 'only-first';
	holidays?: boolean;
	time?: boolean;
}

export interface IOptions {
	input?: boolean;
	type?: TypesCalendar;
	months?: number;
	jumpMonths?: number;
	jumpToSelectedDate?: boolean;
	toggleSelected?: ToggleSelected;
	date?: Partial<IDates>;
	sanitizer?: (dirtyHtml: string) => unknown;
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
	CSSClasses?: Partial<CSSClasses>;
	DOMTemplates?: Partial<IDOMTemplates>;
}

export interface IVanillaCalendar {
	input: boolean;
	type: TypesCalendar;
	months: number;
	jumpMonths: number;
	jumpToSelectedDate: boolean;
	toggleSelected: ToggleSelected
	date: IDates;
	settings: {
		lang: string;
		iso8601: boolean;
		range: IRange;
		selection: ISelection;
		selected: ISelected;
		visibility: IVisibility;
	};
	locale: ILocale;
	actions: IActions;
	sanitizer: (dirtyHtml: string) => unknown;
	popups: IPopups;
	CSSClasses: CSSClasses;
	DOMTemplates: IDOMTemplates;

	init: () => () => void;
	update: (reset?: IReset) => void;
	destroy: () => void;
	show: () => void;
	hide: () => void;

	readonly HTMLElement: HTMLElement;
	readonly HTMLOriginalElement: HTMLElement;
	readonly HTMLInputElement?: HTMLInputElement;
	readonly rangeMin: FormatDateString;
	readonly rangeMax: FormatDateString;
	readonly rangeDisabled: FormatDateString[];
	readonly rangeEnabled: FormatDateString[];
	readonly selectedDates: FormatDateString[];
	readonly selectedHolidays: FormatDateString[];
	readonly selectedMonth: number;
	readonly selectedYear: number;
	readonly selectedHours?: string;
	readonly selectedMinutes?: string;
	readonly selectedKeeping?: string;
	readonly selectedTime?: string;
	readonly currentType: TypesCalendar;
	readonly correctMonths: number;
	readonly viewYear: number;
	readonly dateMin: Date;
	readonly dateMax: Date;
	readonly isInit: boolean;
	readonly isInputInit: boolean;
}
