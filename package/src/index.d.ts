import {
	IActions,
	ICSSClasses,
	IDate,
	ILocale,
	IPopups,
	IRange,
	ISelected,
	ISelection,
	IDOMTemplates,
	IVisibility,
} from './types';

type Settings = {
	lang: string;
	iso8601: boolean;
	range: Partial<IRange>;
	selection: Partial<ISelection>;
	selected: Partial<ISelected>;
	visibility: Partial<IVisibility>;
};

export type Options = {
	type?: 'default' | 'multiple' | 'month' | 'year';
	months?: number;
	date?: Partial<IDate>;
	settings?: Partial<Settings>;
	locale?: Partial<ILocale>;
	actions?: Partial<IActions>;
	popups?: IPopups | null;
	CSSClasses?: Partial<ICSSClasses>;
	DOMTemplates?: Partial<IDOMTemplates>;
};

declare class VanillaCalendar<T extends (HTMLElement | string), R extends Partial<Options>> {
	constructor(selector: T, option?: R);

	update: () => void;

	init: () => void;

	type?: 'default' | 'multiple' | 'month' | 'year';

	months: number;

	date: Partial<IDate>;

	settings: Partial<Settings>;

	locale: Partial<ILocale>;

	actions: Partial<IActions>;

	popups: IPopups | null;

	CSSClasses: Partial<ICSSClasses>;

	DOMTemplates: Partial<IDOMTemplates>;

	readonly HTMLElement: HTMLElement | null;

	readonly currentType: string;

	readonly selectedKeeping: null;

	readonly userTime: boolean;

	readonly rangeMin: FormatDateString;

	readonly rangeMax: FormatDateString;

	readonly rangeDisabled: FormatDateString[];

	readonly rangeEnabled: FormatDateString[];

	readonly selectedDates: FormatDateString[];

	readonly selectedHolidays: FormatDateString[];

	readonly selectedMonth: number;

	readonly selectedYear: number;

	readonly selectedHours: string;

	readonly selectedMinutes: string;

	readonly selectedTime: string;

	readonly correctMonths: number;

	readonly viewYear: number;

	readonly dateMin: Date;

	readonly dateMax: Date;
}

export default VanillaCalendar;
