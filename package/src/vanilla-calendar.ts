import * as T from '@package/types';
import * as methods from '@scripts/methods';
import DefaultOptionsCalendar from '@scripts/default';
import messages from '@scripts/helpers/getMessages';

export default class VanillaCalendar extends DefaultOptionsCalendar implements T.IVanillaCalendar {
	private static memoizedElements: Map<string, HTMLElement> = new Map();

	constructor(selector: HTMLElement | string, options?: Partial<T.IOptions>) {
		super();

		this.HTMLElement = typeof selector === 'string'
			? (VanillaCalendar.memoizedElements.get(selector) ?? this.queryAndMemoize(selector))
			: selector;

		if (options) this.applyOptions(options);
	}

	private queryAndMemoize = (selector: string): HTMLElement => {
		const element = document.querySelector<HTMLElement>(selector);
		if (!element) throw new Error(messages.notFoundSelector(selector));

		VanillaCalendar.memoizedElements.set(selector, element);
		return element;
	};

	private applyOptions(options: Partial<T.IOptions>) {
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

	init = () => methods.init(this);

	update = (reset?: T.IReset) => methods.update(this, reset);

	destroy = () => methods.destroy(this);

	show = () => methods.show(this);

	hide = () => methods.hide(this);
}
