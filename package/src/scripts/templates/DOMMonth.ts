import { ICSSClasses } from 'src/types';

const DOMMonths = (styles: ICSSClasses) => (`
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
