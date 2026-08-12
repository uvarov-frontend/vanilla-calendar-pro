import { Calendar, type Options } from '@src/index';
import calendarStyles from '@src/styles/index.css?inline';

class ShadowCalendarInput extends HTMLElement {
  calendar?: Calendar;

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `${calendarStyles} input { padding: 8px; font-size: 14px; }`;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <label>
        <div>Calendar inside Shadow DOM (${this.id})</div>
        <input type="text" readonly data-vc-shadow-input />
      </label>
      <button type="button" data-vc-shadow-init>Init</button>
      <button type="button" data-vc-shadow-destroy>Destroy</button>
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
    style.textContent = calendarStyles;
    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div>Plain calendar inside Shadow DOM (${this.id})</div>
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
