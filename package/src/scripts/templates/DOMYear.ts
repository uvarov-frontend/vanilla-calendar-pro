import type VanillaCalendar from '@src/vanilla-calendar';

const DOMYears = (self: VanillaCalendar) => `
  <div class="${self.CSSClasses.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${self.CSSClasses.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${self.CSSClasses.wrapper}" data-vc="wrapper">
    <div class="${self.CSSClasses.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`;

export default DOMYears;
