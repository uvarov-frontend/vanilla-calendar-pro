import { CSSClasses } from '@package/types';

const DOMYears = (styles: CSSClasses) => (`
	<div class="${styles.header}">
		<#ArrowPrev />
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
		<#ArrowNext />
	</div>
	<div class="${styles.wrapper}">
		<div class="${styles.content}">
			<#Years />
		</div>
	</div>
`);

export default DOMYears;
