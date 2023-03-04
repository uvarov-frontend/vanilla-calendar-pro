/* eslint-disable import/no-import-module-exports */
import VanillaCalendar from './scripts/main';
import './styles/vanilla-calendar.css';

if (typeof window !== 'undefined') {
	(window as { VanillaCalendar?: object }).VanillaCalendar = VanillaCalendar;
}
if (typeof exports === 'object' && typeof module === 'object') {
	module.exports = VanillaCalendar;
}
