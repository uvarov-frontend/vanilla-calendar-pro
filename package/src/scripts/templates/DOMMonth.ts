import type VanillaCalendar from '@src/vanilla-calendar';

const DOMMonths = (self: VanillaCalendar) => `
  <div class="${self.CSSClasses.header}" data-vc="header" role="toolbar" aria-label="${self.locale.ariaLabels.navigation}">
    <div class="${self.CSSClasses.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${self.CSSClasses.wrapper}" data-vc="wrapper">
    <div class="${self.CSSClasses.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`;
export default DOMMonths;
