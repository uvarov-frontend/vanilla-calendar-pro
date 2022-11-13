import { FormatDateString, IOptions } from 'src/types';
import updateCalendar from './methods/updateCalendar';
import initCalendar from './methods/initCalendar';

export default class VanillaCalendar<T extends (HTMLElement | string), R extends IOptions> {
	HTMLElement: HTMLElement | null;

	type!: string;

	date!: {
		min: string;
		max: string;
		today: Date;
	};

	settings!: {
		lang: string;
		iso8601: boolean;
		range: {
			min: FormatDateString,
			max: FormatDateString,
			disabled: FormatDateString[] | null,
			enabled: FormatDateString[] | null,
		};
		selection: {
			day: false | 'single' | 'multiple' | 'multiple-ranged';
			month: boolean;
			year: boolean;
			time: boolean | number;
			controlTime: 'all' | 'range';
			stepHours: number;
			stepMinutes: number;
		};
		selected: {
			dates: FormatDateString[] | undefined | null;
			month: number | null;
			year: number | null;
			holidays: FormatDateString[] | null;
			time: string | null;
		};
		visibility: {
			templateHeader: string;
			monthShort: boolean;
			weekNumbers: boolean;
			weekend: boolean;
			today: boolean;
			disabled: boolean;
		};
	};

	locale!: {
		months: string[] | [];
		weekday: string[] | [];
	};

	actions!: {
		clickDay: ((e: MouseEvent, dates: string[] | undefined) => void) | null;
		clickMonth: ((e: MouseEvent, month: number) => void) | null;
		clickYear: ((e: MouseEvent, year: number) => void) | null;
		changeTime: ((e: Event, time: string, hours: string, minutes: string, keeping: string) => void) | null;
	};

	popups!: {
		[date in FormatDateString]: {
			modifier?: string | null;
			html: string;
		} | null;
	} | null;

	styleClass!: {
		calendar: string;
		calendarDefault: string;
		calendarMonth: string;
		calendarYear: string;
		header: string;
		headerContent: string;
		month: string;
		monthDisabled: string;
		year: string;
		yearDisabled: string;
		arrow: string;
		arrowPrev: string;
		arrowNext: string;
		content: string;
		week: string;
		weekDay: string;
		weekDayWeekend: string;
		days: string;
		daysSelecting: string;
		months: string;
		monthsSelecting: string;
		monthsMonth: string;
		monthsMonthSelected: string;
		monthsMonthDisabled: string;
		years: string;
		yearsSelecting: string;
		yearsYear: string;
		yearsYearSelected: string;
		yearsYearDisabled: string;
		time: string;
		timeContent: string;
		timeHours: string;
		timeMinutes: string;
		timeKeeping: string;
		timeRanges: string;
		timeRange: string;
		day: string;
		dayPopup: string;
		dayBtn: string;
		dayBtnPrev: string;
		dayBtnNext: string;
		dayBtnToday: string;
		dayBtnIntermediate: string;
		dayBtnSelected: string;
		dayBtnDisabled: string;
		dayBtnWeekend: string;
		dayBtnHoliday: string;
		weekNumbers: string;
		weekNumbersTitle: string;
		weekNumbersContent: string;
		weekNumber: string;
		isFocus: string;
	};

	currentType!: string;

	selectedKeeping!: null;

	userTime!: boolean;

