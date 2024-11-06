import TimeInput from '@scripts/components/TimeInput';
import TimeRange from '@scripts/components/TimeRange';
import handleTime from '@scripts/handles/handleTime/handleTime';
import transformTime24 from '@scripts/utils/transformTime24';
import type { Calendar, ContextVariables } from '@src/index';

const createTime = (self: Calendar) => {
  const timeEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="time"]');
  if (!self.selectionTimeMode || !timeEl) return;

  const [minHour, maxHour] = [self.timeMinHour, self.timeMaxHour];
  const [minMinutes, maxMinutes] = [self.timeMinMinute, self.timeMaxMinute];

  const valueHours = self.context.selectedKeeping ? transformTime24(self.context.selectedHours, self.context.selectedKeeping) : self.context.selectedHours;
  const range = self.timeControls === 'range';

  const btnKeeping = (selectedKeeping: ContextVariables['selectedKeeping']) =>
    `<button type="button" class="${self.styles.timeKeeping}" aria-label="${self.labels.btnKeeping} ${selectedKeeping}" data-vc-time="keeping" ${range ? 'disabled' : ''}>${selectedKeeping}</button>`;

  timeEl.innerHTML = self.sanitizerHTML(`
    <div class="${self.styles.timeContent}" data-vc-time="content">
      ${TimeInput('hour', self.styles.timeHour, self.labels as unknown as { [key: string]: string }, self.context.selectedHours, range)}
      ${TimeInput('minute', self.styles.timeMinute, self.labels as unknown as { [key: string]: string }, self.context.selectedMinutes, range)}
      ${self.selectionTimeMode === 12 ? btnKeeping(self.context.selectedKeeping) : ''}
    </div>
    <div class="${self.styles.timeRanges}" data-vc-time="ranges">
      ${TimeRange('hour', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minHour, maxHour, self.timeStepHour, valueHours)}
      ${TimeRange('minute', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minMinutes, maxMinutes, self.timeStepMinute, self.context.selectedMinutes)}
    </div>
  `);

  handleTime(self, timeEl);
};

export default createTime;
