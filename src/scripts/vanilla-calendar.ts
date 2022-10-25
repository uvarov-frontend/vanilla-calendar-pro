import { FormatDateString, IOptionsDev } from 'src/types';
import updateCalendar from './methods/updateCalendar';
import initCalendar from './methods/initCalendar';

export default class VanillaCalendar {
	HTMLElement: HTMLElement | null;

	type!: string;

	date!: {
		min: string;
		max: string;
		today: Date;
	};

	settings!: {
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

	locale!: {
		months: string[] | [];
		weekday: string[] | [];
	};

	actions!: {
		clickDay: ((e: MouseEvent, dates: string[] | undefined) => void) | null;
		clickMonth: ((e: MouseEvent, month: number) => void) | null;
		clickYear: ((e: MouseEvent, year: number) => void) | null;
		changeTime: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
	};

	popups!: {
		[date in FormatDateString]: {
			modifier: string | null;
			html: string;
		} | null;
	} | null;

	currentType!: string;

	selectedKeeping!: null;

	userTime!: boolean;

	constructor(selector: string | HTMLElement, option: IOptionsDev) {
		this.HTMLElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
		if (!this.HTMLElement) return;
		this.type = option?.type ?? 'default';
		this.date = {
			min: option?.date?.min ?? '1970-01-01',
			max: option?.date?.max ?? '2470-12-31',
			today: option?.date?.today ?? new Date(),
		};
		this.settings = {
			lang: option?.settings?.lang ?? 'en',
			iso8601: option?.settings?.iso8601 ?? true,
			range: {
				min: option?.settings?.range?.min ?? this.date.min,
				max: option?.settings?.range?.max ?? this.date.max,
				disabled: option?.settings?.range?.disabled ?? null,
				enabled: option?.settings?.range?.enabled ?? null,
			},
			selection: {
				day: option?.settings?.selection?.day ?? 'single',
				month: option?.settings?.selection?.month ?? true,
				year: option?.settings?.selection?.year ?? true,
				time: option?.settings?.selection?.time ?? false,
				controlTime: option?.settings?.selection?.controlTime ?? 'all',
				stepHours: option?.settings?.selection?.stepHours ?? 1,
				stepMinutes: option?.settings?.selection?.stepMinutes ?? 1,
			},
			selected: {
				dates: option?.settings?.selected?.dates ?? null,
				month: option?.settings?.selected?.month ?? null,
				year: option?.settings?.selected?.year ?? null,
				holidays: option?.settings?.selected?.holidays ?? null,
				time: option?.settings?.selected?.time ?? null,
			},
			visibility: {
				templateHeader: option?.settings?.visibility?.templateHeader ?? '%M %Y',
				monthShort: option?.settings?.visibility?.monthShort ?? true,
				weekNumbers: option?.settings?.visibility?.weekNumbers ?? false,
				weekend: option?.settings?.visibility?.weekend ?? true,
				today: option?.settings?.visibility?.today ?? true,
				disabled: option?.settings?.visibility?.disabled ?? false,
			},
		};
		this.locale = {
			months: option?.locale?.months ?? [],
			weekday: option?.locale?.weekday ?? [],
		};
		this.actions = {
			clickDay: option?.actions?.clickDay ?? null,
			clickMonth: option?.actions?.clickMonth ?? null,
			clickYear: option?.actions?.clickYear ?? null,
			changeTime: option?.actions?.changeTime ?? null,
		};
		this.popups = option?.popups ?? null;

		this.currentType = this.type;
		this.selectedKeeping = null;
		this.userTime = false;
	}

	update = () => updateCalendar(this);

	init = () => initCalendar(this);
}
