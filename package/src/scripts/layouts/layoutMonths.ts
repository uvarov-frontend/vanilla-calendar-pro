import type { Calendar } from '@src/index';

const layoutMonths = (self: Calendar) => `
  <div class="${self.styles.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <div class="${self.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${self.styles.wrapper}" data-vc="wrapper">
    <div class="${self.styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`;
export default layoutMonths;
