import type { CSSClasses } from '@package/types';
import messages from '@scripts/helpers/getMessages';

const DOMMonths = (styles: CSSClasses) => `
  <div class="${styles.header}" data-vc="header" role="toolbar" aria-label="${messages.ariaLabels.navigation}">
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
