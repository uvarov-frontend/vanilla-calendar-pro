import '../../workbench';

import { Calendar, type Options } from '@src/index';
import calendarStyles from '@src/styles/index.css?inline';
import controlStyles from './controls.css?inline';

class ShadowCalendarInput extends HTMLElement {
  calendar?: Calendar;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `${calendarStyles} ${controlStyles}`;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.className = 'shadow-controls';
    wrapper.innerHTML = `
      <label>
        Date
        <input type="text" readonly placeholder="Choose a date" data-vc-shadow-input />
      </label>
      <div class="shadow-actions">
        <button type="button" data-vc-shadow-init>Initialize</button>
        <button type="button" data-vc-shadow-destroy>Destroy</button>
      </div>
    `;
    shadow.appendChild(wrapper);

    const initCalendar = () => {
      if (this.calendar) return; // init() is one-shot per instance - build a fresh instance instead of reusing a destroyed one

      // re-query rather than reuse a closed-over reference: destroy() replaces the input with
      // a clone, so a stale reference from a previous init() would point at a detached node
      const inputEl = shadow.querySelector('[data-vc-shadow-input]') as HTMLInputElement;

      const options: Options = {
        inputMode: true,
        positionToInput: 'auto',
        selectedTheme: 'system',
        onChangeToInput: (self) => {
          inputEl.value = self.context.selectedDates[0] ?? '';
        },
      };

      this.calendar = new Calendar(inputEl, options);
      this.calendar.init();
    };

    initCalendar();

    shadow.querySelector('[data-vc-shadow-init]')?.addEventListener('click', initCalendar);
    shadow.querySelector('[data-vc-shadow-destroy]')?.addEventListener('click', () => {
      this.calendar?.destroy();
      this.calendar = undefined;
    });
  }

  disconnectedCallback() {
    this.calendar?.destroy();
  }
}

customElements.define('shadow-calendar-input', ShadowCalendarInput);

// a plain (non-inputMode) calendar rendered directly into the shadow root: it never creates a
// popup, so none of the root-awareness fixes above are even exercised - included to demonstrate
// that this case already worked with zero changes.
class ShadowCalendarPlain extends HTMLElement {
  calendar?: Calendar;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `${calendarStyles} ${controlStyles}`;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div data-vc-shadow-plain></div>
    `;
    shadow.appendChild(wrapper);

    const targetEl = shadow.querySelector('[data-vc-shadow-plain]') as HTMLElement;
    const options: Options = { selectedTheme: 'system' };

    this.calendar = new Calendar(targetEl, options);
    this.calendar.init();
  }

  disconnectedCallback() {
    this.calendar?.destroy();
  }
}

customElements.define('shadow-calendar-plain', ShadowCalendarPlain);

// Gestures inside a shadow root: the pointer listeners live on the calendar element, but the
// move/up pair is bound to window, so both have to survive crossing the shadow boundary.
const gestureOptions: Options = {
  animation: true,
  enableCollapse: true,
  enableSwipe: true,
  selectedTheme: 'system',
  selectedDates: ['2023-04-19'],
  selectedMonth: 3,
  selectedYear: 2023,
};

class ShadowCalendarGesturesInput extends HTMLElement {
  calendar?: Calendar;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `${calendarStyles} ${controlStyles}`;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.className = 'shadow-controls';
    wrapper.innerHTML = `
      <label>
        Date
        <input type="text" readonly placeholder="Choose a date" data-vc-shadow-input>
      </label>
    `;
    shadow.appendChild(wrapper);

    const inputEl = shadow.querySelector('[data-vc-shadow-input]') as HTMLInputElement;

    this.calendar = new Calendar(inputEl, {
      ...gestureOptions,
      inputMode: true,
      positionToInput: 'auto',
      onChangeToInput: (self) => {
        inputEl.value = self.context.selectedDates[0] ?? '';
      },
    });
    this.calendar.init();
  }

  disconnectedCallback() {
    this.calendar?.destroy();
  }
}

customElements.define('shadow-calendar-gestures-input', ShadowCalendarGesturesInput);

class ShadowCalendarGesturesPlain extends HTMLElement {
  calendar?: Calendar;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `${calendarStyles} ${controlStyles}`;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div data-vc-shadow-plain></div>
    `;
    shadow.appendChild(wrapper);

    this.calendar = new Calendar(shadow.querySelector('[data-vc-shadow-plain]') as HTMLElement, gestureOptions);
    this.calendar.init();
  }

  disconnectedCallback() {
    this.calendar?.destroy();
  }
}

customElements.define('shadow-calendar-gestures-plain', ShadowCalendarGesturesPlain);
