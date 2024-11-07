import handleActions from '@scripts/handles/handleTime/handleActions';
import setContext from '@scripts/utils/setContext';
import transformTime12 from '@scripts/utils/transformTime12';
import type { Calendar } from '@src/index';

const updateInputAndTime = (self: Calendar, inputEl: HTMLInputElement, event: Event, type: 'hour' | 'minute', value: string) => {
  inputEl.value = value;
  handleActions(self, event, value, type);
};

const updateKeepingTime = (self: Calendar, keepingTimeEl: HTMLButtonElement | null, keeping: 'AM' | 'PM') => {
  if (!keepingTimeEl) return;
  setContext(self, 'selectedKeeping', keeping);
  keepingTimeEl.innerText = keeping;
};

const handleRange = (
  self: Calendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: 'hour' | 'minute',
) => {
  const handleRangeAction = (event: Event) => {
    const value = Number(rangeEl.value);
    const valueStr = rangeEl.value.padStart(2, '0');

    const isHourType = type === 'hour';
    const isFormat24 = self.selectionTimeMode === 24;
    const isAM = value > 0 && value < 12;

    if (isHourType && !isFormat24) updateKeepingTime(self, keepingTimeEl, value === 0 || isAM ? 'AM' : 'PM');
    updateInputAndTime(self, inputEl, event, type, isHourType && !isFormat24 && !isAM ? transformTime12(rangeEl.value) : valueStr);
  };

  rangeEl.addEventListener('input', handleRangeAction);

  return () => {
    rangeEl.removeEventListener('input', handleRangeAction);
  };
};

export default handleRange;
