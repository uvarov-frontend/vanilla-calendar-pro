import { ICSSClasses } from 'src/types';

const DOMYears = (styles: ICSSClasses) => (`
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
