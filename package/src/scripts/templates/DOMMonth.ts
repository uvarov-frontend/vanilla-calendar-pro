import type { CSSClasses } from '@package/types';

const DOMMonths = (styles: CSSClasses) => `
  <div class="${styles.header}" data-vc="header">
    <div class="${styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${styles.wrapper}" data-vc="wrapper">
    <div class="${styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`;
export default DOMMonths;
