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
	/** This parameter determines whether it's allowed to select one or multiple days, or if day selection is completely disabled. */
	day: false | 'single' | 'multiple' | 'multiple-ranged';
	/** This parameter allows you to disable the selection of months, allow switching between months only using arrows, or allow switching between months in any way. */
	month: boolean | 'only-arrows';
	/** This parameter allows you to disable the selection of years, allow switching between years only using arrows, or allow switching between years in any way. */
	year: boolean | 'only-arrows';
	/** This parameter enables time selection. You can also specify the time format using a boolean value or a number: 24-hour or 12-hour format. */
	time: boolean | 12 | 24;
	/** This parameter determines how time selection is allowed: `'all'` (any method) or `'range'` (only with the controller). */
	controlTime: 'all' | 'range';
	/** This parameter sets the step for the hour controller. You can choose any number from 1 to 23. */
	stepHours: number;
	/** This parameter sets the step for the minute controller. You can choose any number from 1 to 59. */
	stepMinutes: number;
	/** This option allows you to enable/disable cancellation of the selected date by pressing again. */
	cancelableDay: boolean;
}

export interface ISelected {
	/** This parameter allows you to specify a list of dates that will be selected when the calendar is initialized. */
	dates?: Array<Date | number | FormatDateString>;
	/** This parameter determines the month that will be displayed when the calendar is initialized. Months are numbered from 0 to 11. */
	month?: number;
	/** This parameter determines the year that will be displayed when the calendar is initialized. */
	year?: number;
	/** This parameter allows you to specify dates that will be considered holidays and will receive additional CSS modifiers. */
	holidays?: Array<Date | number | FormatDateString>;
	/**
	 * This parameter allows you to set the time that will be displayed when the calendar is initialized.
	 * The time is specified in the `'hh:mm aa'` format, where `'aa'` is the AM/PM marker. If using the 24-hour format, the `'aa'` marker is not required.
	 */
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
	/** This parameter sets the language localization of the calendar. */
	lang: string;
	/**
	 * This parameter sets the start of the week in accordance with the international standard ISO 8601.
	 * If set to `'false'`, the week will start on Sunday; otherwise, it starts on Monday.
	 */
	iso8601: boolean;
	range: IRange;
	selection: ISelection;
	selected: ISelected;
	visibility: IVisibility;
}

export type IPartialSettings = Partial<Pick<ISettings, 'iso8601' | 'lang'> & {
	range: Partial<IRange>;
	selection: Partial<ISelection>;
	selected: Partial<ISelected>;
	visibility: Partial<IVisibility>;
}>;

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
	settings?: Partial<IPartialSettings>;
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
	toggleSelected: ToggleSelected;
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
