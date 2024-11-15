import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  layouts: {
    default: `
      <div class="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
        <div class="vc-header__content" data-vc-header="content">
          <#Year /> | <#Month />
        </div>
        <#ArrowPrev />
        <#ArrowNext />
      </div>
      <div class="vc-wrapper" data-vc="wrapper">
        <#WeekNumbers />
        <div class="vc-content" data-vc="content">
          <#Week />
          <#Dates />
          <#DateRangeTooltip />
        </div>
      </div>
      <#ControlTime />
      <button type="button">I am a button</button>
    `,
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
