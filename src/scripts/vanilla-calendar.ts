import {
	IOptions,
	IDate,
	ISettings,
	ILocale,
	IActions,
	IPopups,
	ICSSClasses,
	IDOMTemplates,
} from 'src/types';
import updateCalendar from './methods/updateCalendar';
import initCalendar from './methods/initCalendar';
import DOMDefault from './templates/DOMDefault';
import DOMMonth from './templates/DOMMonth';
import DOMYear from './templates/DOMYear';
import classes from '../classes';

export default class VanillaCalendar<T extends (HTMLElement | string), R extends IOptions> {
	HTMLElement: HTMLElement | null;

	type!: string;

	date!: IDate;

	settings!: ISettings;

	locale!: ILocale;

	actions!: IActions;

	popups!: IPopups | null;

	CSSClasses!: ICSSClasses;

	DOMTemplates!: IDOMTemplates;

	currentType!: string;

	selectedKeeping!: null;

	userTime!: boolean;

	constructor(selector: T, option?: R) {
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
				min: option?.settings?.range?.min ?? '1970-01-01',
				max: option?.settings?.range?.max ?? '2470-12-31',
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
			clickArrow: option?.actions?.clickArrow ?? null,
			changeTime: option?.actions?.changeTime ?? null,
		};
		this.popups = option?.popups ?? null;
		this.CSSClasses = (() => {
			const classesObj = { ...classes };
			(Object.keys(classes) as Array<keyof typeof classes>).forEach((className) => {
				if (option?.CSSClasses?.[className]) {
					classesObj[className] = option.CSSClasses[className];
				} else {
					classesObj[className] = classes[className];
				}
			});
			return classesObj;
		})();
		this.DOMTemplates = {
			default: option?.DOMTemplates?.default ?? DOMDefault(this.CSSClasses),
			month: option?.DOMTemplates?.month ?? DOMMonth(this.CSSClasses),
			year: option?.DOMTemplates?.year ?? DOMYear(this.CSSClasses),
		};
		this.currentType = this.type;
		this.selectedKeeping = null;
		this.userTime = false;
	}

	update = () => updateCalendar(this);

	init = () => initCalendar(this);
}
