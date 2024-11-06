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
  },
  layouts: {
    default: `
      <div class="vanilla-calendar-header">
        <#ArrowPrev />
        <div class="vanilla-calendar-header__content">
          <#Month />
          <#Year />
        </div>
        <#ArrowNext />
      </div>
      <div class="vanilla-calendar-wrapper">
        <#WeekNumbers />
        <div class="vanilla-calendar-content">
          <#Week />
          <#Days />
        </div>
      </div>
      <#ControlTime />
      <button id="btn-close" type="button">Close</button>
    `,
  },
};

const calendar = new Calendar('#calendar-input', options);
calendar.init();
