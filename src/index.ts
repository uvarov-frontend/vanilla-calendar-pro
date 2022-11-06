import VanillaCalendar from './scripts/vanilla-calendar';
import './styles/vanilla-calendar.scss';

(window as { VanillaCalendar?: object }).VanillaCalendar = VanillaCalendar;
export default VanillaCalendar;
