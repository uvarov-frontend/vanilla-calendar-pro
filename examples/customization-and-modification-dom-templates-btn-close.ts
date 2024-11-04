import { type Options, VanillaCalendarPro } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  isInput: true,
  onChangeToInput(self) {
    if (!self.private.inputElement) return;
    if (self.private.selectedDates[0]) {
      self.private.inputElement.value = self.private.selectedDates[0];
    } else {
      self.private.inputElement.value = '';
    }
  },
  onInit(self) {
    const btnEl = self.private.mainElement.querySelector('#btn-close');
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

const calendar = new VanillaCalendarPro('#calendar-input', options);
calendar.init();
