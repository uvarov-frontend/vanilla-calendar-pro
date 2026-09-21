import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const layoutDefault = (self: Calendar) => `
  <div class="${escapeHTML(self.styles.header)}" data-vc="header" role="group" aria-label="${escapeHTML(self.labels.navigation)}">
    <#ArrowPrev [month] />
    <div class="${escapeHTML(self.styles.headerContent)}" data-vc-header="content" aria-live="polite" aria-atomic="true">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${escapeHTML(self.styles.wrapper)}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${escapeHTML(self.styles.content)}" data-vc="content" role="grid">
      <#Week />
      <#Dates />
      <#DateRangeTooltip />
    </div>
  </div>
  <#Collapse />
  <#ControlTime />
`;

export default layoutDefault;
