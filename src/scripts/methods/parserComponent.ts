import { IVanillaCalendar } from 'src/types';
import getComponent from './getComponent';

const DOMParser = (self: IVanillaCalendar, template: string) => (
	template.replace(/<#(.*?)\/>/g, (_, p1) => {
		const component = getComponent(p1.replace(/[\s\n\t]/g, ''));
		return component ? component(self) : '';
	})
).replace(/[\n\t]/g, '');

export default DOMParser;
