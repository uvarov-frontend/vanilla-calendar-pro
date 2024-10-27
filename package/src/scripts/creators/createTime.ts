import handleTime from '@scripts/handles/handleTime';
import transformTime24 from '@scripts/helpers/transformTime24';
import type VanillaCalendar from '@src/vanilla-calendar';

export const InputTime = (name: string, CSSClass: string, ariaLabels: { [key: string]: string }, value: string, range: boolean) => `
  <label class="${CSSClass}" data-vc-time-input="${name}">
    <input type="text" name="${name}" maxlength="2" aria-label="${ariaLabels[`input${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}" ${range ? 'disabled' : ''}>
  </label>
`;

export const RangeTime = (name: string, CSSClass: string, ariaLabels: { [key: string]: string }, min: number, max: number, step: number, value: string) => `
  <label class="${CSSClass}" data-vc-time-range="${name}">
    <input type="range" name="${name}" min="${min}" max="${max}" step="${step}" aria-label="${ariaLabels[`range${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}">
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
      ${InputTime('hour', self.CSSClasses.timeHour, self.locale.ariaLabels as unknown as { [key: string]: string }, self.selectedHours, range)}
      ${InputTime('minute', self.CSSClasses.timeMinute, self.locale.ariaLabels as unknown as { [key: string]: string }, self.selectedMinutes, range)}
      ${
        keepingTime === 12
          ? `<button type="button" class="${self.CSSClasses.timeKeeping}" aria-label="${self.locale.ariaLabels.btnKeeping} ${self.selectedKeeping}" data-vc-time="keeping" ${range ? 'disabled' : ''}>${self.selectedKeeping}</button>`
          : ''
      }
    </div>
    <div class="${self.CSSClasses.timeRanges}" data-vc-time="ranges">
      ${RangeTime('hour', self.CSSClasses.timeRange, self.locale.ariaLabels as unknown as { [key: string]: string }, minHour, maxHour, self.settings.selection.stepHours, valueHours)}
      ${RangeTime('minute', self.CSSClasses.timeRange, self.locale.ariaLabels as unknown as { [key: string]: string }, minMinutes, maxMinutes, self.settings.selection.stepMinutes, self.selectedMinutes)}
    </div>
  `);

  handleTime(self, timeEl, keepingTime);
};

export default createTime;
