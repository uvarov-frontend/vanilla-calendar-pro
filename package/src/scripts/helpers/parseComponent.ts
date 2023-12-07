import VanillaCalendar from '@src/vanilla-calendar';
import getComponent from '@scripts/helpers/getComponent';

export const DOMParser = (self: VanillaCalendar, template: string) => (
	template.replace(/[\n\t]/g, '').replace(/<#(?!\/?Multiple)(.*?)>/g, (_, p1) => {
		const component = getComponent(p1.replace(/[/\s\n\t]/g, ''));
		return component ? component(self) : '';
	})
).replace(/[\n\t]/g, '');

export const MultipleParser = (self: VanillaCalendar, template: string) => (
	template.replace(/<#Multiple>(.*?)<#\/Multiple>/g, (_, p1) => {
		let content = '';
		for (let i = 0; i < (self.correctMonths as number); i++) {
			content += p1;
		}
		return content;
	})
).replace(/[\n\t]/g, '');
