import { IVanillaCalendar } from 'src/types';
import updateCalendar from './updateCalendar';
import clickCalendar from './clickCalendar';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	updateCalendar(self);
	clickCalendar(self);
};

export default initCalendar;
