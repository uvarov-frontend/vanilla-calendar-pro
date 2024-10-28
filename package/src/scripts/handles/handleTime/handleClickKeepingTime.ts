import setTime from '@scripts/handles/handleTime/setTime';
import transformTime24 from '@scripts/helpers/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleClickKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement, rangeHourEl: HTMLInputElement) => {
  keepingTimeEl.addEventListener('click', (e) => {
    self.selectedKeeping = keepingTimeEl.innerText.includes('AM') ? 'PM' : 'AM';
    keepingTimeEl.ariaLabel = `${self.locale.ariaLabels.btnKeeping} ${self.selectedKeeping}`;
    keepingTimeEl.innerText = self.selectedKeeping;
    rangeHourEl.value = transformTime24(self.selectedHours, self.selectedKeeping);
    setTime(self, e, self.selectedHours, 'hour');
  });
};

export default handleClickKeepingTime;
