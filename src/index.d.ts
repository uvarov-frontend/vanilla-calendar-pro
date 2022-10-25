import { FormatDateString } from './types';

export interface IOptions {
	type?: string;
	date?: {
		min?: string;
		max?: string;
		today?: Date;
	};
	settings?: {
		lang?: string;
		iso8601?: boolean;
		range?: {
			min?: FormatDateString,
			max?: FormatDateString,
			disabled?: FormatDateString[] | null,
			enabled?: FormatDateString[] | null,
		};
		selection?: {
			day?: boolean | 'single' | 'multiple' | 'multiple-ranged';
			month?: boolean;
			year?: boolean;
			time?: boolean | number;
			controlTime?: 'all' | 'range';
			stepHours?: number;
			stepMinutes?: number;
		};
		selected?: {
			dates?: FormatDateString[] | undefined | null;
			month?: number | null;
			year?: number | null;
			holidays?: FormatDateString[] | null;
			time?: string | null;
		};
		visibility?: {
			templateHeader?: string;
			monthShort?: boolean;
			weekNumbers?: boolean;
			weekend?: boolean;
			today?: boolean;
			disabled?: boolean;
		};
	};
	locale?: {
		months?: string[] | [];
		weekday?: string[] | [];
	};
	actions?: {
		clickDay?: ((e: MouseEvent, dates: string[] | undefined) => void) | null;
		clickMonth?: ((e: MouseEvent, month: number) => void) | null;
		clickYear?: ((e: MouseEvent, year: number) => void) | null;
		changeTime?: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
	};
	popups?: {
		[date in FormatDateString]: {
			modifier: string | null;
			html: string;
		} | null;
	} | null;
}

declare class VanillaCalendar {
	constructor(selector: string | HTMLElement, option?: Partial<IOptions>)

	update: () => void;

	init: () => void;
}

export default VanillaCalendar;
