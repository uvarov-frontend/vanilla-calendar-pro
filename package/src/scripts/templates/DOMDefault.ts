import { ICSSClasses } from 'src/types';

const DOMDefault = (styles: ICSSClasses) => (`
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
