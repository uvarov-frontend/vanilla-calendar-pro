import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const layoutYears = (self: Calendar) => `
  <div class="${escapeHTML(self.styles.header)}" data-vc="header" role="group" aria-label="${escapeHTML(self.labels.navigation)}">
    <#ArrowPrev [year] />
    <div class="${escapeHTML(self.styles.headerContent)}" data-vc-header="content" aria-live="polite" aria-atomic="true">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${escapeHTML(self.styles.wrapper)}" data-vc="wrapper">
    <div class="${escapeHTML(self.styles.content)}" data-vc="content">
      <#Years />
    </div>
  </div>
`;

export default layoutYears;
