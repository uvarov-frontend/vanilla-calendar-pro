import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const layoutMonths = (self: Calendar) => `
  <div class="${escapeHTML(self.styles.header)}" data-vc="header" role="group" aria-label="${escapeHTML(self.labels.navigation)}">
    <div class="${escapeHTML(self.styles.headerContent)}" data-vc-header="content" aria-live="polite" aria-atomic="true">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${escapeHTML(self.styles.wrapper)}" data-vc="wrapper">
    <div class="${escapeHTML(self.styles.content)}" data-vc="content">
      <#Months />
    </div>
  </div>
`;
export default layoutMonths;
