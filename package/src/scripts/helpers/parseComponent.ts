import VanillaCalendar from '@src/vanilla-calendar';
import getComponent from '@scripts/helpers/getComponent';

export const DOMParser = (self: VanillaCalendar, template: string) => (
	template.replace(/[\n\t]/g, '').replace(/<#(?!\/?Multiple)(.*?)>/g, (_, p1) => {
		const [__, comp, attribute] = /(.*)\s?\[(.*)\].*/g.exec(p1) || [];
		const component = getComponent((comp || p1).replace(/[/\s\n\t]/g, ''));
		const html = component ? component(self, attribute) : '';
		return self.sanitizer(html);
	})
).replace(/[\n\t]/g, '');

export const MultipleParser = (self: VanillaCalendar, template: string) => (
	template.replace(/<#Multiple>(.*?)<#\/Multiple>/g, (_, p1) => {
		let content = '';
		for (let i = 0; i < (self.correctMonths as number); i++) {
			content += p1;
		}
		return self.sanitizer(content);
	})
).replace(/[\n\t]/g, '');
