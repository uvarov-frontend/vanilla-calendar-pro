/* eslint-disable import/no-import-module-exports */
import VanillaCalendar from './scripts/vanilla-calendar';
import './styles/vanilla-calendar.scss';

if (typeof window !== 'undefined') {
	(window as { VanillaCalendar?: object }).VanillaCalendar = VanillaCalendar;
}
if (typeof exports === 'object' && typeof module === 'object') {
	module.exports = VanillaCalendar;
}
