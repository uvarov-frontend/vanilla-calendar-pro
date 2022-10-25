import { IVanillaCalendar } from 'src/types';

const createDOM = (self: IVanillaCalendar) => {
	const calendarElement = (self.HTMLElement as HTMLElement);

	if (self.currentType === 'default') {
		calendarElement.classList.add('vanilla-calendar_default');
		calendarElement.classList.remove('vanilla-calendar_month');
		calendarElement.classList.remove('vanilla-calendar_year');
		calendarElement.innerHTML = `
		<div class="vanilla-calendar-header">
			<button type="button"
				class="vanilla-calendar-arrow vanilla-calendar-arrow_prev"
				data-calendar-arrow="prev"
				title="Prev">
			</button>
			<div class="vanilla-calendar-header__content"></div>
			<button type="button"
				class="vanilla-calendar-arrow vanilla-calendar-arrow_next"
				data-calendar-arrow="next"
				title="Next">
			</button>
		</div>
		${self.settings.visibility.weekNumbers ? `
		<div class="vanilla-calendar-column">
			<b class="vanilla-calendar-column__title">#</b>
			<div class="vanilla-calendar-column__content vanilla-calendar-week-numbers"></div>
		</div>
		` : ''}
		<div class="vanilla-calendar-content">
			<div class="vanilla-calendar-week"></div>
			<div class="vanilla-calendar-days"></div>
		</div>
		${self.settings.selection.time ? `
		<div class="vanilla-calendar-time"></div>
		` : ''}
	`;
	} else if (self.currentType === 'month') {
		calendarElement.classList.remove('vanilla-calendar_default');
		calendarElement.classList.add('vanilla-calendar_month');
		calendarElement.classList.remove('vanilla-calendar_year');
		calendarElement.innerHTML = `
		<div class="vanilla-calendar-header">
			<div class="vanilla-calendar-header__content"></div>
		</div>
		<div class="vanilla-calendar-content">
			<div class="vanilla-calendar-months"></div>
		</div>`;
	} else if (self.currentType === 'year') {
		calendarElement.classList.remove('vanilla-calendar_default');
		calendarElement.classList.remove('vanilla-calendar_month');
		calendarElement.classList.add('vanilla-calendar_year');
		calendarElement.innerHTML = `
		<div class="vanilla-calendar-header">
			<button type="button"
				class="vanilla-calendar-arrow vanilla-calendar-arrow_prev"
				title="prev">
			</button>
			<div class="vanilla-calendar-header__content"></div>
			<button type="button"
				class="vanilla-calendar-arrow vanilla-calendar-arrow_next"
				title="next">
			</button>
		</div>
		<div class="vanilla-calendar-content">
			<div class="vanilla-calendar-years"></div>
		</div>`;
	}
};

export default createDOM;
