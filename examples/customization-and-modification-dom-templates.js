import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';
import '@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/light.min.css';
import '@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css';

const options = {
  DOMTemplates: {
    default: `
      <div class="vanilla-calendar-header">
        <div class="vanilla-calendar-header__content">
          <#Year /> | <#Month />
        </div>
        <#ArrowPrev />
        <#ArrowNext />
      </div>
      <div class="vanilla-calendar-wrapper">
        <div class="vanilla-calendar-content">
          <#Week />
          <#Days />
        </div>
      </div>
      <button type="button">I am a button</button>
    `,
  },
};

const calendar = new VanillaCalendar('#calendar', options);
calendar.init();
