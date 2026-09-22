import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const header = (self: Calendar, type?: 'month' | 'year' | 'week') => `
  <div class="${escapeHTML(self.styles.header)}" data-vc="header" role="group" aria-label="${escapeHTML(self.labels.navigation)}">
${type ? `    <#ArrowPrev [${type}] />\n` : ''}    <div class="${escapeHTML(self.styles.headerContent)}" data-vc-header="content" aria-live="polite" aria-atomic="true">
      <#Month />
      <#Year />
    </div>
${type ? `    <#ArrowNext [${type}] />\n` : ''}  </div>
`;
export default header;
