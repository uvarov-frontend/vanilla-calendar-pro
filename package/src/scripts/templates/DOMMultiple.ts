import type VanillaCalendar from '@src/vanilla-calendar';

const DOMMultiple = (self: VanillaCalendar) => `
  <div class="${self.CSSClasses.controls}" data-vc="controls" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${self.CSSClasses.grid}" data-vc="grid">
    <#Multiple>
      <div class="${self.CSSClasses.column}" data-vc="column" role="region">
        <div class="${self.CSSClasses.header}" data-vc="header">
          <div class="${self.CSSClasses.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${self.CSSClasses.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${self.CSSClasses.content}" data-vc="content">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
  </div>
  <#ControlTime />
`;

export default DOMMultiple;
