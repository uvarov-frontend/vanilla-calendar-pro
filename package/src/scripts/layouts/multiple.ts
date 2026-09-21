import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const layoutMultiple = (self: Calendar) => `
  <div class="${escapeHTML(self.styles.controls)}" data-vc="controls" role="group" aria-label="${escapeHTML(self.labels.navigation)}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${escapeHTML(self.styles.grid)}" data-vc="grid">
    <#Multiple>
      <div class="${escapeHTML(self.styles.column)}" data-vc="column" role="group">
        <div class="${escapeHTML(self.styles.header)}" data-vc="header">
          <div class="${escapeHTML(self.styles.headerContent)}" data-vc-header="content" aria-live="polite" aria-atomic="true">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${escapeHTML(self.styles.wrapper)}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${escapeHTML(self.styles.content)}" data-vc="content" role="grid">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
    <#DateRangeTooltip />
  </div>
  <#ControlTime />
`;

export default layoutMultiple;
