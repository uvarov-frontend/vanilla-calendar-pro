import handleActions from '@scripts/handles/handleTime/handleActions';
import setContext from '@scripts/utils/setContext';
import transformTime12 from '@scripts/utils/transformTime12';
import transformTime24 from '@scripts/utils/transformTime24';
import type { Calendar, ContextVariables } from '@src/index';

const updateInputAndRange = (inputEl: HTMLInputElement, rangeEl: HTMLInputElement, valueInput: string, valueRange: string) => {
  inputEl.value = valueInput;
  rangeEl.value = valueRange;
};

const updateKeepingTime = (self: Calendar, keepingTimeEl: HTMLButtonElement | null, keeping: ContextVariables['selectedKeeping']) => {
  if (!keepingTimeEl || !keeping) return;
  setContext(self, 'selectedKeeping', keeping);
  keepingTimeEl.innerText = keeping;
};

const handleInput = (
  self: Calendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: 'hour' | 'minute',
  max: number,
  min: number,
) => {
  const handlers = {
    hour: (value: number, valueStr: string, event: Event) => {
      if (!self.selectionTimeMode) return;

      const timeMap = {
        12: () => {
          if (!self.context.selectedKeeping) return;
          const correctValue = Number(transformTime24(valueStr, self.context.selectedKeeping));
          if (!(correctValue <= max && correctValue >= min)) {
            updateInputAndRange(inputEl, rangeEl, self.context.selectedHours, self.context.selectedHours);
            if (self.onChangeTime) self.onChangeTime(self, event, true);
            return;
          }

          updateInputAndRange(inputEl, rangeEl, transformTime12(valueStr), transformTime24(valueStr, self.context.selectedKeeping));
          if (value > 12) updateKeepingTime(self, keepingTimeEl, 'PM');
          handleActions(self, event, transformTime12(valueStr), type);
        },
        24: () => {
          if (!(value <= max && value >= min)) {
            updateInputAndRange(inputEl, rangeEl, self.context.selectedHours, self.context.selectedHours);
            if (self.onChangeTime) self.onChangeTime(self, event, true);
            return;
          }

          updateInputAndRange(inputEl, rangeEl, valueStr, valueStr);
          handleActions(self, event, valueStr, type);
        },
      };
      timeMap[self.selectionTimeMode]();
    },
    minute: (value: number, valueStr: string, event: Event) => {
      if (!(value <= max && value >= min)) {
        inputEl.value = self.context.selectedMinutes;
        if (self.onChangeTime) self.onChangeTime(self, event, true);
        return;
      }

      inputEl.value = valueStr;
      rangeEl.value = valueStr;
      handleActions(self, event, valueStr, type);
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
