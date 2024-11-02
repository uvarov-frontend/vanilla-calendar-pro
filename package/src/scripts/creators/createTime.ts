import TimeInput from '@scripts/components/TimeInput';
import TimeRange from '@scripts/components/TimeRange';
import handleTime from '@scripts/handles/handleTime/handleTime';
import transformTime24 from '@scripts/utils/transformTime24';
import type { PrivateVariables, VanillaCalendarPro } from '@src/index';

const createTime = (self: VanillaCalendarPro) => {
  const timeEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc="time"]');
  if (!self.selectionTimeMode || !timeEl) return;

  const [minHour, maxHour] = [self.timeMinHour, self.timeMaxHour];
  const [minMinutes, maxMinutes] = [self.timeMinMinute, self.timeMaxMinute];

  const valueHours = self.private.selectedKeeping ? transformTime24(self.private.selectedHours, self.private.selectedKeeping) : self.private.selectedHours;
  const range = self.timeControls === 'range';

  const btnKeeping = (selectedKeeping: PrivateVariables['selectedKeeping']) =>
    `<button type="button" class="${self.styles.timeKeeping}" aria-label="${self.labels.btnKeeping} ${selectedKeeping}" data-vc-time="keeping" ${range ? 'disabled' : ''}>${selectedKeeping}</button>`;

  timeEl.innerHTML = self.sanitizerHTML(`
    <div class="${self.styles.timeContent}" data-vc-time="content">
      ${TimeInput('hour', self.styles.timeHour, self.labels as unknown as { [key: string]: string }, self.private.selectedHours, range)}
      ${TimeInput('minute', self.styles.timeMinute, self.labels as unknown as { [key: string]: string }, self.private.selectedMinutes, range)}
      ${self.selectionTimeMode === 12 ? btnKeeping(self.private.selectedKeeping) : ''}
    </div>
    <div class="${self.styles.timeRanges}" data-vc-time="ranges">
      ${TimeRange('hour', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minHour, maxHour, self.timeStepHour, valueHours)}
      ${TimeRange('minute', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minMinutes, maxMinutes, self.timeStepMinute, self.private.selectedMinutes)}
    </div>
  `);

  handleTime(self, timeEl);
};

export default createTime;
