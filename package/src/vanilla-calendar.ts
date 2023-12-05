import * as T from '@package/types';
import DefaultOptionsCalendar from '@scripts/default';
import init from '@scripts/init';
import update from '@scripts/update';
import destroy from '@scripts/destroy';
import messages from '@scripts/helpers/getMessages';
import generateDate from '@scripts/helpers/generateDate';
import getDate from '@scripts/helpers/getDate';
import parseDates from '@scripts/helpers/parseDates';
import handleDayRangedSelection from '@scripts/handles/handleDayRangedSelection';
import createDays from '@scripts/methods/createDays';

export default class VanillaCalendar extends DefaultOptionsCalendar implements T.IVanillaCalendar {
	constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>) {
		super();

		this.HTMLElement = (typeof selector === 'string' ? document.querySelector(selector) : selector) as HTMLElement;

		if (!this.HTMLElement) throw new Error(messages.notFoundSelector(selector));

		if (!options) return;

		const replaceProperties = <T extends object>(original: T, replacement: T) => {
			(Object.keys(replacement) as Array<keyof T>).forEach((key) => {
				if (typeof original[key] === 'object' && typeof replacement[key] === 'object' && !(replacement[key] instanceof Date)) {
					replaceProperties(original[key] as object, replacement[key] as object);
				} else {
					original[key] = replacement[key];
				}
			});
		};
		replaceProperties(this, options);
	}

	methods = {
		forceSelectOnlyFirstDay: () => {
			this.selectedDates = this.selectedDates?.[0] ? [this.selectedDates[0]] : [];
			createDays(this);
			handleDayRangedSelection(this);
		},
	};

	utilities = {
		getDateString: (date: Date) => generateDate(date),
		getDate: (date: T.FormatDateString) => getDate(date),
		parseDates: (dates: string[]) => parseDates(dates),
	};

	init = () => init(this);

	update = (reset?: {
		year?: boolean;
		month?: boolean;
		dates?: boolean;
		holidays?: boolean;
		time?: boolean;
	}) => update(this, reset);

	destroy = () => destroy(this);
}
