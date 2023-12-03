import * as T from '@package/types';
import DefaultOptionsCalendar from '@scripts/default';
import reset from '@scripts/reset';
import update from '@scripts/update';
import init from '@scripts/init';
import destroy from '@scripts/destroy';
import messages from '@scripts/helpers/getMessages';

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

	reset = () => reset(this);

	update = () => update(this);

	init = () => init(this);

	destroy = () => destroy(this);
}
