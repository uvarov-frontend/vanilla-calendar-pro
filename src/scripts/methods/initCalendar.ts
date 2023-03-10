import { IVanillaCalendar } from 'src/types';
import updateCalendar from './updateCalendar';
import setTheme from './setTheme';
import clickCalendar from './clickCalendar';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	updateCalendar(self);
	setTheme(self);
	clickCalendar(self);
};

export default initCalendar;
