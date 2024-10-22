import type { CSSClasses } from '@package/types';

const DOMMultiple = (styles: CSSClasses) => `
  <div class="${styles.controls}" data-vc="controls">
    <#ArrowPrev />
    <#ArrowNext />
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
