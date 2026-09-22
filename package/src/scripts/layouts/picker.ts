import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';
import header from './header';

const layoutPicker = (
  self: Calendar,
  type: 'Months' | 'Years',
) => `${header(self, type === 'Years' ? 'year' : undefined)}  <div class="${escapeHTML(self.styles.wrapper)}" data-vc="wrapper">
    <div class="${escapeHTML(self.styles.content)}" data-vc="content">
      <#${type} />
    </div>
  </div>
`;
export default layoutPicker;
