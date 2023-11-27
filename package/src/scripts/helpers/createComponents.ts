import VanillaCalendar from '@src/vanilla-calendar';

export const ArrowPrev = (self: VanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowPrev}"
		data-calendar-arrow="prev">
	</button>
`);

export const ArrowNext = (self: VanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowNext}"
		data-calendar-arrow="next">
	</button>
`);

export const Month = (self: VanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.month}"
		data-calendar-selected-month>
	</button>
`);

export const Year = (self: VanillaCalendar) => (`
	<button type="button"
		class="${self.CSSClasses.year}"
		data-calendar-selected-year>
	</button>
`);

export const Week = (self: VanillaCalendar) => (`
	<div class="${self.CSSClasses.week}"></div>
`);

export const Days = (self: VanillaCalendar) => (`
	<div class="${self.CSSClasses.days}"></div>
`);

export const Months = (self: VanillaCalendar) => (`
	<div class="${self.CSSClasses.months}"></div>
`);

export const Years = (self: VanillaCalendar) => (`
	<div class="${self.CSSClasses.years}"></div>
`);

export const WeekNumbers = (self: VanillaCalendar) => (self.settings.visibility.weekNumbers ? (`
	<div class="${self.CSSClasses.weekNumbers}"></div>
`) : '');

export const ControlTime = (self: VanillaCalendar) => (self.settings.selection.time ? (`
	<div class="${self.CSSClasses.time}"></div>
`) : '');
