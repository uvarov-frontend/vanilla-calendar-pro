import { CSSClasses } from '@package/types';

const DOMDefault = (styles: CSSClasses) => (`
	<div class="${styles.header}">
		<#ArrowPrev />
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
		<#ArrowNext />
	</div>
	<div class="${styles.wrapper}">
		<#WeekNumbers />
		<div class="${styles.content}">
			<#Week />
			<#Days />
		</div>
	</div>
	<#ControlTime />
`);

export default DOMDefault;
