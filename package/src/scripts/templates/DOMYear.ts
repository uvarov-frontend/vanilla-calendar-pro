import type { CSSClasses } from '@package/types';

const DOMYears = (styles: CSSClasses) => `
  <div class="${styles.header}" data-vc="header">
    <#ArrowPrev />
    <div class="${styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext />
  </div>
  <div class="${styles.wrapper}" data-vc="wrapper">
    <div class="${styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`;

export default DOMYears;
