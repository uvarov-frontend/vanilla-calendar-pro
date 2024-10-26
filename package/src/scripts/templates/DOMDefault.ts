import type VanillaCalendar from '@src/vanilla-calendar';

const DOMDefault = (self: VanillaCalendar) => `
  <div class="${self.CSSClasses.header}" data-vc="header" role="toolbar" aria-label="${self.locale.ariaLabels.navigation}">
    <#ArrowPrev [month] />
    <div class="${self.CSSClasses.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${self.CSSClasses.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${self.CSSClasses.content}" data-vc="content">
      <#Week />
      <#Dates />
    </div>
  </div>
  <#ControlTime />
`;

export default DOMDefault;
