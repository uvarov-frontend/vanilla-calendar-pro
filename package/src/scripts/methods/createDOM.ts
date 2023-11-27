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
		grid.classList.add(CSSClasses.gridDisabled);

		const columnElement = target.closest(`.${CSSClasses.column}`) as HTMLElement;
		columnElement.classList.add(columnClass);
		columnElement.innerHTML = DOMParser(self, DOMTemplate);
	};

	const typeHandlers = {
		default: () => {
			HTMLElement.classList.add(CSSClasses.calendarDefault);
			HTMLElement.classList.remove(CSSClasses.calendarMonth, CSSClasses.calendarYear);
			HTMLElement.innerHTML = DOMParser(self, DOMTemplates.default);
		},
		multiple: () => {
			if (!correctMonths) return;
			HTMLElement.classList.add(CSSClasses.calendarMultiple);
			HTMLElement.classList.remove(CSSClasses.calendarMonth, CSSClasses.calendarYear);
			HTMLElement.innerHTML = MultipleParser(self, DOMParser(self, DOMTemplates.multiple));
		},
		month: () => {
			if (type === 'multiple') {
				updateGridAndControls(CSSClasses.columnMonth, DOMTemplates.month);
				return;
			}
			HTMLElement.classList.add(CSSClasses.calendarMonth);
			HTMLElement.classList.remove(CSSClasses.calendarDefault, CSSClasses.calendarYear);
			HTMLElement.innerHTML = DOMParser(self, DOMTemplates.month);
		},
		year: () => {
			if (type === 'multiple') {
				updateGridAndControls(CSSClasses.columnYear, DOMTemplates.year);
				return;
			}
			HTMLElement.classList.add(CSSClasses.calendarYear);
			HTMLElement.classList.remove(CSSClasses.calendarDefault, CSSClasses.calendarMonth);
			HTMLElement.innerHTML = DOMParser(self, DOMTemplates.year);
		},
	};

	HTMLElement.classList.add(CSSClasses.calendar);
	typeHandlers[currentType]();
};

export default createDOM;
