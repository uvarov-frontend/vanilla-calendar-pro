import VanillaCalendar from '@src/vanilla-calendar';
import { DOMParser, MultipleParser } from '@scripts/helpers/parseComponent';

const createDOM = (self: VanillaCalendar, target?: HTMLElement) => {
	const {
		HTMLElement,
		CSSClasses,
		DOMTemplates,
		type,
		currentType,
		correctMonths,
	} = self;

	const updateGridAndControls = (columnClass: string, DOMTemplate: string) => {
		if (!target) return;

		const controls = HTMLElement.querySelector(`.${CSSClasses.controls}`);
		if (controls) HTMLElement.removeChild(controls);

		const grid = HTMLElement.querySelector(`.${CSSClasses.grid}`) as HTMLElement;
		grid.classList.add(...CSSClasses.gridDisabled.trim().split(' '));

		const columnElement = target.closest(`.${CSSClasses.column}`) as HTMLElement;
		columnElement.classList.add(...columnClass.trim().split(' '));
		columnElement.innerHTML = DOMParser(self, DOMTemplate);
	};

	const typeHandlers = {
		default: () => {
			HTMLElement.classList.add(...CSSClasses.calendarDefault.trim().split(' '));
			HTMLElement.classList.remove(...CSSClasses.calendarMonth.trim().split(' '), ...CSSClasses.calendarYear.trim().split(' '));
			HTMLElement.innerHTML = DOMParser(self, DOMTemplates.default);
		},
		multiple: () => {
			if (!correctMonths) return;
			HTMLElement.classList.add(...CSSClasses.calendarMultiple.trim().split(' '));
			HTMLElement.classList.remove(...CSSClasses.calendarMonth.trim().split(' '), ...CSSClasses.calendarYear.trim().split(' '));
			HTMLElement.innerHTML = MultipleParser(self, DOMParser(self, DOMTemplates.multiple));
		},
		month: () => {
			if (type === 'multiple') {
				updateGridAndControls(CSSClasses.columnMonth, DOMTemplates.month);
				return;
			}
			HTMLElement.classList.add(...CSSClasses.calendarMonth.trim().split(' '));
			HTMLElement.classList.remove(...CSSClasses.calendarDefault.trim().split(' '), ...CSSClasses.calendarYear.trim().split(' '));
			HTMLElement.innerHTML = DOMParser(self, DOMTemplates.month);
		},
		year: () => {
			if (type === 'multiple') {
				updateGridAndControls(CSSClasses.columnYear, DOMTemplates.year);
				return;
			}
			HTMLElement.classList.add(...CSSClasses.calendarYear.trim().split(' '));
			HTMLElement.classList.remove(...CSSClasses.calendarDefault.trim().split(' '), ...CSSClasses.calendarMonth.trim().split(' '));
			HTMLElement.innerHTML = DOMParser(self, DOMTemplates.year);
		},
	};

	HTMLElement.classList.add(...CSSClasses.calendar.trim().split(' '));
	typeHandlers[currentType]();
};

export default createDOM;
