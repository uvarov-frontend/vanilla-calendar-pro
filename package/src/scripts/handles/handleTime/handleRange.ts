import setTime from '@scripts/handles/handleTime/setTime';
import transformTime12 from '@scripts/utils/transformTime12';
import type VanillaCalendar from '@src/vanilla-calendar';

const updateKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement | null, keeping: string) => {
  self.selectedKeeping = keeping;
  if (keepingTimeEl) keepingTimeEl.innerText = keeping;
};

const updateInputAndTime = (self: VanillaCalendar, inputEl: HTMLInputElement, value: string, event: Event, type: 'hour' | 'minute') => {
  inputEl.value = value;
  setTime(self, event, value, type);
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
    const isHourType = type === 'hour' || max === 12;
    const ifTime = value < max && value > 0;

    updateInputAndTime(self, inputEl, isHourType || ifTime ? valueStr : transformTime12(rangeEl.value), event, type);
    if (isHourType) updateKeepingTime(self, keepingTimeEl, value === 0 ? 'AM' : value < max ? 'AM' : 'PM');
  };

  rangeEl.addEventListener('input', handleRangeAction);

  return () => {
    rangeEl.removeEventListener('input', handleRangeAction);
  };
};

export default handleRange;
