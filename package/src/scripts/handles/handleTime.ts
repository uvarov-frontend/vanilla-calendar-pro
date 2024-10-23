import transformTime12 from '@scripts/helpers/transformTime12';
import transformTime24 from '@scripts/helpers/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

type TypeTime = 'hour' | 'minute';

const addMouseEvents = (rangeEl: HTMLInputElement, inputEl: HTMLInputElement) => {
  rangeEl.addEventListener('mouseover', () => (inputEl.dataset.vcInputFocus = ''));
  rangeEl.addEventListener('mouseout', () => inputEl.removeAttribute('data-vc-input-focus'));
};

const setTime = (self: VanillaCalendar, e: Event, value: string, type: TypeTime) => {
  const typeMap = {
    hour: () => {
      self.selectedHours = value;
    },
    minute: () => {
      self.selectedMinutes = value;
    },
  };
  typeMap[type]();

  self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ''}`;

  if (self.actions.changeTime) self.actions.changeTime(e, self);
  if (self.input && self.HTMLInputElement && self.actions.changeToInput) self.actions.changeToInput(e, self);
};

const changeRange = (
  self: VanillaCalendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: TypeTime,
  max: number,
) => {
  rangeEl.addEventListener('input', (e) => {
    const value = Number(rangeEl.value);
    const valueStr = value < 10 ? `0${value}` : `${value}`;

    if (type !== 'hour' || max !== 12) {
      inputEl.value = valueStr;
      setTime(self, e, valueStr, type);
      return;
    }

    if (value < max && value > 0) {
      inputEl.value = valueStr;
      self.selectedKeeping = 'AM';
      if (keepingTimeEl) keepingTimeEl.innerText = self.selectedKeeping;
      setTime(self, e, valueStr, type);
    } else {
      if (value === 0) {
        self.selectedKeeping = 'AM';
        if (keepingTimeEl) keepingTimeEl.innerText = 'AM';
      } else {
        self.selectedKeeping = 'PM';
        if (keepingTimeEl) keepingTimeEl.innerText = 'PM';
      }
      inputEl.value = transformTime12(rangeEl.value);
      setTime(self, e, transformTime12(rangeEl.value), type);
    }
  });
};

const changeInput = (
  self: VanillaCalendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: TypeTime,
  max: number,
) => {
  inputEl.addEventListener('change', (e) => {
    const value = Number(inputEl.value);
    const valueStr = value < 10 ? `0${value}` : `${value}`;

    if (type === 'hour' && max === 12) {
      if (inputEl.value && value <= max && value > 0) {
        inputEl.value = valueStr;
        rangeEl.value = transformTime24(valueStr, self.selectedKeeping);
        setTime(self, e, valueStr, type);
      } else if (inputEl.value && value < 24 && (value > max || value === 0)) {
        if (value === 0) {
          self.selectedKeeping = 'AM';
          if (keepingTimeEl) keepingTimeEl.innerText = 'AM';
        } else {
          self.selectedKeeping = 'PM';
          if (keepingTimeEl) keepingTimeEl.innerText = 'PM';
        }
        inputEl.value = transformTime12(inputEl.value);
        rangeEl.value = valueStr;
        setTime(self, e, transformTime12(inputEl.value), type);
      } else {
        inputEl.value = self.selectedHours;
      }
    } else if (inputEl.value && value <= max && value >= 0) {
      inputEl.value = valueStr;
      rangeEl.value = valueStr;
      setTime(self, e, valueStr, type);
    } else if (type === 'hour') {
      inputEl.value = self.selectedHours;
    } else if (type === 'minute') {
      inputEl.value = self.selectedMinutes;
    }
  });
};

const clickKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement, rangeHourEl: HTMLInputElement) => {
  keepingTimeEl.addEventListener('click', (e) => {
    self.selectedKeeping = keepingTimeEl.innerText.includes('AM') ? 'PM' : 'AM';
    keepingTimeEl.innerText = self.selectedKeeping;
    rangeHourEl.value = transformTime24(self.selectedHours, self.selectedKeeping);
    setTime(self, e, self.selectedHours, 'hour');
  });
};

const handleTime = (self: VanillaCalendar, timeEl: HTMLElement, keepingTime: false | 12 | 24) => {
  const rangeHourEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-range="hour"] input[name="hour"]');
  const rangeMinuteEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-range="minute"] input[name="minute"]');
  const inputHourEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-input="hour"] input[name="hour"]');
  const inputMinuteEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-input="minute"] input[name="minute"]');
  const keepingTimeEl = timeEl.querySelector<HTMLButtonElement>('[data-vc-time="keeping"]');

  if (!rangeHourEl || !rangeMinuteEl || !inputHourEl || !inputMinuteEl) return;

  const maxTime = keepingTime === 24 ? 23 : keepingTime || 12;

  addMouseEvents(rangeHourEl, inputHourEl);
  addMouseEvents(rangeMinuteEl, inputMinuteEl);

  changeInput(self, rangeHourEl, inputHourEl, keepingTimeEl, 'hour', maxTime);
  changeInput(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, 'minute', 59);

  changeRange(self, rangeHourEl, inputHourEl, keepingTimeEl, 'hour', maxTime);
  changeRange(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, 'minute', 0);

  if (keepingTimeEl) clickKeepingTime(self, keepingTimeEl, rangeHourEl);
};

export default handleTime;
