import VanillaCalendar from 'vanilla-calendar-pro';
import type { IOptions } from 'vanilla-calendar-pro/types';

import 'vanilla-calendar-pro/build/vanilla-calendar.min.css';

const options: IOptions = {
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
