import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  layouts: {
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

const calendar = new Calendar('#calendar', options);
calendar.init();
