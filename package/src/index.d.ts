import * as T from './types';

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

export default class VanillaCalendar {
	constructor(selector: HTMLElement | string, options?: Partial<IOptions>);

	input: boolean;
	type: T.TypesCalendar;
	months: number;
	jumpMonths: number;
	date: T.IDate;
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
	popups: T.IPopups;
	CSSClasses: T.ICSSClasses;
	DOMTemplates: T.IDOMTemplates;

	reset: () => void;
	update: () => void;
	init: () => void;
	destroy: () => void;
}
