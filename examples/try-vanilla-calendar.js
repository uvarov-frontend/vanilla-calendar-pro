// JS Script
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';

// Basic styles
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';

// Additional styles
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const calendar = new VanillaCalendar('#calendar');
calendar.init();
