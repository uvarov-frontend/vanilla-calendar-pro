import setTime from '@scripts/handles/handleTime/setTime';
import transformTime12 from '@scripts/utils/transformTime12';
import transformTime24 from '@scripts/utils/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateInputAndRange = (inputEl: HTMLInputElement, rangeEl: HTMLInputElement, valueInput: string, valueRange: string) => {
  inputEl.value = valueInput;
  rangeEl.value = valueRange;
};

const updateKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement | null, keeping: string) => {
  if (!keepingTimeEl) return;
  self.selectedKeeping = keeping;
  keepingTimeEl.innerText = keeping;
};

const handleInput = (
  self: VanillaCalendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: 'hour' | 'minute',
  max: number,
  min: number,
) => {
  const handlers = {
    hour: (value: number, valueStr: string, event: Event) => {
      if (!self.settings.selection.time) return;

      const timeMap = {
        12: () => {
          const correctValue = Number(transformTime24(valueStr, self.selectedKeeping));
          const isCorrectValue = correctValue <= max && correctValue >= min;
          if (!isCorrectValue) return updateInputAndRange(inputEl, rangeEl, self.selectedHours, self.selectedHours);

          updateInputAndRange(inputEl, rangeEl, transformTime12(valueStr), transformTime24(valueStr, self.selectedKeeping));
          if (value > 12) updateKeepingTime(self, keepingTimeEl, 'PM');
          setTime(self, event, valueStr, type);
        },
        24: () => {
          const isCorrectValue = value <= max && value >= min;
          if (!isCorrectValue) return updateInputAndRange(inputEl, rangeEl, self.selectedHours, self.selectedHours);

          updateInputAndRange(inputEl, rangeEl, valueStr, valueStr);
          setTime(self, event, valueStr, type);
        },
      };
      timeMap[self.settings.selection.time]();
    },
    minute: (value: number, valueStr: string, event: Event) => {
      const isCorrectValue = value <= max && value >= min;
      if (!isCorrectValue) return (inputEl.value = self.selectedMinutes);

      inputEl.value = valueStr;
      rangeEl.value = valueStr;
      setTime(self, event, valueStr, type);
    },
  };

  const handleInputAction = (event: Event) => {
    const value = Number(inputEl.value);
    const valueStr = inputEl.value.padStart(2, '0');
    if (handlers[type]) handlers[type](value, valueStr, event);
  };

  inputEl.addEventListener('change', handleInputAction);

  return () => {
    inputEl.removeEventListener('change', handleInputAction);
  };
};

export default handleInput;
