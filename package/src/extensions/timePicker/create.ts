import escapeHTML from '@scripts/utils/escapeHTML';
import handleTime from '@src/extensions/timePicker/handles/handleTime';
import TimeInput from '@src/extensions/timePicker/TimeInput';
import TimeRange from '@src/extensions/timePicker/TimeRange';
import transformTime24 from '@src/extensions/timePicker/transformTime24';
import type { Calendar, ContextVariables } from '@src/index';

const cleanups = new WeakMap<Calendar, () => void>();

export const cleanupTime = (self: Calendar) => {
  cleanups.get(self)?.();
  cleanups.delete(self);
};

const createTime = (self: Calendar) => {
  cleanupTime(self);
  const timeEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="time"]');
  if (!self.selectionTimeMode || !timeEl) return;

  const [minHour, maxHour] = [self.timeMinHour, self.timeMaxHour];
  const [minMinutes, maxMinutes] = [self.timeMinMinute, self.timeMaxMinute];

  const valueHours = self.context.selectedKeeping ? transformTime24(self.context.selectedHours, self.context.selectedKeeping) : self.context.selectedHours;
  const range = self.timeControls === 'range';

  const btnKeeping = (selectedKeeping: ContextVariables['selectedKeeping']) =>
    `<button type="button" class="${escapeHTML(self.styles.timeKeeping)}" aria-label="${escapeHTML(self.labels.btnKeeping)} ${escapeHTML(selectedKeeping)}" data-vc-time="keeping" ${range ? 'disabled' : ''}>${escapeHTML(selectedKeeping)}</button>`;

  timeEl.innerHTML = self.sanitizerHTML(`
    <div class="${escapeHTML(self.styles.timeContent)}" data-vc-time="content">
      ${TimeInput('hour', self.styles.timeHour, self.labels as unknown as { [key: string]: string }, self.context.selectedHours, range)}
      ${TimeInput('minute', self.styles.timeMinute, self.labels as unknown as { [key: string]: string }, self.context.selectedMinutes, range)}
      ${self.selectionTimeMode === 12 ? btnKeeping(self.context.selectedKeeping) : ''}
    </div>
    <div class="${escapeHTML(self.styles.timeRanges)}" data-vc-time="ranges">
      ${TimeRange('hour', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minHour, maxHour, self.timeStepHour, valueHours)}
      ${TimeRange('minute', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minMinutes, maxMinutes, self.timeStepMinute, self.context.selectedMinutes)}
    </div>
  `);

  const cleanup = handleTime(self, timeEl);
  if (cleanup) cleanups.set(self, cleanup);
};

export default createTime;
