import errorMessages from '@scripts/utils/getErrorMessages';
import setContext from '@scripts/utils/setContext';
import transformTime12 from '@scripts/utils/transformTime12';
import type { Calendar } from '@src/index';

const initTime = (self: Calendar) => {
  if (!self.selectionTimeMode) return;

  if (![12, 24].includes(self.selectionTimeMode)) throw new Error(errorMessages.incorrectTime);

  const isTime12 = self.selectionTimeMode === 12;
  const timeRegex = isTime12 ? /^(0[1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

  let [hours, minutes, keeping]: string[] | null[] = self.selectedTime?.match(timeRegex)?.slice(1) ?? [];

  if (!hours) {
    hours = isTime12 ? transformTime12(String(self.timeMinHour)) : String(self.timeMinHour);
    minutes = String(self.timeMinMinute);
    keeping = isTime12 ? (Number(transformTime12(String(self.timeMinHour))) >= 12 ? 'PM' : 'AM') : null;
  } else if (isTime12 && !keeping) {
    keeping = 'AM';
  }

  setContext(self, 'selectedHours', hours.padStart(2, '0'));
  setContext(self, 'selectedMinutes', minutes.padStart(2, '0'));
  setContext(self, 'selectedKeeping', keeping as 'AM' | 'PM' | null);
  setContext(self, 'selectedTime', `${self.context.selectedHours}:${self.context.selectedMinutes}${keeping ? ` ${keeping}` : ''}`);
};

export default initTime;
