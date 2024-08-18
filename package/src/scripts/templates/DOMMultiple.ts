import { CSSClasses } from '@package/types';

const DOMMultiple = (styles: CSSClasses) => (`
	<div class="${styles.controls}">
		<#ArrowPrev [month] />
		<#ArrowNext [month] />
	</div>
	<div class="${styles.grid}">
		<#Multiple>
			<div class="${styles.column}">
				<div class="${styles.header}">
					<div class="${styles.headerContent}">
						<#Month [month] />
						<#Year [month] />
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
