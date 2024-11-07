import handleActions from '@scripts/handles/handleTime/handleActions';
import setContext from '@scripts/utils/setContext';
import transformTime24 from '@scripts/utils/transformTime24';
import type { Calendar } from '@src/index';

const handleClickKeepingTime = (self: Calendar, keepingTimeEl: HTMLButtonElement, rangeHourEl: HTMLInputElement, max: number, min: number) => {
  const handleClickKeepingTimeAction = (event: Event) => {
    const newSelectedKeeping = self.context.selectedKeeping === 'AM' ? 'PM' : 'AM';
    const hour = transformTime24(self.context.selectedHours, newSelectedKeeping);

    if (!(Number(hour) <= max && Number(hour) >= min)) {
      if (self.onChangeTime) self.onChangeTime(self, event, true);
      return;
    }

    setContext(self, 'selectedKeeping', newSelectedKeeping);
    rangeHourEl.value = hour;

    handleActions(self, event, self.context.selectedHours, 'hour');

    keepingTimeEl.ariaLabel = `${self.labels.btnKeeping} ${self.context.selectedKeeping}`;
    keepingTimeEl.innerText = self.context.selectedKeeping as string;
  };

  keepingTimeEl.addEventListener('click', handleClickKeepingTimeAction);

  return () => {
    keepingTimeEl.removeEventListener('click', handleClickKeepingTimeAction);
  };
};

export default handleClickKeepingTime;
