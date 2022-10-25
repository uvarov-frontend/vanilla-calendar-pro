type oneToNine = 1|2|3|4|5|6|7|8|9;
type zeroToNine = 0|1|2|3|4|5|6|7|8|9;
type MM = `0${oneToNine}` | `1${0|1|2}`;
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`;
export type FormatDateString = `${number}-${MM}-${DD}`;

export interface IWindow {
	VanillaCalendar?: object;
}

export interface IOptionsDev {
	type: string;
	date: {
		min: string;
		max: string;
		today: Date;
	};
	settings: {
		lang: string;
		iso8601: boolean;
		range: {
			min: FormatDateString,
			max: FormatDateString,
			disabled: FormatDateString[] | null,
			enabled: FormatDateString[] | null,
		};
		selection: {
			day: 'single' | 'multiple' | 'multiple-ranged';
			month: boolean;
			year: boolean;
			time: boolean | number;
			controlTime: 'all' | 'range';
			stepHours: number;
			stepMinutes: number;
		};
		selected: {
			dates: FormatDateString[] | undefined | null;
			month: number | null;
			year: number | null;
			holidays: FormatDateString[] | null;
			time: string | null;
		};
		visibility: {
			templateHeader: string;
			monthShort: boolean;
			weekNumbers: boolean;
			weekend: boolean;
			today: boolean;
			disabled: boolean;
		};
	};
	locale: {
		months: string[] | [];
		weekday: string[] | [];
	};
	actions: {
		clickDay: ((e: MouseEvent, dates: string[] | undefined) => void) | null;
		clickMonth: ((e: MouseEvent, month: number) => void) | null;
		clickYear: ((e: MouseEvent, year: number) => void) | null;
		changeTime: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
	};
	popups: {
		[date in FormatDateString]: {
			modifier: string | null;
			html: string;
		} | null;
	} | null;
}

export interface IVariables extends IOptionsDev {
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
