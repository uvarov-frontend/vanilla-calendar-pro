import setTime from '@scripts/handles/handleTime/setTime';
import transformTime12 from '@scripts/helpers/transformTime12';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleRange = (
  self: VanillaCalendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: 'hour' | 'minute',
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

export default handleRange;
