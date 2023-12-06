/*! name: vanilla-calendar-pro | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const classes = {
  calendar: "vanilla-calendar",
  calendarDefault: "vanilla-calendar_default",
  calendarMultiple: "vanilla-calendar_multiple",
  calendarMonth: "vanilla-calendar_month",
  calendarYear: "vanilla-calendar_year",
  calendarHidden: "vanilla-calendar_hidden",
  calendarToInput: "vanilla-calendar_to-input",
  controls: "vanilla-calendar-controls",
  grid: "vanilla-calendar-grid",
  gridDisabled: "vanilla-calendar-grid_disabled",
  column: "vanilla-calendar-column",
  columnMonth: "vanilla-calendar-column_month",
  columnYear: "vanilla-calendar-column_year",
  header: "vanilla-calendar-header",
  headerContent: "vanilla-calendar-header__content",
  month: "vanilla-calendar-month",
  monthDisabled: "vanilla-calendar-month_disabled",
  year: "vanilla-calendar-year",
  yearDisabled: "vanilla-calendar-year_disabled",
  arrow: "vanilla-calendar-arrow",
  arrowPrev: "vanilla-calendar-arrow_prev",
  arrowNext: "vanilla-calendar-arrow_next",
  wrapper: "vanilla-calendar-wrapper",
  content: "vanilla-calendar-content",
  week: "vanilla-calendar-week",
  weekDay: "vanilla-calendar-week__day",
  weekDayWeekend: "vanilla-calendar-week__day_weekend",
  days: "vanilla-calendar-days",
  daysSelecting: "vanilla-calendar-days_selecting",
  months: "vanilla-calendar-months",
  monthsSelecting: "vanilla-calendar-months_selecting",
  monthsMonth: "vanilla-calendar-months__month",
  monthsMonthSelected: "vanilla-calendar-months__month_selected",
  monthsMonthDisabled: "vanilla-calendar-months__month_disabled",
  years: "vanilla-calendar-years",
  yearsSelecting: "vanilla-calendar-years_selecting",
  yearsYear: "vanilla-calendar-years__year",
  yearsYearSelected: "vanilla-calendar-years__year_selected",
  yearsYearDisabled: "vanilla-calendar-years__year_disabled",
  time: "vanilla-calendar-time",
  timeContent: "vanilla-calendar-time__content",
  timeHours: "vanilla-calendar-time__hours",
  timeMinutes: "vanilla-calendar-time__minutes",
  timeKeeping: "vanilla-calendar-time__keeping",
  timeRanges: "vanilla-calendar-time__ranges",
  timeRange: "vanilla-calendar-time__range",
  day: "vanilla-calendar-day",
  daySelected: "vanilla-calendar-day_selected",
  daySelectedFirst: "vanilla-calendar-day_selected-first",
  daySelectedLast: "vanilla-calendar-day_selected-last",
  daySelectedIntermediate: "vanilla-calendar-day_selected-intermediate",
  dayPopup: "vanilla-calendar-day__popup",
  dayBtn: "vanilla-calendar-day__btn",
  dayBtnPrev: "vanilla-calendar-day__btn_prev",
  dayBtnNext: "vanilla-calendar-day__btn_next",
  dayBtnToday: "vanilla-calendar-day__btn_today",
  dayBtnSelected: "vanilla-calendar-day__btn_selected",
  dayBtnSelectedFirst: "vanilla-calendar-day__btn_selected_first",
  dayBtnSelectedLast: "vanilla-calendar-day__btn_selected_last",
  dayBtnSelectedIntermediate: "vanilla-calendar-day__btn_selected_intermediate",
  dayBtnHover: "vanilla-calendar-day__btn_hover",
  dayBtnDisabled: "vanilla-calendar-day__btn_disabled",
  dayBtnWeekend: "vanilla-calendar-day__btn_weekend",
  dayBtnHoliday: "vanilla-calendar-day__btn_holiday",
  weekNumbers: "vanilla-calendar-week-numbers",
  weekNumbersTitle: "vanilla-calendar-week-numbers__title",
  weekNumbersContent: "vanilla-calendar-week-numbers__content",
  weekNumber: "vanilla-calendar-week-number",
  isFocus: "vanilla-calendar-is-focus"
};
const DOMDefault = (styles) => `
	<div class="${styles.header}">
		<#ArrowPrev />
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
		<#ArrowNext />
	</div>
	<div class="${styles.wrapper}">
		<#WeekNumbers />
		<div class="${styles.content}">
			<#Week />
			<#Days />
		</div>
	</div>
	<#ControlTime />
`;
const DOMMultiple = (styles) => `
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
`;
const DOMMonths = (styles) => `
	<div class="${styles.header}">
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
	</div>
	<div class="${styles.wrapper}">
		<div class="${styles.content}">
			<#Months />
		</div>
	</div>
`;
const DOMYears = (styles) => `
	<div class="${styles.header}">
		<#ArrowPrev />
		<div class="${styles.headerContent}">
			<#Month />
			<#Year />
		</div>
		<#ArrowNext />
	</div>
	<div class="${styles.wrapper}">
		<div class="${styles.content}">
			<#Years />
		</div>
	</div>
`;
class DefaultOptionsCalendar {
  constructor() {
    __publicField(this, "isInit", false);
    __publicField(this, "input", false);
    __publicField(this, "type", "default");
    __publicField(this, "months", 2);
    __publicField(this, "jumpMonths", 1);
    __publicField(this, "date", {
      min: "1970-01-01",
      max: "2470-12-31",
      today: /* @__PURE__ */ new Date()
    });
    __publicField(this, "settings", {
      lang: "en",
      iso8601: true,
      range: {
        min: this.date.min,
        max: this.date.max,
        disablePast: false,
        disableGaps: false,
        disableAllDays: false,
        disableWeekday: void 0,
        disabled: void 0,
        enabled: void 0
      },
      selection: {
        day: "single",
        month: true,
        year: true,
        time: false,
        controlTime: "all",
        stepHours: 1,
        stepMinutes: 1,
        cancelableDay: true
      },
      selected: {
        dates: void 0,
        month: void 0,
        year: void 0,
        holidays: void 0,
        time: void 0
      },
      visibility: {
        theme: "system",
        themeDetect: "html[data-theme]",
        monthShort: true,
        weekNumbers: false,
        weekend: true,
        today: true,
        disabled: false,
        daysOutside: true
      }
    });
    __publicField(this, "locale", {
      months: [],
      weekday: []
    });
    __publicField(this, "actions", {
      clickDay: null,
      clickWeekNumber: null,
      clickMonth: null,
      clickYear: null,
      clickArrow: null,
      changeTime: null,
      changeToInput: null,
      getDays: null,
      hideCalendar: null,
      showCalendar: null
    });
    __publicField(this, "popups", {});
    __publicField(this, "CSSClasses", __spreadValues({}, classes));
    __publicField(this, "DOMTemplates", {
      default: DOMDefault(this.CSSClasses),
      multiple: DOMMultiple(this.CSSClasses),
      month: DOMMonths(this.CSSClasses),
      year: DOMYears(this.CSSClasses)
    });
    __publicField(this, "HTMLElement");
    __publicField(this, "HTMLOriginalElement");
    __publicField(this, "HTMLInputElement");
    __publicField(this, "rangeMin");
    __publicField(this, "rangeMax");
    __publicField(this, "rangeDisabled");
    __publicField(this, "rangeEnabled");
    __publicField(this, "selectedDates");
    __publicField(this, "selectedHolidays");
    __publicField(this, "selectedMonth");
    __publicField(this, "selectedYear");
    __publicField(this, "selectedHours");
    __publicField(this, "selectedMinutes");
    __publicField(this, "selectedKeeping");
    __publicField(this, "selectedTime");
    __publicField(this, "currentType");
    __publicField(this, "correctMonths");
    __publicField(this, "viewYear");
    __publicField(this, "dateMin");
    __publicField(this, "dateMax");
  }
}
const getDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getDate = (date) => /* @__PURE__ */ new Date(`${date}T00:00:00`);
const parseDates = (dates) => dates.reduce((accumulator, date) => {
  if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
    accumulator.push(date);
  } else {
    date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, startDateStr, endDateStr) => {
      const startDate = getDate(startDateStr);
      const endDate = getDate(endDateStr);
      const currentDate = new Date(startDate.getTime());
      for (currentDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        accumulator.push(getDateString(currentDate));
      }
      return _;
    });
  }
  return accumulator;
}, []);
const transformTime12 = (hour) => {
  const hourMap = {
    0: "12",
    13: "01",
    14: "02",
    15: "03",
    16: "04",
    17: "05",
    18: "06",
    19: "07",
    20: "08",
    21: "09",
    22: "10",
    23: "11"
  };
  return hour ? hourMap[Number(hour)] || String(hour) : "";
};
const messages = {
  notFoundSelector: (selector) => `${selector} is not found, check the first argument passed to new VanillaCalendar.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  notLocale: 'You specified "define" for "settings.lang" but did not provide the required values for "locale.weekday" or "locale.months".',
  incorrectTheme: 'Incorrect name of theme in "settings.visibility.theme".',
  incorrectTime: "The value of the time property can be: false, true, 12 or 24."
};
const initSelectedMonthYear = (self) => {
  const isValidMonth = self.settings.selected.month !== void 0 && Number(self.settings.selected.month) >= 0 && Number(self.settings.selected.month) < 12;
  const isValidYear = self.settings.selected.year !== void 0 && Number(self.settings.selected.year) >= 0 && Number(self.settings.selected.year) <= 9999;
  self.selectedMonth = isValidMonth ? Number(self.settings.selected.month) : self.date.today.getMonth();
  self.selectedYear = isValidYear ? Number(self.settings.selected.year) : self.date.today.getFullYear();
  self.viewYear = self.selectedYear;
};
const initRange = (self) => {
  var _a, _b, _c;
  self.settings.range.min = getDate(self.date.min) >= getDate(self.settings.range.min) ? self.date.min : self.settings.range.min;
  self.settings.range.max = getDate(self.date.max) <= getDate(self.settings.range.max) ? self.date.max : self.settings.range.max;
  const isDisablePast = self.settings.range.disablePast && !self.settings.range.disableAllDays && getDate(self.settings.range.min) < self.date.today;
  self.rangeMin = isDisablePast ? getDateString(self.date.today) : self.settings.range.disableAllDays ? getDateString(new Date(self.selectedYear, self.selectedMonth, 1)) : self.settings.range.min;
  self.rangeMax = self.settings.range.disableAllDays ? getDateString(new Date(self.selectedYear, self.selectedMonth, 1)) : self.settings.range.max;
  const firstDay = getDate(self.rangeMin);
  const lastDay = getDate(self.rangeMax);
  firstDay.setDate(firstDay.getDate() - 1);
  lastDay.setDate(lastDay.getDate() + 1);
  self.rangeDisabled = self.settings.range.disabled ? parseDates(self.settings.range.disabled) : [];
  if (self.settings.range.disableAllDays) {
    const daysInCurrentMonth = new Date(self.selectedYear, self.selectedMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      self.rangeDisabled.push(getDateString(new Date(self.selectedYear, self.selectedMonth, i)));
    }
  }
  self.rangeDisabled.push(getDateString(firstDay));
  self.rangeDisabled.push(getDateString(lastDay));
  self.rangeDisabled.sort((a, b) => +new Date(a) - +new Date(b));
  self.rangeEnabled = self.settings.range.enabled ? parseDates(self.settings.range.enabled) : [];
  if ((_a = self.rangeEnabled) == null ? void 0 : _a[0])
    self.rangeDisabled = (_b = self.rangeDisabled) == null ? void 0 : _b.filter((d) => {
      var _a2;
      return !((_a2 = self.rangeEnabled) == null ? void 0 : _a2.includes(d));
    });
  self.rangeEnabled.sort((a, b) => +new Date(a) - +new Date(b));
  if (((_c = self.rangeEnabled) == null ? void 0 : _c[0]) && self.settings.range.disableAllDays) {
    self.rangeMin = self.rangeEnabled[0];
    self.rangeMax = self.rangeEnabled[self.rangeEnabled.length - 1];
  }
};
const initSelectedDates = (self) => {
  var _a, _b;
  self.selectedDates = ((_a = self.settings.selected.dates) == null ? void 0 : _a[0]) ? parseDates(self.settings.selected.dates) : [];
  self.selectedHolidays = ((_b = self.settings.selected.holidays) == null ? void 0 : _b[0]) ? parseDates(self.settings.selected.holidays) : [];
};
const initDateMinMax = (self) => {
  self.dateMin = self.settings.visibility.disabled ? getDate(self.date.min) : getDate(self.rangeMin);
  self.dateMax = self.settings.visibility.disabled ? getDate(self.date.max) : getDate(self.rangeMax);
};
const initTime = (self) => {
  const time12 = self.settings.selection.time === true || self.settings.selection.time === 12;
  if (time12 || self.settings.selection.time === 24) {
    let userTime = false;
    if (typeof self.settings.selected.time === "string") {
      const regExr = time12 ? /^([0-9]|0[1-9]|1[0-2]):([0-5][0-9])|(AM|PM)/g : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])/g;
      self.settings.selected.time.replace(regExr, (_, p1, p2, p3) => {
        if (p1 && p2) {
          userTime = true;
          self.selectedHours = p1;
          self.selectedMinutes = p2;
        }
        if (p3 && time12) {
          self.selectedKeeping = p3;
        } else if (time12) {
          self.selectedKeeping = "AM";
        }
        return "";
      });
    }
    if (!userTime && time12) {
      self.selectedHours = transformTime12(String(self.date.today.getHours()));
      self.selectedMinutes = String(self.date.today.getMinutes());
      self.selectedKeeping = Number(self.date.today.getHours()) >= 12 ? "PM" : "AM";
    } else if (!userTime) {
      self.selectedHours = String(self.date.today.getHours());
      self.selectedMinutes = String(self.date.today.getMinutes());
    }
    self.selectedHours = Number(self.selectedHours) < 10 ? `0${Number(self.selectedHours)}` : `${self.selectedHours}`;
    self.selectedMinutes = Number(self.selectedMinutes) < 10 ? `0${Number(self.selectedMinutes)}` : `${self.selectedMinutes}`;
    self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ""}`;
  } else if (self.settings.selection.time) {
    throw new Error(messages.incorrectTime);
  }
};
const initCorrectMonths = (self) => {
  self.correctMonths = self.type === "multiple" ? self.months === 1 ? 2 : self.months > 12 ? 12 : self.months : 1;
};
const setVariables = (self) => {
  self.currentType = self.type;
  initSelectedMonthYear(self);
  initRange(self);
  initSelectedDates(self);
  initDateMinMax(self);
  initTime(self);
  initCorrectMonths(self);
};
const actionsInput = (self) => ({
  hide() {
    self.HTMLElement.classList.add(self.CSSClasses.calendarHidden);
    if (self.actions.hideCalendar)
      self.actions.hideCalendar(self);
  },
  show() {
    self.HTMLElement.classList.remove(self.CSSClasses.calendarHidden);
    if (self.actions.showCalendar)
      self.actions.showCalendar(self);
  },
  self
});
const setVisibilityArrows = ({
  arrowPrev,
  arrowNext,
  isPrevHidden,
  isNextHidden
}) => {
  arrowPrev.style.visibility = isPrevHidden ? "hidden" : "";
  arrowNext.style.visibility = isNextHidden ? "hidden" : "";
};
const visibilityArrows = (self) => {
  var _a, _b;
  if (self.currentType === "month")
    return;
  const arrowPrev = (_a = self.HTMLElement) == null ? void 0 : _a.querySelector(`.${self.CSSClasses.arrowPrev}`);
  const arrowNext = (_b = self.HTMLElement) == null ? void 0 : _b.querySelector(`.${self.CSSClasses.arrowNext}`);
  if (!arrowPrev || !arrowNext)
    return;
  const updateType = {
    default: () => {
      const currentSelectedDate = getDate(getDateString(new Date(self.selectedYear, self.selectedMonth, 1)));
      const jumpDateMin = new Date(currentSelectedDate.getTime());
      const jumpDateMax = new Date(currentSelectedDate.getTime());
      jumpDateMin.setMonth(jumpDateMin.getMonth() - self.jumpMonths);
      jumpDateMax.setMonth(jumpDateMax.getMonth() + self.jumpMonths);
      if (!self.settings.selection.year) {
        self.dateMin.setFullYear(currentSelectedDate.getFullYear());
        self.dateMax.setFullYear(currentSelectedDate.getFullYear());
      }
      const isPrevHidden = !self.settings.selection.month || jumpDateMin.getFullYear() < self.dateMin.getFullYear() || jumpDateMin.getFullYear() === self.dateMin.getFullYear() && jumpDateMin.getMonth() < self.dateMin.getMonth();
      const isNextHidden = !self.settings.selection.month || jumpDateMax.getFullYear() > self.dateMax.getFullYear() || jumpDateMax.getFullYear() === self.dateMax.getFullYear() && jumpDateMax.getMonth() > self.dateMax.getMonth();
      setVisibilityArrows({
        arrowPrev,
        arrowNext,
        isPrevHidden,
        isNextHidden
      });
    },
    year: () => {
      setVisibilityArrows({
        arrowPrev,
        arrowNext,
        isPrevHidden: self.dateMin.getFullYear() && self.viewYear - 7 <= self.dateMin.getFullYear(),
        isNextHidden: self.dateMax.getFullYear() && self.viewYear + 7 >= self.dateMax.getFullYear()
      });
    }
  };
  updateType[self.currentType === "multiple" ? "default" : self.currentType]();
};
const getWeekNumber = (date, iso8601) => {
  if (!date)
    return null;
  const currentDate = getDate(date);
  const dayNum = iso8601 ? currentDate.getDay() || 7 : currentDate.getDay();
  currentDate.setDate(currentDate.getDate() + 4 - dayNum);
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((+currentDate - +yearStart) / 864e5 + 1) / 7);
  return {
    year: currentDate.getFullYear(),
    week: weekNumber
  };
};
const handleDay = (date, dayInfo, daysEl, CSSClasses) => {
  const dayBtnEl = daysEl.querySelector(`[data-calendar-day="${date}"]`);
  if (!dayBtnEl)
    return;
  if (dayInfo == null ? void 0 : dayInfo.modifier)
    dayBtnEl.classList.add(...dayInfo.modifier.trim().split(" "));
  if (dayInfo == null ? void 0 : dayInfo.html)
    dayBtnEl.parentNode.innerHTML += `<div class="${CSSClasses}">${dayInfo.html}</div>`;
};
const createPopup = (self, daysEl) => {
  var _a;
  if (!self.popups)
    return;
  (_a = Object.entries(self.popups)) == null ? void 0 : _a.forEach(([date, dayInfo]) => handleDay(date, dayInfo, daysEl, self.CSSClasses.dayPopup));
};
const createWeekNumber = (self, dayEls, index, templateWeekNumberEl, weekNumbersContentEl) => {
  const dayBtnEl = dayEls[index].querySelector(`.${self.CSSClasses.dayBtn}`);
  const weekNumber = getWeekNumber(dayBtnEl == null ? void 0 : dayBtnEl.dataset.calendarDay, self.settings.iso8601);
  if (!weekNumber)
    return;
  const weekNumberEl = templateWeekNumberEl.cloneNode(true);
  weekNumberEl.innerText = String(weekNumber.week);
  weekNumberEl.dataset.calendarYearWeek = String(weekNumber.year);
  weekNumbersContentEl.append(weekNumberEl);
};
const createWeekNumbers = (self, firstDayWeek, daysSelectedMonth, weekNumbersEl, daysEl) => {
  if (!self.settings.visibility.weekNumbers)
    return;
  weekNumbersEl.innerHTML = "";
  const weekNumbersTitleEl = document.createElement("b");
  weekNumbersTitleEl.className = self.CSSClasses.weekNumbersTitle;
  weekNumbersTitleEl.innerText = "#";
  weekNumbersEl.append(weekNumbersTitleEl);
  const weekNumbersContentEl = document.createElement("div");
  weekNumbersContentEl.className = self.CSSClasses.weekNumbersContent;
  weekNumbersEl.append(weekNumbersContentEl);
  const templateWeekNumberEl = document.createElement("button");
  templateWeekNumberEl.type = "button";
  templateWeekNumberEl.className = self.CSSClasses.weekNumber;
  const dayEls = daysEl.querySelectorAll(`.${self.CSSClasses.day}`);
  const weeksCount = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);
  for (let i = 0; i < weeksCount; i++) {
    createWeekNumber(self, dayEls, i === 0 ? 6 : i * 7, templateWeekNumberEl, weekNumbersContentEl);
  }
};
const setDisableWeekday = (self, date, dayWeekID) => {
  var _a, _b, _c;
  if (((_a = self.settings.range.disableWeekday) == null ? void 0 : _a.includes(dayWeekID)) && !((_b = self.rangeDisabled) == null ? void 0 : _b.includes(date))) {
    self.rangeDisabled = self.rangeDisabled ? [...self.rangeDisabled, date] : [date];
    (_c = self.rangeDisabled) == null ? void 0 : _c.sort((a, b) => +new Date(a) - +new Date(b));
  }
};
const setDayModifier = (self, year, dayEl, dayBtnEl, dayWeekID, date, otherMonth) => {
  var _a, _b, _c;
  if (getDate(self.rangeMin) > getDate(date) || getDate(self.rangeMax) < getDate(date) || ((_a = self.rangeDisabled) == null ? void 0 : _a.includes(date)) || !self.settings.selection.month && otherMonth || !self.settings.selection.year && getDate(date).getFullYear() !== year) {
    dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
    dayBtnEl.tabIndex = -1;
  }
  if (self.settings.visibility.today && getDateString(self.date.today) === date) {
    dayBtnEl.classList.add(self.CSSClasses.dayBtnToday);
  }
  if (self.settings.visibility.weekend && (dayWeekID === 0 || dayWeekID === 6)) {
    dayBtnEl.classList.add(self.CSSClasses.dayBtnWeekend);
  }
  if ((_b = self.selectedHolidays) == null ? void 0 : _b.includes(date)) {
    dayBtnEl.classList.add(self.CSSClasses.dayBtnHoliday);
  }
  if ((_c = self.selectedDates) == null ? void 0 : _c.includes(date)) {
    dayEl.classList.add(self.CSSClasses.daySelected);
    dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
    if (self.selectedDates.length > 1 && self.settings.selection.day === "multiple-ranged") {
      if (self.selectedDates[0] === date) {
        dayEl.classList.add(self.CSSClasses.daySelectedFirst);
        dayBtnEl.classList.add(self.CSSClasses.daySelectedFirst);
      } else if (self.selectedDates[self.selectedDates.length - 1] === date) {
        dayEl.classList.add(self.CSSClasses.daySelectedLast);
        dayBtnEl.classList.add(self.CSSClasses.dayBtnSelectedLast);
      } else {
        dayEl.classList.add(self.CSSClasses.daySelectedIntermediate);
        dayBtnEl.classList.add(self.CSSClasses.dayBtnSelectedIntermediate);
      }
    }
  }
};
const createDay = (self, year, daysEl, day, dayWeekID, date, otherMonth, modifier) => {
  const dayEl = document.createElement("div");
  dayEl.className = self.CSSClasses.day;
  const dayBtnEl = document.createElement("button");
  dayBtnEl.className = `${self.CSSClasses.dayBtn}${modifier ? ` ${modifier}` : ""}`;
  dayBtnEl.type = "button";
  dayBtnEl.innerText = String(day);
  dayBtnEl.dataset.calendarDay = date;
  const addWeekNumber = () => {
    const weekNumber = getWeekNumber(date, self.settings.iso8601);
    if (!weekNumber)
      return;
    dayBtnEl.dataset.calendarWeekNumber = String(weekNumber.week);
  };
  if (self.settings.visibility.weekNumbers)
    addWeekNumber();
  if (otherMonth) {
    if (self.settings.visibility.daysOutside)
      dayEl.append(dayBtnEl);
  } else {
    dayEl.append(dayBtnEl);
  }
  setDisableWeekday(self, date, dayWeekID);
  setDayModifier(self, year, dayEl, dayBtnEl, dayWeekID, date, otherMonth);
  daysEl.append(dayEl);
  if (self.actions.getDays)
    self.actions.getDays(day, date, dayEl, dayBtnEl, self);
};
const prevMonth = (self, daysEl, selectedYear, selectedMonth, firstDayWeek) => {
  let day = new Date(selectedYear, selectedMonth, 0).getDate() - (firstDayWeek - 1);
  const year = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  const month = selectedMonth === 0 ? 12 : selectedMonth < 10 ? `0${selectedMonth}` : selectedMonth;
  for (let i = firstDayWeek; i > 0; i--, day++) {
    const date = `${year}-${month}-${day}`;
    const dayWeekID = getDate(date).getDay();
    createDay(self, selectedYear, daysEl, day, dayWeekID, date, true, self.CSSClasses.dayBtnPrev);
  }
};
const currentMonth = (self, daysEl, daysSelectedMonth, selectedYear, selectedMonth) => {
  for (let i = 1; i <= daysSelectedMonth; i++) {
    const day = new Date(selectedYear, selectedMonth, i);
    const date = getDateString(day);
    const dayWeekID = day.getDay();
    createDay(self, selectedYear, daysEl, i, dayWeekID, date, false, null);
  }
};
const nextMonth = (self, daysEl, daysSelectedMonth, selectedYear, selectedMonth, firstDayWeek) => {
  const currentTotalDays = firstDayWeek + daysSelectedMonth;
  const rowsDays = Math.ceil(currentTotalDays / 7);
  const daysNextMonth = 7 * rowsDays - currentTotalDays;
  const year = selectedMonth + 1 === 12 ? selectedYear + 1 : selectedYear;
  const month = selectedMonth + 1 === 12 ? "01" : selectedMonth + 2 < 10 ? `0${selectedMonth + 2}` : selectedMonth + 2;
  for (let i = 1; i <= daysNextMonth; i++) {
    const day = i < 10 ? `0${i}` : String(i);
    const date = `${year}-${month}-${day}`;
    const dayWeekID = getDate(date).getDay();
    createDay(self, selectedYear, daysEl, i, dayWeekID, date, true, self.CSSClasses.dayBtnNext);
  }
};
const createDays = (self) => {
  const daysEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.days}`);
  const weekNumbersEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.weekNumbers}`);
  const initDate = new Date(self.selectedYear, self.selectedMonth, 1);
  daysEls.forEach((daysEl, index) => {
    const selectedDate = new Date(initDate);
    selectedDate.setMonth(selectedDate.getMonth() + index);
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const daysSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayWeek = self.settings.iso8601 ? (firstDay.getDay() !== 0 ? firstDay.getDay() : 7) - 1 : firstDay.getDay();
    if (self.settings.selection.day)
      daysEl.classList.add(self.CSSClasses.daysSelecting);
    daysEl.innerHTML = "";
    prevMonth(self, daysEl, selectedYear, selectedMonth, firstDayWeek);
    currentMonth(self, daysEl, daysSelectedMonth, selectedYear, selectedMonth);
    nextMonth(self, daysEl, daysSelectedMonth, selectedYear, selectedMonth, firstDayWeek);
    createWeekNumbers(self, firstDayWeek, daysSelectedMonth, weekNumbersEls[index], daysEl);
    createPopup(self, daysEl);
  });
};
const visibilityMonth = (self, monthEl, index, initDate) => {
  const month = new Date(initDate.setMonth(self.selectedMonth + index)).getMonth();
  const isSelectionDisabled = self.settings.selection.month === false || self.settings.selection.month === "only-arrows";
  monthEl.tabIndex = isSelectionDisabled ? -1 : 0;
  monthEl.classList.toggle(self.CSSClasses.monthDisabled, isSelectionDisabled);
  monthEl.setAttribute("data-calendar-selected-month", String(month));
  monthEl.innerText = self.locale.months[month];
};
const visibilityYear = (self, yearEl, index, initDate) => {
  const year = new Date(initDate.setFullYear(self.selectedYear, self.selectedMonth + index)).getFullYear();
  const isSelectionDisabled = self.settings.selection.year === false || self.settings.selection.year === "only-arrows";
  yearEl.tabIndex = isSelectionDisabled ? -1 : 0;
  yearEl.classList.toggle(self.CSSClasses.yearDisabled, isSelectionDisabled);
  yearEl.setAttribute("data-calendar-selected-year", String(year));
  yearEl.innerText = String(year);
};
const visibilityTitle = (self) => {
  var _a, _b;
  const monthEls = (_a = self.HTMLElement) == null ? void 0 : _a.querySelectorAll("[data-calendar-selected-month]");
  const yearEls = (_b = self.HTMLElement) == null ? void 0 : _b.querySelectorAll("[data-calendar-selected-year]");
  if (!(monthEls == null ? void 0 : monthEls[0]) && (yearEls == null ? void 0 : yearEls[0]))
    return;
  const initDate = new Date(self.selectedYear, self.selectedMonth, 1);
  monthEls == null ? void 0 : monthEls.forEach((monthEl, index) => visibilityMonth(self, monthEl, index, initDate));
  yearEls == null ? void 0 : yearEls.forEach((yearEl, index) => visibilityYear(self, yearEl, index, initDate));
};
const changeMonth = (self, route) => {
  const jumpDate = getDate(getDateString(new Date(self.selectedYear, self.selectedMonth, 1)));
  const routeMap = {
    prev: () => jumpDate.setMonth(jumpDate.getMonth() - self.jumpMonths),
    next: () => jumpDate.setMonth(jumpDate.getMonth() + self.jumpMonths)
  };
  routeMap[route]();
  [self.selectedMonth, self.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];
  visibilityTitle(self);
  visibilityArrows(self);
  createDays(self);
};
const ArrowPrev = (self) => `
	<button type="button"
		class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowPrev}"
		data-calendar-arrow="prev">
	</button>
`;
const ArrowNext = (self) => `
	<button type="button"
		class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowNext}"
		data-calendar-arrow="next">
	</button>
`;
const Month = (self) => `
	<button type="button"
		class="${self.CSSClasses.month}"
		data-calendar-selected-month>
	</button>
`;
const Year = (self) => `
	<button type="button"
		class="${self.CSSClasses.year}"
		data-calendar-selected-year>
	</button>
`;
const Week = (self) => `
	<div class="${self.CSSClasses.week}"></div>
`;
const Days = (self) => `
	<div class="${self.CSSClasses.days}"></div>
`;
const Months = (self) => `
	<div class="${self.CSSClasses.months}"></div>
`;
const Years = (self) => `
	<div class="${self.CSSClasses.years}"></div>
`;
const WeekNumbers = (self) => self.settings.visibility.weekNumbers ? `
	<div class="${self.CSSClasses.weekNumbers}"></div>
` : "";
const ControlTime = (self) => self.settings.selection.time ? `
	<div class="${self.CSSClasses.time}"></div>
` : "";
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArrowNext,
  ArrowPrev,
  ControlTime,
  Days,
  Month,
  Months,
  Week,
  WeekNumbers,
  Year,
  Years
}, Symbol.toStringTag, { value: "Module" }));
const getComponent = (pattern) => components[pattern];
const DOMParser = (self, template) => template.replace(/<#(.*?)\/>/g, (_, p1) => {
  const component = getComponent(p1.replace(/[\s\n\t]/g, ""));
  return component ? component(self) : "";
}).replace(/[\n\t]/g, "");
const MultipleParser = (self, template) => template.replace(/<#Multiple>(.*?)<#\/Multiple>/g, (_, p1) => {
  let content = "";
  for (let i = 0; i < self.correctMonths; i++) {
    content += p1;
  }
  return content;
}).replace(/[\n\t]/g, "");
const createDOM = (self, target) => {
  const {
    HTMLElement,
    CSSClasses,
    DOMTemplates,
    type,
    currentType,
    correctMonths
  } = self;
  const updateGridAndControls = (columnClass, DOMTemplate) => {
    if (!target)
      return;
    const controls = HTMLElement.querySelector(`.${CSSClasses.controls}`);
    if (controls)
      HTMLElement.removeChild(controls);
    const grid = HTMLElement.querySelector(`.${CSSClasses.grid}`);
    grid.classList.add(CSSClasses.gridDisabled);
    const columnElement = target.closest(`.${CSSClasses.column}`);
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
      if (!correctMonths)
        return;
      HTMLElement.classList.add(CSSClasses.calendarMultiple);
      HTMLElement.classList.remove(CSSClasses.calendarMonth, CSSClasses.calendarYear);
      HTMLElement.innerHTML = MultipleParser(self, DOMParser(self, DOMTemplates.multiple));
    },
    month: () => {
      if (type === "multiple") {
        updateGridAndControls(CSSClasses.columnMonth, DOMTemplates.month);
        return;
      }
      HTMLElement.classList.add(CSSClasses.calendarMonth);
      HTMLElement.classList.remove(CSSClasses.calendarDefault, CSSClasses.calendarYear);
      HTMLElement.innerHTML = DOMParser(self, DOMTemplates.month);
    },
    year: () => {
      if (type === "multiple") {
        updateGridAndControls(CSSClasses.columnYear, DOMTemplates.year);
        return;
      }
      HTMLElement.classList.add(CSSClasses.calendarYear);
      HTMLElement.classList.remove(CSSClasses.calendarDefault, CSSClasses.calendarMonth);
      HTMLElement.innerHTML = DOMParser(self, DOMTemplates.year);
    }
  };
  HTMLElement.classList.add(CSSClasses.calendar);
  typeHandlers[currentType]();
};
const createYearEl = (self, templateYearEl, selectedYear, yearDisabled, i) => {
  const yearEl = templateYearEl.cloneNode(false);
  yearEl.className = `${self.CSSClasses.yearsYear}${selectedYear === i ? ` ${self.CSSClasses.yearsYearSelected}` : yearDisabled ? ` ${self.CSSClasses.yearsYearDisabled}` : ""}`;
  yearEl.dataset.calendarYear = String(i);
  yearEl.title = String(i);
  yearEl.innerText = String(i);
  if (yearDisabled)
    yearEl.tabIndex = -1;
  return yearEl;
};
const createYears = (self, target) => {
  const selectedYear = (target == null ? void 0 : target.dataset.calendarSelectedYear) ? Number(target == null ? void 0 : target.dataset.calendarSelectedYear) : self.selectedYear;
  self.currentType = "year";
  createDOM(self, target);
  visibilityTitle(self);
  visibilityArrows(self);
  const yearsEl = self.HTMLElement.querySelector(`.${self.CSSClasses.years}`);
  if (!self.settings.selection.year || !yearsEl)
    return;
  yearsEl.classList.add(self.CSSClasses.yearsSelecting);
  const relationshipID2 = self.type !== "multiple" ? 0 : self.selectedYear === selectedYear ? 0 : 1;
  const templateYearEl = document.createElement("button");
  templateYearEl.type = "button";
  for (let i = self.viewYear - 7; i < self.viewYear + 8; i++) {
    const yearDisabled = i < self.dateMin.getFullYear() + relationshipID2 || i > self.dateMax.getFullYear();
    yearsEl.append(createYearEl(self, templateYearEl, selectedYear, yearDisabled, i));
  }
};
const handleClickArrow = (self, event) => {
  const element = event.target;
  const arrowEl = element.closest(`.${self.CSSClasses.arrow}`);
  if (!arrowEl)
    return;
  if (["default", "multiple"].includes(self.currentType)) {
    changeMonth(self, arrowEl.dataset.calendarArrow);
  } else if (self.currentType === "year" && self.viewYear !== void 0) {
    self.viewYear += { prev: -15, next: 15 }[arrowEl.dataset.calendarArrow];
    createYears(self, event.target);
  }
  if (self.actions.clickArrow)
    self.actions.clickArrow(event, self);
};
const handleClickWeekNumber = (self, event) => {
  var _a;
  if (!self.settings.visibility.weekNumbers || !self.actions.clickWeekNumber)
    return;
  const weekNumberEl = event.target.closest(`.${self.CSSClasses.weekNumber}`);
  const daysToWeeks = (_a = self.HTMLElement) == null ? void 0 : _a.querySelectorAll("[data-calendar-week-number]");
  if (!weekNumberEl || !daysToWeeks)
    return;
  const weekNumberValue = Number(weekNumberEl.innerText);
  const yearWeek = Number(weekNumberEl.dataset.calendarYearWeek);
  const daysOfThisWeek = [...daysToWeeks].filter((day) => Number(day.dataset.calendarWeekNumber) === weekNumberValue);
  self.actions.clickWeekNumber(event, weekNumberValue, daysOfThisWeek, yearWeek, self);
};
const capitalizeFirstLetter = (str) => `${str.charAt(0).toUpperCase()}${str.substring(1, str.length)}`.replace(/\./, "");
const getLocaleWeekday = (self, i) => {
  const weekday = new Date(0, 0, i).toLocaleString(self.settings.lang, { weekday: "short" });
  self.locale.weekday.push(capitalizeFirstLetter(weekday));
};
const getLocaleMonth = (self, i) => {
  const month = new Date(0, i).toLocaleString(self.settings.lang, { month: "long" });
  self.locale.months.push(capitalizeFirstLetter(month));
};
const getLocale = (self) => {
  if (self.settings.lang === "define" && self.locale.weekday[6] && self.locale.months[11])
    return;
  if (self.settings.lang === "define") {
    throw new Error(messages.notLocale);
  }
  self.locale.weekday = [];
  self.locale.months = [];
  for (let i = 0; i < 7; i++)
    getLocaleWeekday(self, i);
  for (let i = 0; i < 12; i++)
    getLocaleMonth(self, i);
};
const relationshipID = (self) => {
  if (self.type !== "multiple")
    return 0;
  const columnEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.column}`);
  const indexColumn = [...columnEls].findIndex((column) => column.classList.contains(`${self.CSSClasses.columnMonth}`));
  return indexColumn > 0 ? indexColumn : 0;
};
const createMonthEl = (self, templateMonthEl, selectedMonth, monthTitle, monthDisabled, i) => {
  const monthEl = templateMonthEl.cloneNode(false);
  monthEl.className = `${self.CSSClasses.monthsMonth}${selectedMonth === i ? ` ${self.CSSClasses.monthsMonthSelected}` : monthDisabled ? ` ${self.CSSClasses.monthsMonthDisabled}` : ""}`;
  monthEl.title = monthTitle;
  monthEl.innerText = `${self.settings.visibility.monthShort ? monthTitle.substring(0, 3) : monthTitle}`;
  monthEl.dataset.calendarMonth = String(i);
  if (monthDisabled)
    monthEl.tabIndex = -1;
  return monthEl;
};
const createMonths = (self, target) => {
  var _a, _b;
  const selectedMonth = (target == null ? void 0 : target.dataset.calendarSelectedMonth) ? Number(target.dataset.calendarSelectedMonth) : self.selectedMonth;
  const yearEl = (_a = target == null ? void 0 : target.closest(`.${self.CSSClasses.column}`)) == null ? void 0 : _a.querySelector(`.${self.CSSClasses.year}`);
  const selectedYear = yearEl ? Number(yearEl.dataset.calendarSelectedYear) : self.selectedYear;
  self.currentType = "month";
  createDOM(self, target);
  visibilityTitle(self);
  const monthsEl = (_b = self.HTMLElement) == null ? void 0 : _b.querySelector(`.${self.CSSClasses.months}`);
  if (!self.settings.selection.month || !monthsEl)
    return;
  monthsEl.classList.add(self.CSSClasses.monthsSelecting);
  const activeMonthsID = self.jumpMonths > 1 ? self.locale.months.map((_, i) => selectedMonth - self.jumpMonths * i).concat(self.locale.months.map((_, i) => selectedMonth + self.jumpMonths * i)).filter((monthID) => monthID >= 0 && monthID <= 12) : Array.from(Array(12).keys());
  const templateMonthEl = document.createElement("button");
  templateMonthEl.type = "button";
  for (let i = 0; i < 12; i++) {
    const monthTitle = self.locale.months[i];
    const monthDisabled = i < self.dateMin.getMonth() + relationshipID(self) && selectedYear <= self.dateMin.getFullYear() || i > self.dateMax.getMonth() + relationshipID(self) && selectedYear >= self.dateMax.getFullYear() || i !== selectedMonth && !activeMonthsID.includes(i);
    monthsEl.append(createMonthEl(self, templateMonthEl, selectedMonth, monthTitle, monthDisabled, i));
  }
};
const transformTime24 = (hour, keeping) => {
  const hourMap = {
    0: { AM: "00", PM: "12" },
    1: { AM: "01", PM: "13" },
    2: { AM: "02", PM: "14" },
    3: { AM: "03", PM: "15" },
    4: { AM: "04", PM: "16" },
    5: { AM: "05", PM: "17" },
    6: { AM: "06", PM: "18" },
    7: { AM: "07", PM: "19" },
    8: { AM: "08", PM: "20" },
    9: { AM: "09", PM: "21" },
    10: { AM: "10", PM: "22" },
    11: { AM: "11", PM: "23" },
    12: { AM: "12", PM: "12" }
  };
  return hour && keeping ? hourMap[Number(hour)][keeping] : "";
};
const getInputElement = (timeEl, className, name) => timeEl.querySelector(`.${className}${name ? ` input[name="${name}"]` : ""}`);
const addMouseEvents = (range, input, CSSClass) => {
  range.addEventListener("mouseover", () => input.classList.add(CSSClass));
  range.addEventListener("mouseout", () => input.classList.remove(CSSClass));
};
const setTime = (self, e, value, type) => {
  const typeMap = {
    hours: () => {
      self.selectedHours = value;
    },
    minutes: () => {
      self.selectedMinutes = value;
    }
  };
  typeMap[type]();
  self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ""}`;
  if (self.actions.changeTime)
    self.actions.changeTime(e, self);
  if (self.input && self.HTMLInputElement && self.actions.changeToInput)
    self.actions.changeToInput(e, actionsInput(self), self);
};
const changeRange = (self, range, input, btnKeepingTime, type, max) => {
  range.addEventListener("input", (e) => {
    const inputEl = e.target;
    const value = Number(inputEl.value);
    const valueStr = value < 10 ? `0${value}` : `${value}`;
    if (type !== "hours" || max !== 12) {
      input.value = valueStr;
      setTime(self, e, valueStr, type);
      return;
    }
    if (value < max && value > 0) {
      input.value = valueStr;
      self.selectedKeeping = "AM";
      btnKeepingTime.innerText = self.selectedKeeping;
      setTime(self, e, valueStr, type);
    } else {
      if (value === 0) {
        self.selectedKeeping = "AM";
        btnKeepingTime.innerText = "AM";
      } else {
        self.selectedKeeping = "PM";
        btnKeepingTime.innerText = "PM";
      }
      input.value = transformTime12(inputEl.value);
      setTime(self, e, transformTime12(inputEl.value), type);
    }
  });
};
const changeInput = (self, range, input, btnKeepingTime, type, max) => {
  input.addEventListener("change", (e) => {
    const inputEl = e.target;
    const value = Number(inputEl.value);
    const valueStr = value < 10 ? `0${value}` : `${value}`;
    if (type === "hours" && max === 12) {
      if (inputEl.value && value <= max && value > 0) {
        inputEl.value = valueStr;
        range.value = transformTime24(valueStr, self.selectedKeeping);
        setTime(self, e, valueStr, type);
      } else if (inputEl.value && value < 24 && (value > max || value === 0)) {
        if (value === 0) {
          self.selectedKeeping = "AM";
          btnKeepingTime.innerText = "AM";
        } else {
          self.selectedKeeping = "PM";
          btnKeepingTime.innerText = "PM";
        }
        inputEl.value = transformTime12(inputEl.value);
        range.value = valueStr;
        setTime(self, e, transformTime12(inputEl.value), type);
      } else {
        inputEl.value = self.selectedHours;
      }
    } else if (inputEl.value && value <= max && value >= 0) {
      inputEl.value = valueStr;
      range.value = valueStr;
      setTime(self, e, valueStr, type);
    } else if (type === "hours") {
      inputEl.value = self.selectedHours;
    } else if (type === "minutes") {
      inputEl.value = self.selectedMinutes;
    }
  });
};
const clickBtnKeepingTime = (self, btnKeepingTime, rangeHours) => {
  btnKeepingTime.addEventListener("click", (e) => {
    self.selectedKeeping = btnKeepingTime.innerText.includes("AM") ? "PM" : "AM";
    btnKeepingTime.innerText = self.selectedKeeping;
    rangeHours.value = transformTime24(self.selectedHours, self.selectedKeeping);
    setTime(self, e, self.selectedHours, "hours");
  });
};
const changeTime = (self, timeEl, keepingTime) => {
  const maxTime = keepingTime === 24 ? 23 : keepingTime || 12;
  const rangeHours = getInputElement(timeEl, self.CSSClasses.timeRange, "hours");
  const rangeMinutes = getInputElement(timeEl, self.CSSClasses.timeRange, "minutes");
  const inputHours = getInputElement(timeEl, self.CSSClasses.timeHours, "hours");
  const inputMinutes = getInputElement(timeEl, self.CSSClasses.timeMinutes, "minutes");
  const btnKeepingTime = timeEl.querySelector(`.${self.CSSClasses.timeKeeping}`);
  addMouseEvents(rangeHours, inputHours, self.CSSClasses.isFocus);
  addMouseEvents(rangeMinutes, inputMinutes, self.CSSClasses.isFocus);
  changeRange(self, rangeHours, inputHours, btnKeepingTime, "hours", maxTime);
  changeRange(self, rangeMinutes, inputMinutes, btnKeepingTime, "minutes", 0);
  changeInput(self, rangeHours, inputHours, btnKeepingTime, "hours", maxTime);
  changeInput(self, rangeMinutes, inputMinutes, btnKeepingTime, "minutes", 59);
  if (btnKeepingTime)
    clickBtnKeepingTime(self, btnKeepingTime, rangeHours);
};
const InputTime = (name, CSSClass, value, range) => `
	<label class="${CSSClass}">
		<input type="text"
			name="${name}"
			maxlength="2"
			value="${value}"
			${range ? "disabled" : ""}>
	</label>
`;
const RangeTime = (name, CSSClass, min, max, step, value) => `
	<label class="${CSSClass}">
		<input type="range"
			name="${name}"
			min="${min}"
			max="${max}"
			step="${step}"
			value="${value}">
	</label>
`;
const createTime = (self) => {
  const timeEl = self.HTMLElement.querySelector(`.${self.CSSClasses.time}`);
  if (!timeEl)
    return;
  const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
  const range = self.settings.selection.controlTime === "range";
  const [minHour, maxHour] = [0, 23];
  const [minMinutes, maxMinutes] = [0, 59];
  timeEl.innerHTML = `
		<div class="${self.CSSClasses.timeContent}">
			${InputTime("hours", self.CSSClasses.timeHours, self.selectedHours, range)}
			${InputTime("minutes", self.CSSClasses.timeMinutes, self.selectedMinutes, range)}
			${keepingTime === 12 ? `
			<button type="button" class="${self.CSSClasses.timeKeeping}"
				${range ? "disabled" : ""}>${self.selectedKeeping}</button>` : ""}
		</div>
		<div class="${self.CSSClasses.timeRanges}">
			${RangeTime("hours", self.CSSClasses.timeRange, minHour, maxHour, self.settings.selection.stepHours, self.selectedKeeping ? transformTime24(self.selectedHours, self.selectedKeeping) : self.selectedHours)}
			${RangeTime("minutes", self.CSSClasses.timeRange, minMinutes, maxMinutes, self.settings.selection.stepMinutes, self.selectedMinutes)}
		</div>
	`;
  changeTime(self, timeEl, keepingTime);
};
const createWeekDays = (self, weekEl, weekday) => {
  const templateWeekDayEl = document.createElement("b");
  weekEl.innerHTML = "";
  for (let i = 0; i < weekday.length; i++) {
    const weekDayName = weekday[i];
    const weekDayEl = templateWeekDayEl.cloneNode(true);
    weekDayEl.className = `${self.CSSClasses.weekDay}`;
    weekDayEl.className = `${self.CSSClasses.weekDay}${self.settings.visibility.weekend && self.settings.iso8601 ? i === 5 || i === 6 ? ` ${self.CSSClasses.weekDayWeekend}` : "" : self.settings.visibility.weekend && !self.settings.iso8601 ? i === 0 || i === 6 ? ` ${self.CSSClasses.weekDayWeekend}` : "" : ""}`;
    weekDayEl.innerText = `${weekDayName}`;
    weekEl.append(weekDayEl);
  }
};
const createWeek = (self) => {
  const weekday = [...self.locale.weekday];
  if (!weekday[0])
    return;
  if (self.settings.iso8601)
    weekday.push(weekday.shift());
  const weekEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.week}`);
  weekEls.forEach((weekEl) => createWeekDays(self, weekEl, weekday));
};
const themes = ["light", "dark", "system"];
const haveListener = {
  value: false,
  set: () => {
    haveListener.value = true;
  },
  check: () => haveListener.value
};
const getTheme = (htmlEl, attr) => themes.find((t) => {
  var _a;
  return t !== "system" && ((_a = htmlEl.getAttribute(attr)) == null ? void 0 : _a.includes(t));
});
const setTheme = (htmlEl, theme) => {
  htmlEl.dataset.calendarTheme = theme;
};
const trackChangesThemeInSystemSettings = (self, supportDarkTheme) => {
  const setDataAttrTheme = (event) => setTheme(self.HTMLElement, event.matches ? "dark" : "light");
  setDataAttrTheme(supportDarkTheme);
  if (self.settings.visibility.theme !== "system" || haveListener.check())
    return;
  supportDarkTheme.addEventListener("change", setDataAttrTheme);
  haveListener.set();
};
const trackChangesThemeInHTMLElement = (self, htmlEl, attr) => {
  const changes = (mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const record = mutationsList[i];
      if (record.attributeName === attr) {
        const activeTheme = getTheme(htmlEl, attr);
        if (activeTheme)
          setTheme(self.HTMLElement, activeTheme);
        break;
      }
    }
  };
  const observer = new MutationObserver(changes);
  observer.observe(htmlEl, {
    attributes: true
  });
};
const detectTheme = (self, supportDarkTheme) => {
  const detectedThemeEl = self.settings.visibility.themeDetect ? document.querySelector(self.settings.visibility.themeDetect) : null;
  if (!detectedThemeEl) {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
  } else {
    const attr = self.settings.visibility.themeDetect.replace(/^.*\[(.+)\]/g, (_, p1) => p1);
    const activeTheme = getTheme(detectedThemeEl, attr);
    if (activeTheme) {
      setTheme(self.HTMLElement, activeTheme);
      trackChangesThemeInHTMLElement(self, detectedThemeEl, attr);
    } else {
      trackChangesThemeInSystemSettings(self, supportDarkTheme);
    }
  }
};
const changeTheme = (self) => {
  if (!themes.includes(self.settings.visibility.theme))
    throw new Error(messages.incorrectTheme);
  let supportDarkTheme;
  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    supportDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  } else {
    setTheme(self.HTMLElement, "light");
    return;
  }
  const mapThemes = {
    light: () => setTheme(self.HTMLElement, "light"),
    dark: () => setTheme(self.HTMLElement, "dark"),
    system: () => detectTheme(self, supportDarkTheme)
  };
  mapThemes[self.settings.visibility.theme]();
};
const create = (self) => {
  const types = {
    default: () => {
      createWeek(self);
      createDays(self);
    },
    multiple: () => {
      createWeek(self);
      createDays(self);
    },
    month: () => createMonths(self),
    year: () => createYears(self)
  };
  changeTheme(self);
  getLocale(self);
  createDOM(self);
  visibilityTitle(self);
  visibilityArrows(self);
  createTime(self);
  types[self.currentType]();
};
const current = {
  self: null,
  rangeMin: void 0,
  rangeMax: void 0
};
const removeHoverEffect = () => {
  var _a, _b;
  const dayEls = (_b = (_a = current.self) == null ? void 0 : _a.HTMLElement) == null ? void 0 : _b.querySelectorAll(`.${current.self.CSSClasses.dayBtnHover}`);
  dayEls == null ? void 0 : dayEls.forEach((d) => d.classList.remove(current.self.CSSClasses.dayBtnHover));
};
const addHoverEffect = (day) => {
  var _a, _b, _c;
  if (!((_a = current.self) == null ? void 0 : _a.selectedDates))
    return;
  const formattedDate = getDateString(day);
  if ((_b = current.self.rangeDisabled) == null ? void 0 : _b.includes(formattedDate))
    return;
  const dayEls = (_c = current.self.HTMLElement) == null ? void 0 : _c.querySelectorAll(`[data-calendar-day="${formattedDate}"]`);
  dayEls == null ? void 0 : dayEls.forEach((d) => d.classList.add(current.self.CSSClasses.dayBtnHover));
};
const handleHoverDaysEvent = (e) => {
  var _a;
  if (!e.target || !((_a = current.self) == null ? void 0 : _a.selectedDates))
    return;
  removeHoverEffect();
  const dayEl = e.target.closest("[data-calendar-day]");
  if (!dayEl)
    return;
  const formattedDate = dayEl.dataset.calendarDay;
  const startDate = getDate(current.self.selectedDates[0]);
  const endDate = getDate(formattedDate);
  const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];
  for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    addHoverEffect(i);
  }
};
const handleCancelSelectionDays = (e) => {
  if (!current.self || e.key !== "Escape")
    return;
  current.self.selectedDates = [];
  current.self.HTMLElement.removeEventListener("mousemove", handleHoverDaysEvent);
  document.removeEventListener("keydown", handleCancelSelectionDays);
  create(current.self);
};
const updateDisabledDates = () => {
  var _a, _b, _c;
  if (!((_b = (_a = current.self) == null ? void 0 : _a.selectedDates) == null ? void 0 : _b[0]) || !current.self.rangeDisabled || ((_c = current.self.rangeDisabled) == null ? void 0 : _c.length) < 2)
    return;
  const selectedDate = getDate(current.self.selectedDates[0]);
  const [startDate, endDate] = current.self.rangeDisabled.map((dateStr) => getDate(dateStr)).reduce(([start, end], disabledDate) => [
    selectedDate >= disabledDate ? disabledDate : start,
    selectedDate < disabledDate && end === null ? disabledDate : end
  ], [null, null]);
  if (startDate)
    current.self.rangeMin = getDateString(new Date(startDate.setDate(startDate.getDate() + 1)));
  if (endDate)
    current.self.rangeMax = getDateString(new Date(endDate.setDate(endDate.getDate() - 1)));
};
const resetDisabledDates = () => {
  if (!current.self)
    return;
  current.self.rangeMin = current.rangeMin;
  current.self.rangeMax = current.rangeMax;
};
const handleDayRangedSelection = (self, formattedDate) => {
  if (formattedDate) {
    const selectedDateExists = self.selectedDates.length === 1 && self.selectedDates[0].includes(formattedDate);
    self.selectedDates = selectedDateExists && !self.settings.selection.cancelableDay ? [formattedDate] : selectedDateExists && self.settings.selection.cancelableDay ? [] : self.selectedDates.length > 1 ? [formattedDate] : [...self.selectedDates, formattedDate];
  }
  if (self.settings.range.disableGaps) {
    current.rangeMin = current.rangeMin ? current.rangeMin : self.rangeMin;
    current.rangeMax = current.rangeMax ? current.rangeMax : self.rangeMax;
  }
  current.self = self;
  const selectionHandlers = {
    set: () => {
      self.HTMLElement.addEventListener("mousemove", handleHoverDaysEvent);
      document.addEventListener("keydown", handleCancelSelectionDays);
      if (self.settings.range.disableGaps)
        updateDisabledDates();
    },
    reset: () => {
      var _a;
      const [startDate, endDate] = self.selectedDates.map((selectedDate) => getDate(selectedDate));
      const dateIncrement = endDate > startDate ? 1 : -1;
      self.selectedDates = [];
      for (let i = new Date(startDate); endDate > startDate ? i <= endDate : i >= endDate; i.setDate(i.getDate() + dateIncrement)) {
        const date = getDateString(i);
        if (!((_a = self.rangeDisabled) == null ? void 0 : _a.includes(date)))
          self.selectedDates = self.selectedDates ? [...self.selectedDates, date] : [date];
      }
      self.HTMLElement.removeEventListener("mousemove", handleHoverDaysEvent);
      document.removeEventListener("keydown", handleCancelSelectionDays);
      if (self.settings.range.disableGaps)
        resetDisabledDates();
    }
  };
  selectionHandlers[self.selectedDates.length === 1 ? "set" : "reset"]();
};
const handleDaySelection = (self, dayBtnEl, multiple) => {
  if (!dayBtnEl.dataset.calendarDay)
    return;
  const selectedDay = dayBtnEl.dataset.calendarDay;
  const isSelected = dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected);
  if (isSelected && !self.settings.selection.cancelableDay)
    return;
  self.selectedDates = isSelected ? self.selectedDates.filter((date) => date !== selectedDay) : multiple ? [...self.selectedDates, selectedDay] : [selectedDay];
};
const handleClickDay = (self, event) => {
  var _a;
  const element = event.target;
  const closest = (className) => element.closest(`.${className}`);
  const dayBtnEl = closest(self.CSSClasses.dayBtn);
  if (!self.settings.selection.day || !["single", "multiple", "multiple-ranged"].includes(self.settings.selection.day) || !dayBtnEl)
    return;
  const daySelectionActions = {
    single: () => handleDaySelection(self, dayBtnEl, false),
    multiple: () => handleDaySelection(self, dayBtnEl, true),
    "multiple-ranged": () => handleDayRangedSelection(self, dayBtnEl.dataset.calendarDay)
  };
  daySelectionActions[self.settings.selection.day]();
  (_a = self.selectedDates) == null ? void 0 : _a.sort((a, b) => +new Date(a) - +new Date(b));
  if (self.actions.clickDay)
    self.actions.clickDay(event, self);
  const isInitAsInput = self.input && self.HTMLInputElement && self.HTMLElement;
  if (isInitAsInput && self.actions.changeToInput) {
    self.actions.changeToInput(
      event,
      actionsInput(self),
      self
    );
  }
  const dayBtnPrevEl = closest(self.CSSClasses.dayBtnPrev);
  const dayBtnNextEl = closest(self.CSSClasses.dayBtnNext);
  const actionMapping = {
    prev: () => changeMonth(self, "prev"),
    next: () => changeMonth(self, "next"),
    default: () => createDays(self)
  };
  actionMapping[dayBtnPrevEl ? "prev" : dayBtnNextEl ? "next" : "default"]();
};
const getColumnID = (self, columnClass, personalClass, id, dataAttr) => {
  const columnEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.column}`);
  const indexColumn = [...columnEls].findIndex((column) => column.classList.contains(columnClass));
  const currentValue = Number(columnEls[indexColumn].querySelector(`.${personalClass}`).getAttribute(dataAttr));
  if (self.currentType === "month" && indexColumn >= 0)
    return id - indexColumn;
  if (self.currentType === "year" && self.selectedYear !== currentValue)
    return id - 1;
  return id;
};
const handleItemClick = (self, event, type, CSSClasses, itemEl) => {
  const actionByType = {
    year: () => {
      var _a, _b;
      return (_b = (_a = self.actions).clickYear) == null ? void 0 : _b.call(_a, event, self);
    },
    month: () => {
      var _a, _b;
      return (_b = (_a = self.actions).clickMonth) == null ? void 0 : _b.call(_a, event, self);
    }
  };
  const selectByType = {
    year: () => {
      if (self.type === "multiple") {
        const selectedYear = getColumnID(self, self.CSSClasses.columnYear, self.CSSClasses.year, Number(itemEl.dataset.calendarYear), "data-calendar-selected-year");
        const isBeforeMinDate = self.selectedMonth < self.dateMin.getMonth() && selectedYear <= self.dateMin.getFullYear();
        const isAfterMaxDate = self.selectedMonth > self.dateMax.getMonth() && selectedYear >= self.dateMax.getFullYear();
        const isBeforeMinYear = selectedYear < self.dateMin.getFullYear();
        const isAfterMaxYear = selectedYear > self.dateMax.getFullYear();
        if (isBeforeMinDate || isBeforeMinYear) {
          self.selectedYear = self.dateMin.getFullYear();
          self.selectedMonth = self.dateMin.getMonth();
        } else if (isAfterMaxDate || isAfterMaxYear) {
          self.selectedYear = self.dateMax.getFullYear();
          self.selectedMonth = self.dateMax.getMonth();
        } else {
          self.selectedYear = selectedYear;
        }
      } else {
        self.selectedYear = Number(itemEl.dataset.calendarYear);
      }
    },
    month: () => {
      if (self.type === "multiple") {
        const selectedMonth = getColumnID(self, self.CSSClasses.columnMonth, self.CSSClasses.month, Number(itemEl.dataset.calendarMonth), "data-calendar-selected-month");
        const column = itemEl.closest(`.${CSSClasses.column}`);
        const year = column.querySelector(`.${self.CSSClasses.year}`);
        self.selectedYear = Number(year.dataset.calendarSelectedYear);
        const isBeforeMinDate = selectedMonth < self.dateMin.getMonth() && self.selectedYear <= self.dateMin.getFullYear();
        const isAfterMaxDate = selectedMonth > self.dateMax.getMonth() && self.selectedYear >= self.dateMax.getFullYear();
        if (isBeforeMinDate) {
          self.selectedMonth = self.dateMin.getMonth();
        } else if (isAfterMaxDate) {
          self.selectedMonth = self.dateMax.getMonth();
        } else {
          self.selectedMonth = selectedMonth;
        }
      } else {
        self.selectedMonth = Number(itemEl.dataset.calendarMonth);
      }
    }
  };
  selectByType[type]();
  actionByType[type]();
  self.currentType = self.type;
  create(self);
};
const handleClickMonthOrYear = (self, event, type, CSSClasses) => {
  if (!self.settings.selection[type])
    return;
  const element = event.target;
  const closest = (className) => element.closest(`.${className}`);
  const headerEl = closest(CSSClasses.header);
  const itemEl = closest(CSSClasses.item);
  const gridEl = closest(self.CSSClasses.grid);
  const columnEl = closest(self.CSSClasses.column);
  if (self.currentType !== type && headerEl) {
    const createByType = {
      year: () => createYears(self, element),
      month: () => createMonths(self, element)
    };
    createByType[type]();
  } else if (itemEl) {
    handleItemClick(self, event, type, CSSClasses, itemEl);
  } else if (self.currentType === type && headerEl || self.type === "multiple" && self.currentType === type && gridEl && !columnEl) {
    self.currentType = self.type;
    create(self);
  }
};
const handleClick = (self) => {
  self.HTMLElement.addEventListener("click", (e) => {
    handleClickArrow(self, e);
    handleClickWeekNumber(self, e);
    handleClickDay(self, e);
    handleClickMonthOrYear(self, e, "month", {
      header: self.CSSClasses.month,
      item: self.CSSClasses.monthsMonth,
      column: self.CSSClasses.columnMonth
    });
    handleClickMonthOrYear(self, e, "year", {
      header: self.CSSClasses.year,
      item: self.CSSClasses.yearsYear,
      column: self.CSSClasses.columnYear
    });
  });
};
const update = (self, {
  year,
  month,
  dates,
  holidays,
  time
} = {}) => {
  var _a;
  if (!self.isInit)
    throw new Error(messages.notInit);
  const previousSelected = __spreadValues({}, self.settings.selected);
  self.settings.selected.year = year && previousSelected.year ? previousSelected.year : self.selectedYear;
  self.settings.selected.month = month && (previousSelected.month || previousSelected.month === 0) ? previousSelected.month : self.selectedMonth;
  self.settings.selected.holidays = holidays && previousSelected.holidays ? previousSelected.holidays : self.selectedHolidays;
  self.settings.selected.time = time && previousSelected.time ? previousSelected.time : self.selectedTime;
  self.settings.selected.dates = dates === "reset-all" ? [] : dates === "only-first" && ((_a = self.selectedDates) == null ? void 0 : _a[0]) ? [self.selectedDates[0]] : dates === true && previousSelected.dates ? previousSelected.dates : self.selectedDates;
  setVariables(self);
  create(self);
  self.settings.selected = previousSelected;
  if (self.settings.selection.day === "multiple-ranged" && (self.selectedDates.length === 1 || dates === "reset-all"))
    handleDayRangedSelection(self);
};
const setPositionCalendar = (input, calendar) => {
  let top = input.offsetHeight;
  let left = 0;
  for (let el = input; el; el = el.offsetParent) {
    top += el.offsetTop || 0;
    left += el.offsetLeft || 0;
  }
  Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};
