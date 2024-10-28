import setTime from '@scripts/handles/handleTime/setTime';
import transformTime12 from '@scripts/utils/transformTime12';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateInputAndTime = (self: VanillaCalendar, inputEl: HTMLInputElement, value: string, event: Event, type: 'hour' | 'minute') => {
  inputEl.value = value;
  setTime(self, event, value, type);
};

const updateKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement | null, keeping: string) => {
  if (!keepingTimeEl) return;
  self.selectedKeeping = keeping;
  keepingTimeEl.innerText = keeping;
};

const handleRange = (
  self: VanillaCalendar,
  rangeEl: HTMLInputElement,
  inputEl: HTMLInputElement,
  keepingTimeEl: HTMLButtonElement | null,
  type: 'hour' | 'minute',
  max: number,
) => {
  const handleRangeAction = (event: Event) => {
    const value = Number(rangeEl.value);
    const valueStr = rangeEl.value.padStart(2, '0');
    const isNotHourType = type !== 'hour' || max !== 12;
    const correctTime = value < max && value > 0;

    updateInputAndTime(self, inputEl, isNotHourType || correctTime ? valueStr : transformTime12(rangeEl.value), event, type);
    if (!isNotHourType) updateKeepingTime(self, keepingTimeEl, value === 0 || correctTime ? 'AM' : 'PM');
  };

  rangeEl.addEventListener('input', handleRangeAction);

  return () => {
    rangeEl.removeEventListener('input', handleRangeAction);
  };
};

export default handleRange;
