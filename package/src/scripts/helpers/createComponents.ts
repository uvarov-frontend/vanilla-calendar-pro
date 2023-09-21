import { IVanillaCalendar } from '../../types';

export const ArrowPrev = (self: IVanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowPrev}"
		data-calendar-arrow="prev"
		title="Prev">
	</button>
`);

export const ArrowNext = (self: IVanillaCalendar) => (`
	<button type="button"
	class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowNext}"
	data-calendar-arrow="next"
	title="Next">
	</button>
`);

export const Month = (self: IVanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.month}"
		data-calendar-selected-month>
	</button>
`);

export const Year = (self: IVanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.year}"
		data-calendar-selected-year>
	</button>
`);

export const Switch = (self: IVanillaCalendar) => (`
	<div class="${self.CSSClasses.switch}">
		<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
		</svg>
	</div>
`);

export const Week = (self: IVanillaCalendar) => (`
	<div class="${self.CSSClasses.week}"></div>
`);

export const Days = (self: IVanillaCalendar) => (`
	<div class="${self.CSSClasses.days}"></div>
`);

export const Months = (self: IVanillaCalendar) => (`
	<div class="${self.CSSClasses.months}"></div>
`);

export const Years = (self: IVanillaCalendar) => (`
	<div class="${self.CSSClasses.years}"></div>
`);

export const WeekNumbers = (self: IVanillaCalendar) => (self.settings.visibility.weekNumbers ? (`
	<div class="${self.CSSClasses.weekNumbers}"></div>
`) : '');

export const ControlTime = (self: IVanillaCalendar) => (self.settings.selection.time ? (`
	<div class="${self.CSSClasses.time}"></div>
`) : '');
