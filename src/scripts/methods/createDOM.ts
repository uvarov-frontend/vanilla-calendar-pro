import { IVanillaCalendar } from 'src/types';

const createDefault = (self: IVanillaCalendar, calendarElement: HTMLElement) => {
	calendarElement.classList.add(self.styleClass.calendar);
	calendarElement.classList.add(self.styleClass.calendarDefault);
	calendarElement.classList.remove(self.styleClass.calendarMonth);
	calendarElement.classList.remove(self.styleClass.calendarYear);
	calendarElement.innerHTML = `
		<div class="${self.styleClass.header}">
			<button type="button"
				class="${self.styleClass.arrow} ${self.styleClass.arrowPrev}"
				data-calendar-arrow="prev"
				title="Prev">
			</button>
			<div class="${self.styleClass.headerContent}"></div>
			<button type="button"
				class="${self.styleClass.arrow} ${self.styleClass.arrowNext}"
				data-calendar-arrow="next"
				title="Next">
			</button>
		</div>
		${self.settings.visibility.weekNumbers ? `
		<div class="${self.styleClass.weekNumbers}">
			<b class="${self.styleClass.weekNumbersTitle}">#</b>
			<div class="${self.styleClass.weekNumbersContent}"></div>
		</div>
		` : ''}
		<div class="${self.styleClass.content}">
			<div class="${self.styleClass.week}"></div>
			<div class="${self.styleClass.days}"></div>
		</div>
		${self.settings.selection.time ? `
		<div class="${self.styleClass.time}"></div>
		` : ''}`;
};

const createMonth = (self: IVanillaCalendar, calendarElement: HTMLElement) => {
	calendarElement.classList.add(self.styleClass.calendar);
	calendarElement.classList.remove(self.styleClass.calendarDefault);
	calendarElement.classList.add(self.styleClass.calendarMonth);
	calendarElement.classList.remove(self.styleClass.calendarYear);
	calendarElement.innerHTML = `
	<div class="${self.styleClass.header}">
		<div class="${self.styleClass.headerContent}"></div>
	</div>
	<div class="${self.styleClass.content}">
		<div class="${self.styleClass.months}"></div>
	</div>`;
};

const createYear = (self: IVanillaCalendar, calendarElement: HTMLElement) => {
	calendarElement.classList.add(self.styleClass.calendar);
	calendarElement.classList.remove(self.styleClass.calendarDefault);
	calendarElement.classList.remove(self.styleClass.calendarMonth);
	calendarElement.classList.add(self.styleClass.calendarYear);
	calendarElement.innerHTML = `
	<div class="${self.styleClass.header}">
		<button type="button"
			class="${self.styleClass.arrow} ${self.styleClass.arrowPrev}"
			title="prev">
		</button>
		<div class="${self.styleClass.headerContent}"></div>
		<button type="button"
			class="${self.styleClass.arrow} ${self.styleClass.arrowNext}"
			title="next">
		</button>
	</div>
	<div class="${self.styleClass.content}">
		<div class="${self.styleClass.years}"></div>
	</div>`;
};

const createDOM = (self: IVanillaCalendar) => {
	const calendarElement = (self.HTMLElement as HTMLElement);

	switch (self.currentType) {
		case 'month':
			createMonth(self, calendarElement);
			break;
		case 'year':
			createYear(self, calendarElement);
			break;
		default:
			createDefault(self, calendarElement);
			break;
	}
};

export default createDOM;
