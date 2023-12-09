import { CSSClasses } from '@package/types';

const DOMMonths = (styles: CSSClasses) => (`
	<div class="${styles.header}">
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
	</div>
	<div class="${styles.wrapper}">
		<div class="${styles.content}">
			<#Months />
		</div>
	</div>
`);
export default DOMMonths;
