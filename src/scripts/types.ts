export interface IWindow {
	VanillaCalendar?: object;
}

export interface IOptions {
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
			min: string,
			max: string,
			disabled: string[] | null,
			enabled: string[] | null,
		};
		selection: {
			day: string;
			month: boolean;
			year: boolean;
			time: boolean | number;
			controlTime: string;
			stepHours: number;
			stepMinutes: number;
		};
		selected: {
			dates: string[] | undefined | null;
			month: number | null;
			year: number | null;
			holidays: string[] | null;
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
		clickDay: (e: MouseEvent, dates: string[] | undefined) => void;
		clickMonth: (e: MouseEvent, month: number) => void;
		clickYear: (e: MouseEvent, year: number) => void;
		changeTime: (e: Event, time: string, hours: string, minutes: string, keeping: string) => void;
	};
	popups: {
		[key: string]: {
			modifier: string;
			html: string;
		};
	} | null;
}

export interface IVariables extends IOptions {
	HTMLElement: HTMLElement | null;
	currentType: string;
	selectedKeeping: string | null;
	userTime: boolean;
}

export interface IVanillaCalendar extends IVariables {
	selectedDates?: string[];
	selectedMonth?: number;
	selectedYear?: number;
	selectedHours?: string;
	selectedMinutes?: string;
	selectedTime?: string;
	viewYear?: number;
	dateMin?: Date;
	dateMax?: Date;
}