	constructor(selector: T, option?: R) {
		this.HTMLElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
		if (!this.HTMLElement) return;
		this.type = option?.type ?? 'default';
		this.date = {
			min: option?.date?.min ?? '1970-01-01',
			max: option?.date?.max ?? '2470-12-31',
			today: option?.date?.today ?? new Date(),
		};
		this.settings = {
			lang: option?.settings?.lang ?? 'en',
			iso8601: option?.settings?.iso8601 ?? true,
			range: {
				min: option?.settings?.range?.min ?? '1970-01-01',
				max: option?.settings?.range?.max ?? '2470-12-31',
				disabled: option?.settings?.range?.disabled ?? null,
				enabled: option?.settings?.range?.enabled ?? null,
			},
			selection: {
				day: option?.settings?.selection?.day ?? 'single',
				month: option?.settings?.selection?.month ?? true,
				year: option?.settings?.selection?.year ?? true,
				time: option?.settings?.selection?.time ?? false,
				controlTime: option?.settings?.selection?.controlTime ?? 'all',
				stepHours: option?.settings?.selection?.stepHours ?? 1,
				stepMinutes: option?.settings?.selection?.stepMinutes ?? 1,
			},
			selected: {
				dates: option?.settings?.selected?.dates ?? null,
				month: option?.settings?.selected?.month ?? null,
				year: option?.settings?.selected?.year ?? null,
				holidays: option?.settings?.selected?.holidays ?? null,
				time: option?.settings?.selected?.time ?? null,
			},
			visibility: {
				templateHeader: option?.settings?.visibility?.templateHeader ?? '%M %Y',
				monthShort: option?.settings?.visibility?.monthShort ?? true,
				weekNumbers: option?.settings?.visibility?.weekNumbers ?? false,
				weekend: option?.settings?.visibility?.weekend ?? true,
				today: option?.settings?.visibility?.today ?? true,
				disabled: option?.settings?.visibility?.disabled ?? false,
			},
		};
		this.locale = {
			months: option?.locale?.months ?? [],
			weekday: option?.locale?.weekday ?? [],
		};
		this.actions = {
			clickDay: option?.actions?.clickDay ?? null,
			clickMonth: option?.actions?.clickMonth ?? null,
			clickYear: option?.actions?.clickYear ?? null,
			changeTime: option?.actions?.changeTime ?? null,
		};
		this.popups = option?.popups ?? null;
		this.styleClass = {
			calendar: option?.styleClass?.calendar ?? 'vanilla-calendar',
			calendarDefault: option?.styleClass?.calendarDefault ?? 'vanilla-calendar_default',
			calendarMonth: option?.styleClass?.calendarMonth ?? 'vanilla-calendar_month',
			calendarYear: option?.styleClass?.calendarYear ?? 'vanilla-calendar_year',
			header: option?.styleClass?.header ?? 'vanilla-calendar-header',
			headerContent: option?.styleClass?.headerContent ?? 'vanilla-calendar-header__content',
			month: option?.styleClass?.month ?? 'vanilla-calendar-month',
			monthDisabled: option?.styleClass?.monthDisabled ?? 'vanilla-calendar-month_disabled',
			year: option?.styleClass?.year ?? 'vanilla-calendar-year',
			yearDisabled: option?.styleClass?.yearDisabled ?? 'vanilla-calendar-year_disabled',
			arrow: option?.styleClass?.arrow ?? 'vanilla-calendar-arrow',
			arrowPrev: option?.styleClass?.arrowPrev ?? 'vanilla-calendar-arrow_prev',
			arrowNext: option?.styleClass?.arrowNext ?? 'vanilla-calendar-arrow_next',
			content: option?.styleClass?.content ?? 'vanilla-calendar-content',
			week: option?.styleClass?.week ?? 'vanilla-calendar-week',
			weekDay: option?.styleClass?.weekDay ?? 'vanilla-calendar-week__day',
			weekDayWeekend: option?.styleClass?.weekDayWeekend ?? 'vanilla-calendar-week__day_weekend',
			days: option?.styleClass?.days ?? 'vanilla-calendar-days',
			daysSelecting: option?.styleClass?.daysSelecting ?? 'vanilla-calendar-days_selecting',
			months: option?.styleClass?.months ?? 'vanilla-calendar-months',
			monthsSelecting: option?.styleClass?.monthsSelecting ?? 'vanilla-calendar-months_selecting',
			monthsMonth: option?.styleClass?.monthsMonth ?? 'vanilla-calendar-months__month',
			monthsMonthSelected: option?.styleClass?.monthsMonthSelected ?? 'vanilla-calendar-months__month_selected',
			monthsMonthDisabled: option?.styleClass?.monthsMonthDisabled ?? 'vanilla-calendar-months__month_disabled',
			years: option?.styleClass?.years ?? 'vanilla-calendar-years',
			yearsSelecting: option?.styleClass?.yearsSelecting ?? 'vanilla-calendar-years_selecting',
			yearsYear: option?.styleClass?.yearsYear ?? 'vanilla-calendar-years__year',
			yearsYearSelected: option?.styleClass?.yearsYearSelected ?? 'vanilla-calendar-years__year_selected',
			yearsYearDisabled: option?.styleClass?.yearsYearDisabled ?? 'vanilla-calendar-years__year_disabled',
			time: option?.styleClass?.time ?? 'vanilla-calendar-time',
			timeContent: option?.styleClass?.timeContent ?? 'vanilla-calendar-time__content',
			timeHours: option?.styleClass?.timeHours ?? 'vanilla-calendar-time__hours',
			timeMinutes: option?.styleClass?.timeMinutes ?? 'vanilla-calendar-time__minutes',
			timeKeeping: option?.styleClass?.timeKeeping ?? 'vanilla-calendar-time__keeping',
			timeRanges: option?.styleClass?.timeRanges ?? 'vanilla-calendar-time__ranges',
			timeRange: option?.styleClass?.timeRange ?? 'vanilla-calendar-time__range',
			day: option?.styleClass?.day ?? 'vanilla-calendar-day',
			dayPopup: option?.styleClass?.dayPopup ?? 'vanilla-calendar-day__popup',
			dayBtn: option?.styleClass?.dayBtn ?? 'vanilla-calendar-day__btn',
			dayBtnPrev: option?.styleClass?.dayBtnPrev ?? 'vanilla-calendar-day__btn_prev',
			dayBtnNext: option?.styleClass?.dayBtnNext ?? 'vanilla-calendar-day__btn_next',
			dayBtnToday: option?.styleClass?.dayBtnToday ?? 'vanilla-calendar-day__btn_today',
			dayBtnSelected: option?.styleClass?.dayBtnSelected ?? 'vanilla-calendar-day__btn_selected',
			dayBtnDisabled: option?.styleClass?.dayBtnDisabled ?? 'vanilla-calendar-day__btn_disabled',
			dayBtnIntermediate: option?.styleClass?.dayBtnIntermediate ?? 'vanilla-calendar-day__btn_intermediate',
			dayBtnWeekend: option?.styleClass?.dayBtnWeekend ?? 'vanilla-calendar-day__btn_weekend',
			dayBtnHoliday: option?.styleClass?.dayBtnHoliday ?? 'vanilla-calendar-day__btn_holiday',
			weekNumbers: option?.styleClass?.weekNumbers ?? 'vanilla-calendar-week-numbers',
			weekNumbersTitle: option?.styleClass?.weekNumbersTitle ?? 'vanilla-calendar-week-numbers__title',
			weekNumbersContent: option?.styleClass?.weekNumbersContent ?? 'vanilla-calendar-week-numbers__content',
			weekNumber: option?.styleClass?.weekNumber ?? 'vanilla-calendar-week-number',
			isFocus: option?.styleClass?.isFocus ?? 'vanilla-calendar-is-focus',
		};

		this.currentType = this.type;
		this.selectedKeeping = null;
		this.userTime = false;
	}

	update = () => updateCalendar(this);

	init = () => initCalendar(this);
}
