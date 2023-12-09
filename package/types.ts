import classes from './classes';

type LeadingZero = `${0}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type MM = LeadingZero | 10 | 11 | 12;
type DD = LeadingZero | `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | 30 | 31;
export type FormatDateString = `${number}-${MM}-${DD}`;

export type TypesCalendar = 'default' | 'multiple' | 'month' | 'year';

export type CSSClasses = typeof classes;

export interface IDates {
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
	cancelableDay: boolean;
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
	positionToInput: 'left' | 'center' | 'right';
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
	changeToInput: ((
		e: Event,
		calendar: {
			hide(): void;
			show(): void;
		},
		self: IVanillaCalendar,
	) => void) | null;
	getDays: ((day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) => void) | null;
	hideCalendar: ((self: IVanillaCalendar) => void) | null;
	showCalendar: ((self: IVanillaCalendar) => void) | null;
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
	date?: Partial<IDates>;
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
	popups: IPopups;
	CSSClasses: CSSClasses;
	DOMTemplates: IDOMTemplates;

	init: () => void;
	update: (reset?: IReset) => void;
	destroy: () => void;

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
}
