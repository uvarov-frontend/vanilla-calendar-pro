import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  inputMode: true,
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.value = self.context.selectedDates[0];
    } else {
      self.context.inputElement.value = '';
    }
  },
  onInit(self) {
    const btnEl = self.context.mainElement.querySelector('#btn-close');
    if (!btnEl) return;
    btnEl.addEventListener('click', self.hide);
    return () => btnEl.removeEventListener('click', self.hide);
  },
  layouts: {
    default: `
      <div class="vc-header" data-vc="header" role="toolbar" aria-label="Calendar Navigation">
        <#ArrowPrev />
        <div class="vc-header__content" data-vc-header="content">
          <#Month />
          <#Year />
        </div>
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
      <button id="btn-close" type="button">Close</button>
    `,
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
