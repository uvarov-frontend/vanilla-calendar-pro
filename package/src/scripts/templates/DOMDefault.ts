import type { CSSClasses } from '@package/types';
import messages from '@scripts/helpers/getMessages';

const DOMDefault = (styles: CSSClasses) => `
  <div class="${styles.header}" data-vc="header" role="toolbar" aria-label="${messages.ariaLabels.navigation}">
    <#ArrowPrev [month] />
    <div class="${styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
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
