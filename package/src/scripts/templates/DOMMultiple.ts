import { ICSSClasses } from '../../types';

const DOMMultiple = (styles: ICSSClasses) => (`
	<div class="${styles.controls}">
		<#ArrowPrev />
		<#ArrowNext />
	</div>
	<div class="${styles.grid}">
		<#Multiple>
			<div class="${styles.column}">
				<div class="${styles.header}">
					<div class="${styles.headerContent}">
						<#Month />
						<#Year />
					</div>
				</div>
				<div class="${styles.wrapper}">
					<#WeekNumbers />
					<div class="${styles.content}">
						<#Week />
						<#Days />
					</div>
				</div>
			</div>
		<#/Multiple>
	</div>
	<#ControlTime />
`);

export default DOMMultiple;
