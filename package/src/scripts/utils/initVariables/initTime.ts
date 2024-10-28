import messages from '@scripts/utils/getMessages';
import transformTime12 from '@scripts/utils/transformTime12';
import type VanillaCalendar from '@src/vanilla-calendar';

const initTime = (self: VanillaCalendar) => {
  if (!self.settings.selection.time) return;

  if (![12, 24].includes(self.settings.selection.time)) throw new Error(messages.incorrectTime);

  const isTime12 = self.settings.selection.time === 12;
  const timeRegex = isTime12 ? /^([1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

  let [hours, minutes, keeping] = self.settings.selected.time?.match(timeRegex)?.slice(1) ?? [];

  if (!hours) {
    hours = isTime12 ? transformTime12(String(self.settings.range.hourMin)) : String(self.settings.range.hourMin);
    minutes = String(self.settings.range.minuteMin);
    keeping = isTime12 && Number(self.settings.range.hourMin) >= 12 ? 'PM' : 'AM';
  } else if (isTime12 && !keeping) {
    keeping = 'AM';
  }

  self.selectedHours = hours.padStart(2, '0');
  self.selectedMinutes = minutes.padStart(2, '0');
  self.selectedKeeping = keeping;
  self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${keeping ? ` ${keeping}` : ''}`;
};

export default initTime;
