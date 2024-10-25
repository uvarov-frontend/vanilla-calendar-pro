import type { CSSClasses } from '@package/types';
import messages from '@scripts/helpers/getMessages';

const DOMYears = (styles: CSSClasses) => `
  <div class="${styles.header}" data-vc="header" role="toolbar" aria-label="${messages.ariaLabels.navigation}">
    <#ArrowPrev [year] />
    <div class="${styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${styles.wrapper}" data-vc="wrapper">
    <div class="${styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`;

export default DOMYears;
