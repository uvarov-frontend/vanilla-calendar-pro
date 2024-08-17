import type VanillaCalendar from '@src/vanilla-calendar';
import * as T from '@package/types';

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {
	const isObject = (item: any) => (item && typeof item === 'object' && !Array.isArray(item));

	if (!sources.length) return target;
	const source = sources.shift();

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key: any) => {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		});
	}

	return mergeDeep(target, ...sources);
}

export function changeSetting<S extends keyof T.IPartialSettings, K extends T.IPartialSettings[S]>(self: VanillaCalendar, option: S, value: K) {
	self.settings = mergeDeep(self.settings, { [option]: value }) as T.ISettings;
}
