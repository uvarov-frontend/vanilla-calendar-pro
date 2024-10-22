import type { CSSClasses } from '@package/types';

const DOMDefault = (styles: CSSClasses) => `
  <div class="${styles.header}" data-vc="header">
    <#ArrowPrev />
    <div class="${styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext />
  </div>
  <div class="${styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${styles.content}" data-vc="content">
      <#Week />
      <#Dates />
    </div>
  </div>
  <#ControlTime />
`;

export default DOMDefault;
