import * as T from './types';

export default class VanillaCalendar {
	constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>);

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
