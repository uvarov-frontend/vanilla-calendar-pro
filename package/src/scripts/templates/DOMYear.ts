import { CSSClasses } from '@package/types';

const DOMYears = (styles: CSSClasses) => (`
	<div class="${styles.header}">
		<#ArrowPrev [year] />
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
		<#ArrowNext [year] />
	</div>
	<div class="${styles.wrapper}">
		<div class="${styles.content}">
			<#Years />
		</div>
	</div>
`);

export default DOMYears;
