import handleClickKeepingTime from '@scripts/handles/handleTime/handleClickKeepingTime';
import handleInput from '@scripts/handles/handleTime/handleInput';
import handleRange from '@scripts/handles/handleTime/handleRange';
import type { Calendar } from '@src/index';

const handleMouseOver = (inputEl: HTMLInputElement) => inputEl.setAttribute('data-vc-input-focus', '');

const handleMouseOut = (inputEl: HTMLInputElement) => inputEl.removeAttribute('data-vc-input-focus');

const handleTime = (self: Calendar, timeEl: HTMLElement) => {
  const rangeHourEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-range="hour"] input[name="hour"]');
  const rangeMinuteEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-range="minute"] input[name="minute"]');
  const inputHourEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-input="hour"] input[name="hour"]');
  const inputMinuteEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-input="minute"] input[name="minute"]');
  const keepingTimeEl = timeEl.querySelector<HTMLButtonElement>('[data-vc-time="keeping"]');

  if (!rangeHourEl || !rangeMinuteEl || !inputHourEl || !inputMinuteEl) return;

  const handleMouseOverEvent = (event: MouseEvent) => {
    if (event.target === rangeHourEl) handleMouseOver(inputHourEl);
    if (event.target === rangeMinuteEl) handleMouseOver(inputMinuteEl);
  };

  const handleMouseOutEvent = (event: MouseEvent) => {
    if (event.target === rangeHourEl) handleMouseOut(inputHourEl);
    if (event.target === rangeMinuteEl) handleMouseOut(inputMinuteEl);
  };

  timeEl.addEventListener('mouseover', handleMouseOverEvent);
  timeEl.addEventListener('mouseout', handleMouseOutEvent);

  handleInput(self, rangeHourEl, inputHourEl, keepingTimeEl, 'hour', self.timeMaxHour, self.timeMinHour);
  handleInput(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, 'minute', self.timeMaxMinute, self.timeMinMinute);

  handleRange(self, rangeHourEl, inputHourEl, keepingTimeEl, 'hour');
  handleRange(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, 'minute');

  if (keepingTimeEl) handleClickKeepingTime(self, keepingTimeEl, rangeHourEl, self.timeMaxHour, self.timeMinHour);

  return () => {
    timeEl.removeEventListener('mouseover', handleMouseOverEvent);
    timeEl.removeEventListener('mouseout', handleMouseOutEvent);
  };
};

export default handleTime;
