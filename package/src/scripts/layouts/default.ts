import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';
import header from './header';

const layoutDefault = (
  self: Calendar,
  type: 'month' | 'week' = 'month',
) => `${header(self, type)}  <div class="${escapeHTML(self.styles.wrapper)}" data-vc="wrapper">
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