const handleInput = (self) => {
  let firstInit = true;
  self.HTMLInputElement = self.HTMLElement;
  const createCalendarToInput = () => {
    const calendar = document.createElement("div");
    calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
    setPositionCalendar(self.HTMLInputElement, calendar);
    self.HTMLElement = calendar;
    document.body.append(self.HTMLElement);
    firstInit = false;
    setTimeout(() => actionsInput(self).show(), 0);
    update(self);
    handleClick(self);
  };
  const documentClickEvent = (e) => {
    var _a;
    if (!self || e.target === self.HTMLInputElement || ((_a = self.HTMLElement) == null ? void 0 : _a.contains(e.target)))
      return;
    if (self.HTMLInputElement && self.HTMLElement)
      actionsInput(self).hide();
    document.removeEventListener("click", documentClickEvent, { capture: true });
  };
  self.HTMLInputElement.addEventListener("click", () => {
    if (firstInit) {
      createCalendarToInput();
    } else {
      setPositionCalendar(self.HTMLInputElement, self.HTMLElement);
      actionsInput(self).show();
    }
    document.addEventListener("click", documentClickEvent, { capture: true });
  });
};
const init = (self) => {
  self.HTMLOriginalElement = self.HTMLElement.cloneNode(true);
  self.isInit = true;
  if (self.input) {
    handleInput(self);
  } else {
    setVariables(self);
    create(self);
    handleClick(self);
  }
};
const destroy = (self) => {
  var _a, _b, _c, _d;
  if (!self.isInit)
    throw new Error(messages.notInit);
  if (self.input) {
    (_b = (_a = self.HTMLElement) == null ? void 0 : _a.parentNode) == null ? void 0 : _b.removeChild(self.HTMLElement);
    (_c = self.HTMLInputElement) == null ? void 0 : _c.replaceWith(self.HTMLOriginalElement);
    self.HTMLInputElement = void 0;
  } else {
    (_d = self.HTMLElement) == null ? void 0 : _d.replaceWith(self.HTMLOriginalElement);
  }
  self.HTMLElement = self.HTMLOriginalElement;
};
class VanillaCalendar extends DefaultOptionsCalendar {
  constructor(selector, options) {
    super();
    __publicField(this, "init", () => init(this));
    __publicField(this, "update", (reset) => update(this, reset));
    __publicField(this, "destroy", () => destroy(this));
    this.HTMLElement = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!this.HTMLElement)
      throw new Error(messages.notFoundSelector(selector));
    if (!options)
      return;
    const replaceProperties = (original, replacement) => {
      Object.keys(replacement).forEach((key) => {
        if (typeof original[key] === "object" && typeof replacement[key] === "object" && !(replacement[key] instanceof Date)) {
          replaceProperties(original[key], replacement[key]);
        } else {
          original[key] = replacement[key];
        }
      });
    };
    replaceProperties(this, options);
  }
}
export {
  VanillaCalendar as default
};
