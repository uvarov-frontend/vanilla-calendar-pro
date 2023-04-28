import '@/package/src/styles/vanilla-calendar.css';
import '@/package/src/styles/themes/light.css';
import '@/package/src/styles/themes/dark.css';
import VanillaCalendar from '@/package/src/scripts/main';

document.addEventListener('DOMContentLoaded', () => {
	const calendar = new VanillaCalendar('#calendar');
	calendar.init();
});
