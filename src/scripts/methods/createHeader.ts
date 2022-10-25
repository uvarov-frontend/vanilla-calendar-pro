import { IVanillaCalendar } from 'src/types';

const createHeader = (self: IVanillaCalendar) => {
	const headerContent = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-header__content');
	if (self.selectedMonth === undefined || self.selectedYear === undefined || !headerContent) return;

	const monthDisabled = !self.settings.selection.month ? ' vanilla-calendar-month_disabled' : '';
	const yearDisabled = !self.settings.selection.year ? ' vanilla-calendar-year_disabled' : '';

	const month = `
	<button type="button"
		tabindex="${self.settings.selection.month ? 0 : -1}"
		class="vanilla-calendar-month${monthDisabled}"
		data-calendar-selected-month="${self.selectedMonth}">
		${self.locale.months[self.selectedMonth]}
	</button>`.replace(/[\n\t]/g, '');
	const year = `
	<button type="button"
		tabindex="${self.settings.selection.year ? 0 : -1}"
		class="vanilla-calendar-year${yearDisabled}"
		data-calendar-selected-year="${self.selectedYear}">
		${self.selectedYear}
	</button>`.replace(/[\n\t]/g, '');

	let templateHeader = self.settings.visibility.templateHeader.replace('%M', month);
	templateHeader = templateHeader.replace('%Y', year);

	headerContent.innerHTML = templateHeader;
};

export default createHeader;
