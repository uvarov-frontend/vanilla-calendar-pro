import handleActions from '@scripts/handles/handleTime/handleActions';
import transformTime24 from '@scripts/utils/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleClickKeepingTime = (self: VanillaCalendar, keepingTimeEl: HTMLButtonElement, rangeHourEl: HTMLInputElement, max: number, min: number) => {
  const handleClickKeepingTimeAction = (event: Event) => {
    const newSelectedKeeping = self.selectedKeeping === 'AM' ? 'PM' : 'AM';
    const hour = transformTime24(self.selectedHours, newSelectedKeeping);

    if (!(Number(hour) <= max && Number(hour) >= min)) {
      if (self.actions.changeTime) self.actions.changeTime(event, self, true);
      return;
    }

    self.selectedKeeping = newSelectedKeeping;
    rangeHourEl.value = hour;

    handleActions(self, event, self.selectedHours, 'hour');

    keepingTimeEl.ariaLabel = `${self.labels.btnKeeping} ${self.selectedKeeping}`;
    keepingTimeEl.innerText = self.selectedKeeping;
  };

  keepingTimeEl.addEventListener('click', handleClickKeepingTimeAction);

  return () => {
    keepingTimeEl.removeEventListener('click', handleClickKeepingTimeAction);
  };
};

export default handleClickKeepingTime;
