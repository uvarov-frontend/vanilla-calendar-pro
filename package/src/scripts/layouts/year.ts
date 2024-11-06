import type { Calendar } from '@src/index';

const layoutYears = (self: Calendar) => `
  <div class="${self.styles.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${self.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${self.styles.wrapper}" data-vc="wrapper">
    <div class="${self.styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`;

export default layoutYears;
