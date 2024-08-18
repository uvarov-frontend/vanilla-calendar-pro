import * as T from './types';

declare class VanillaCalendar implements T.IVanillaCalendar {
	constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>);

	input: boolean;
	type: T.TypesCalendar;
	months: number;
	jumpMonths: number;
	jumpToSelectedDate: boolean;
	toggleSelected: T.ToggleSelected;
	date: T.IDates;
	settings: {
		lang: string;
		iso8601: boolean;
		range: T.IRange;
		selection: T.ISelection;
		selected: T.ISelected;
		visibility: T.IVisibility;
	};
	locale: T.ILocale;
	actions: T.IActions;
	sanitizer: (dirtyHtml: string) => unknown;
	popups: T.IPopups;
	ariaLabels: T.AriaLabels;
	CSSClasses: T.CSSClasses;
	DOMTemplates: T.IDOMTemplates;

	init: () => () => void;
	update: (reset?: T.IReset) => void;
	destroy: () => void;
	show: () => void;
	hide: () => void;

	readonly HTMLElement: HTMLElement;
	readonly HTMLOriginalElement: HTMLElement;
	readonly HTMLInputElement?: HTMLInputElement;
	readonly rangeMin: T.FormatDateString;
	readonly rangeMax: T.FormatDateString;
	readonly rangeDisabled: T.FormatDateString[];
	readonly rangeEnabled: T.FormatDateString[];
	readonly selectedDates: T.FormatDateString[];
	readonly selectedHolidays: T.FormatDateString[];
	readonly selectedMonth: number;
	readonly selectedYear: number;
	readonly selectedHours?: string;
	readonly selectedMinutes?: string;
	readonly selectedKeeping?: string;
	readonly selectedTime?: string;
	readonly currentType: T.TypesCalendar;
	readonly correctMonths: number;
	readonly viewYear: number;
	readonly dateMin: Date;
	readonly dateMax: Date;
	readonly isInit: boolean;
	readonly isInputInit: boolean;
}

export = VanillaCalendar;
