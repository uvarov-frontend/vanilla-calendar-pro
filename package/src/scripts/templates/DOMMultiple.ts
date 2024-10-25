import type { CSSClasses } from '@package/types';
import messages from '@scripts/helpers/getMessages';

const DOMMultiple = (styles: CSSClasses) => `
  <div class="${styles.controls}" data-vc="controls" role="toolbar" aria-label="${messages.ariaLabels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${styles.column}" data-vc="column">
        <div class="${styles.header}" data-vc="header">
          <div class="${styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${styles.content}" data-vc="content">
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
