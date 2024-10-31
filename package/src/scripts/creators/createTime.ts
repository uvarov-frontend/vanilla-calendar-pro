import TimeInput from '@scripts/components/TimeInput';
import TimeRange from '@scripts/components/TimeRange';
import handleTime from '@scripts/handles/handleTime/handleTime';
import transformTime24 from '@scripts/utils/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

const createTime = (self: VanillaCalendar) => {
  const timeEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc="time"]');
  if (!self.settings.selection.time || !timeEl) return;

  const [minHour, maxHour] = [self.settings.range.hourMin, self.settings.range.hourMax];
  const [minMinutes, maxMinutes] = [self.settings.range.minuteMin, self.settings.range.minuteMax];

  const valueHours = self.private.selectedKeeping ? transformTime24(self.private.selectedHours, self.private.selectedKeeping) : self.private.selectedHours;
  const range = self.settings.selection.controlTime === 'range';

  timeEl.innerHTML = self.sanitizerHTML(`
    <div class="${self.styles.timeContent}" data-vc-time="content">
      ${TimeInput('hour', self.styles.timeHour, self.labels as unknown as { [key: string]: string }, valueHours, range)}
      ${TimeInput('minute', self.styles.timeMinute, self.labels as unknown as { [key: string]: string }, self.private.selectedMinutes, range)}
      ${
        self.settings.selection.time === 12
          ? `<button type="button" class="${self.styles.timeKeeping}" aria-label="${self.labels.btnKeeping} ${self.private.selectedKeeping}" data-vc-time="keeping" ${range ? 'disabled' : ''}>${self.private.selectedKeeping}</button>`
          : ''
      }
    </div>
    <div class="${self.styles.timeRanges}" data-vc-time="ranges">
      ${TimeRange('hour', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minHour, maxHour, self.settings.selection.stepHours, valueHours)}
      ${TimeRange('minute', self.styles.timeRange, self.labels as unknown as { [key: string]: string }, minMinutes, maxMinutes, self.settings.selection.stepMinutes, self.private.selectedMinutes)}
    </div>
  `);

  handleTime(self, timeEl);
};

export default createTime;
