import handleActions from '@scripts/handles/handleTime/handleActions';
import transformTime24 from '@scripts/utils/transformTime24';
import type { VanillaCalendar } from '@src/vanilla-calendar';

const handleClickKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement, rangeHourEl: HTMLInputElement, max: number, min: number) => {
  const handleClickKeepingTimeAction = (event: Event) => {
    const newSelectedKeeping = self.private.selectedKeeping === 'AM' ? 'PM' : 'AM';
    const hour = transformTime24(self.private.selectedHours, newSelectedKeeping);

    if (!(Number(hour) <= max && Number(hour) >= min)) {
      if (self.onChangeTime) self.onChangeTime(event, self, true);
      return;
    }

    self.private.selectedKeeping = newSelectedKeeping;
    rangeHourEl.value = hour;

    handleActions(self, event, self.private.selectedHours, 'hour');

    keepingTimeEl.ariaLabel = `${self.labels.btnKeeping} ${self.private.selectedKeeping}`;
    keepingTimeEl.innerText = self.private.selectedKeeping;
  };

  keepingTimeEl.addEventListener('click', handleClickKeepingTimeAction);

  return () => {
    keepingTimeEl.removeEventListener('click', handleClickKeepingTimeAction);
  };
};

export default handleClickKeepingTime;
