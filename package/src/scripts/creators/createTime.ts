import handleTime from '@scripts/handles/handleTime';
import transformTime24 from '@scripts/helpers/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

export const InputTime = (name: string, CSSClass: string, value: string, range: boolean) => `
  <label class="${CSSClass}" data-vc-time-input="${name}">
    <input type="text" name="${name}" maxlength="2" value="${value}" ${range ? 'disabled' : ''}>
  </label>
`;

export const RangeTime = (name: string, CSSClass: string, min: number, max: number, step: number, value: string) => `
  <label class="${CSSClass}" data-vc-time-range="${name}">
    <input type="range" name="${name}" min="${min}" max="${max}" step="${step}" value="${value}">
  </label>
`;

const createTime = (self: VanillaCalendar) => {
  const timeEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc="time"]');
  if (!timeEl) return;

  const [minHour, maxHour] = [0, 23];
  const [minMinutes, maxMinutes] = [0, 59];

  const valueHours = self.selectedKeeping ? transformTime24(self.selectedHours, self.selectedKeeping) : self.selectedHours;
  const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
  const range = self.settings.selection.controlTime === 'range';

  timeEl.innerHTML = self.sanitizer(`
    <div class="${self.CSSClasses.timeContent}" data-vc-time="content">
      ${InputTime('hour', self.CSSClasses.timeHour, self.selectedHours, range)}
      ${InputTime('minute', self.CSSClasses.timeMinute, self.selectedMinutes, range)}
      ${keepingTime === 12 ? `<button type="button" class="${self.CSSClasses.timeKeeping}" data-vc-time="keeping" ${range ? 'disabled' : ''}>${self.selectedKeeping}</button>` : ''}
    </div>
    <div class="${self.CSSClasses.timeRanges}" data-vc-time="ranges">
      ${RangeTime('hour', self.CSSClasses.timeRange, minHour, maxHour, self.settings.selection.stepHours, valueHours)}
      ${RangeTime('minute', self.CSSClasses.timeRange, minMinutes, maxMinutes, self.settings.selection.stepMinutes, self.selectedMinutes)}
    </div>
  `);

  handleTime(self, timeEl, keepingTime);
};

export default createTime;
