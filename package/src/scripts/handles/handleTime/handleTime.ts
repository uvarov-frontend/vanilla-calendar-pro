import handleClickKeepingTime from '@scripts/handles/handleTime/handleClickKeepingTime';
import handleInput from '@scripts/handles/handleTime/handleInput';
import handleRange from '@scripts/handles/handleTime/handleRange';
import type VanillaCalendar from '@src/vanilla-calendar';

const addMouseEvents = (rangeEl: HTMLInputElement, inputEl: HTMLInputElement) => {
  rangeEl.addEventListener('mouseover', () => (inputEl.dataset.vcInputFocus = ''));
  rangeEl.addEventListener('mouseout', () => inputEl.removeAttribute('data-vc-input-focus'));
};

const handleTime = (self: VanillaCalendar, timeEl: HTMLElement) => {
  const rangeHourEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-range="hour"] input[name="hour"]');
  const rangeMinuteEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-range="minute"] input[name="minute"]');
  const inputHourEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-input="hour"] input[name="hour"]');
  const inputMinuteEl = timeEl.querySelector<HTMLInputElement>('[data-vc-time-input="minute"] input[name="minute"]');
  const keepingTimeEl = timeEl.querySelector<HTMLButtonElement>('[data-vc-time="keeping"]');

  if (!rangeHourEl || !rangeMinuteEl || !inputHourEl || !inputMinuteEl) return;

  const maxTime = self.settings.selection.time === 24 ? 23 : self.settings.selection.time || 12;

  addMouseEvents(rangeHourEl, inputHourEl);
  addMouseEvents(rangeMinuteEl, inputMinuteEl);

  handleInput(self, rangeHourEl, inputHourEl, keepingTimeEl, 'hour', maxTime);
  handleInput(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, 'minute', 59);

  handleRange(self, rangeHourEl, inputHourEl, keepingTimeEl, 'hour', maxTime);
  handleRange(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, 'minute', 0);

  if (keepingTimeEl) handleClickKeepingTime(self, keepingTimeEl, rangeHourEl);
};

export default handleTime;
