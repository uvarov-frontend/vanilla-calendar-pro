import updateCalendar from './updateCalendar';
import clickCalendar from './clickCalendar';
import { IVanillaCalendar } from '../types';

const initCalendar = (self: IVanillaCalendar) => {
	if (!self.HTMLElement) return;
	updateCalendar(self);
	clickCalendar(self);
};

export default initCalendar;
