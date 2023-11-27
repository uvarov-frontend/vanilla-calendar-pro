import * as T from '@src/types';
import DefaultOptionsCalendar from '@scripts/default';
import reset from '@scripts/reset';
import update from '@scripts/update';
import init from '@scripts/init';
import destroy from '@scripts/destroy';

export interface IOptions {
	input?: boolean;
	type?: T.TypesCalendar;
	months?: number;
	jumpMonths?: number;
	date?: Partial<T.IDate>;
	settings?: Partial<{
		lang: string;
		iso8601: boolean;
		range: Partial<T.IRange>;
		selection: Partial<T.ISelection>;
		selected: Partial<T.ISelected>;
		visibility: Partial<T.IVisibility>;
	}>;
	locale?: Partial<T.ILocale>;
	actions?: Partial<T.IActions>;
	popups?: T.IPopups;
	CSSClasses?: Partial<T.ICSSClasses>;
	DOMTemplates?: Partial<T.IDOMTemplates>;
}

export default class VanillaCalendar extends DefaultOptionsCalendar implements T.IVanillaCalendar {
	constructor(selector: HTMLElement | string, options?: Partial<IOptions>) {
		super();

		this.HTMLElement = (typeof selector === 'string' ? document.querySelector(selector) : selector) as HTMLElement;
		if (!this.HTMLElement) throw new Error(`${selector} is not found, check the first argument passed to new VanillaCalendar.`);
		if (!options) return;

		this.settings.range.min = options?.settings?.range?.min ?? this.date.min;
		this.settings.range.max = options?.settings?.range?.max ?? this.date.max;

		const replaceProperties = <T extends object>(original: T, replacement: T) => {
			(Object.keys(replacement) as Array<keyof T>).forEach((key) => {
				if (typeof original[key] === 'object' && typeof replacement[key] === 'object') {
					replaceProperties(original[key] as object, replacement[key] as object);
				} else {
					original[key] = replacement[key];
				}
			});
		};

		replaceProperties(this, options);
	}

	reset = () => reset(this);

	update = () => update(this);

	init = () => init(this);

	destroy = () => destroy(this);
}
