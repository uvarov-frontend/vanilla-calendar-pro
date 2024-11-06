import type { Calendar } from '@src/index';

const layoutMultiple = (self: Calendar) => `
  <div class="${self.styles.controls}" data-vc="controls" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${self.styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${self.styles.column}" data-vc="column" role="region">
        <div class="${self.styles.header}" data-vc="header">
          <div class="${self.styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${self.styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${self.styles.content}" data-vc="content">
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
