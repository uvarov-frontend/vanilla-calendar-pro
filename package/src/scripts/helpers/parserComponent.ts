import { IVanillaCalendar } from '../../types';
import getComponent from './getComponent';

export const DOMParser = (self: IVanillaCalendar, template: string) => (
	template.replace(/<#(.*?)\/>/g, (_, p1) => {
		const component = getComponent(p1.replace(/[\s\n\t]/g, ''));
		return component ? component(self) : '';
	})
).replace(/[\n\t]/g, '');

export const MultipleParser = (self: IVanillaCalendar, template: string) => (
	template.replace(/<#Multiple>(.*?)<#\/Multiple>/g, (_, p1) => {
		let content = '';
		for (let i = 0; i < (self.correctMonths as number); i++) {
			content += p1;
		}
		return content;
	})
).replace(/[\n\t]/g, '');
