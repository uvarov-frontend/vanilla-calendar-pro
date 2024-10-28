import setTime from '@scripts/handles/handleTime/setTime';
import transformTime12 from '@scripts/utils/transformTime12';
import transformTime24 from '@scripts/utils/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleInput = (
  self: VanillaCalendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: 'hour' | 'minute',
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

export default handleInput;
