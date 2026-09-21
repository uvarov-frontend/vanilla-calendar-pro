import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const ControlTime = (self: Calendar) =>
  self.selectionTimeMode
    ? `<div class="${escapeHTML(self.styles.time)}" data-vc="time" role="group" aria-label="${escapeHTML(self.labels.selectingTime)}"></div>`
    : '';

export default ControlTime;
