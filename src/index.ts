import { IWindow } from './scripts/types';
import VanillaCalendar from './scripts/vanilla-calendar';
import './styles/vanilla-calendar.scss';

(window as IWindow).VanillaCalendar = VanillaCalendar;
export default VanillaCalendar;
