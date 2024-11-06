import type { Calendar } from '@src/index';

const layoutDefault = (self: Calendar) => `
  <div class="${self.styles.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [month] />
    <div class="${self.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${self.styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${self.styles.content}" data-vc="content">
      <#Week />
      <#Dates />
      <#DateRangeTooltip />
    </div>
  </div>
  <#ControlTime />
`;

export default layoutDefault;
