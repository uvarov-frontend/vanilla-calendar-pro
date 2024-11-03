/*! name: vanilla-calendar-pro v3.0.0-beta.29 | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const errorMessages = {
  notFoundSelector: (selector) => `${selector} is not found, check the first argument passed to new VanillaCalendarPro.`,
  notInit: 'The calendar has not been initialized, please initialize it using the "init()" method first.',
  notLocale: "You specified an incorrect language label or did not specify the required number of values ​​for «locale.weekdays» or «locale.months».",
  incorrectTime: "The value of the time property can be: false, 12 or 24."
};
const destroy = (self) => {
  var _a, _b, _c, _d, _e;
  if (!self.private.isInit)
    throw new Error(errorMessages.notInit);
  if (self.isInput) {
    (_a = self.private.mainElement.parentElement) == null ? void 0 : _a.removeChild(self.private.mainElement);
    (_c = (_b = self.private.inputElement) == null ? void 0 : _b.replaceWith) == null ? void 0 : _c.call(_b, self.private.originalElement);
    self.private.inputElement = void 0;
  } else {
    (_e = (_d = self.private.mainElement).replaceWith) == null ? void 0 : _e.call(_d, self.private.originalElement);
  }
  self.private.mainElement = self.private.originalElement;
  if (self.onDestroy)
    self.onDestroy(self);
};
const hide = (self) => {
  if (!self.private.currentType)
    return;
  self.private.mainElement.dataset.vcCalendarHidden = "";
  if (self.onHide)
    self.onHide(self);
};
function getOffset(element) {
  if (!element || !element.getBoundingClientRect) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
  }
  const box = element.getBoundingClientRect();
  const docElem = document.documentElement;
  return {
    bottom: box.bottom,
    right: box.right,
    top: box.top + window.scrollY - docElem.clientTop,
    left: box.left + window.scrollX - docElem.clientLeft
  };
}
function getViewportDimensions() {
  return {
    vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  };
}
function getWindowScrollPosition() {
  return {
    left: window.scrollX || document.documentElement.scrollLeft || 0,
    top: window.scrollY || document.documentElement.scrollTop || 0
  };
}
function calculateAvailableSpace(element) {
  const { top: scrollTop, left: scrollLeft } = getWindowScrollPosition();
  const { top: elementTop, left: elementLeft } = getOffset(element);
  const { vh: viewportHeight, vw: viewportWidth } = getViewportDimensions();
  const elementOffsetTop = elementTop - scrollTop;
  const elementOffsetLeft = elementLeft - scrollLeft;
  return {
    top: elementOffsetTop,
    bottom: viewportHeight - (elementOffsetTop + element.clientHeight),
    left: elementOffsetLeft,
    right: viewportWidth - (elementOffsetLeft + element.clientWidth)
  };
}
function getAvailablePosition(parentElm, pickerElm, marginOffset = 5) {
  const canShow = {
    top: true,
    bottom: true,
    left: true,
    right: true
  };
  const parentPositions = [];
  if (!pickerElm || !parentElm)
    return { canShow, parentPositions };
  const { bottom: spaceBottom, top: spaceTop } = calculateAvailableSpace(parentElm);
  const { top: pickerOffsetTop, left: pickerOffsetLeft } = getOffset(parentElm);
  const { height: pickerHeight, width: pickerWidth } = pickerElm.getBoundingClientRect();
  const { vh, vw } = getViewportDimensions();
  const bodyCenterCoordinate = { x: vw / 2, y: vh / 2 };
  const positionMappings = [
    { condition: pickerOffsetTop < bodyCenterCoordinate.y, position: "top" },
    { condition: pickerOffsetTop > bodyCenterCoordinate.y, position: "bottom" },
    { condition: pickerOffsetLeft < bodyCenterCoordinate.x, position: "left" },
    { condition: pickerOffsetLeft > bodyCenterCoordinate.x, position: "right" }
  ];
  positionMappings.forEach(({ condition, position }) => {
    if (condition)
      parentPositions.push(position);
  });
  Object.assign(canShow, {
    top: pickerHeight <= spaceTop - marginOffset,
    bottom: pickerHeight <= spaceBottom - marginOffset,
    left: pickerWidth <= pickerOffsetLeft,
    right: pickerWidth <= vw - pickerOffsetLeft
  });
  return { canShow, parentPositions };
}
const handleDay = (self, date, dateInfo, datesEl) => {
  var _a;
  const dateEl = datesEl.querySelector(`[data-vc-date="${date}"]`);
  if (!dateEl)
    return;
  const dateBtnEl = dateEl.querySelector(`[data-vc-date-btn]`);
  if (dateInfo == null ? void 0 : dateInfo.modifier)
    dateBtnEl.classList.add(...dateInfo.modifier.trim().split(" "));
  if (dateInfo == null ? void 0 : dateInfo.html) {
    const datePopup = document.createElement("div");
    datePopup.className = self.styles.datePopup;
    datePopup.dataset.vcDatePopup = "";
    datePopup.innerHTML = self.sanitizerHTML(dateInfo.html);
    dateBtnEl.ariaExpanded = "true";
    dateBtnEl.ariaLabel = `${dateBtnEl.ariaLabel}, ${(_a = datePopup == null ? void 0 : datePopup.textContent) == null ? void 0 : _a.replace(/^\s+|\s+(?=\s)|\s+$/g, "").replace(/&nbsp;/g, " ")}`;
    dateEl.appendChild(datePopup);
    setTimeout(() => {
      if (datePopup) {
        const { canShow } = getAvailablePosition(dateEl, datePopup);
        const extraTopPadding = 5;
        let top = dateEl.offsetHeight;
        let left = 0;
        if (!canShow.bottom)
          top = -datePopup.offsetHeight - extraTopPadding;
        if (canShow.left && !canShow.right)
          left = dateEl.offsetWidth - datePopup.offsetWidth / 2;
        if (!canShow.left && canShow.right)
          left = datePopup.offsetWidth / 2;
        Object.assign(datePopup.style, { left: `${left}px`, top: `${top}px` });
      }
    });
  }
};
const createDatePopup = (self, datesEl) => {
  var _a;
  if (!self.popups)
    return;
  (_a = Object.entries(self.popups)) == null ? void 0 : _a.forEach(([date, dateInfo]) => handleDay(self, date, dateInfo, datesEl));
};
const getDate = (date) => /* @__PURE__ */ new Date(`${date}T00:00:00.000Z`);
const getDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const updateAttribute = (el, condition, attr, value = "") => {
  if (condition) {
    el.setAttribute(attr, value);
  } else if (el.getAttribute(attr) === value) {
    el.removeAttribute(attr);
  }
};
const setDateModifier = (self, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType) => {
  var _a, _b, _c, _d;
  const isDisabled = getDate(self.private.displayDateMin) > getDate(dateStr) || getDate(self.private.displayDateMax) < getDate(dateStr) || ((_a = self.private.disableDates) == null ? void 0 : _a.includes(dateStr)) || !self.selectionMonthsMode && monthType !== "current" || !self.selectionYearsMode && getDate(dateStr).getFullYear() !== currentYear;
  updateAttribute(dateEl, isDisabled, "data-vc-date-disabled");
  if (dateBtnEl)
    updateAttribute(dateBtnEl, isDisabled, "aria-disabled", "true");
  if (dateBtnEl)
    updateAttribute(dateBtnEl, isDisabled, "tabindex", "-1");
  updateAttribute(dateEl, !self.disableToday && getDateString(self.dateToday) === dateStr, "data-vc-date-today");
  updateAttribute(dateEl, !self.disableToday && getDateString(self.dateToday) === dateStr, "aria-current", "date");
  updateAttribute(dateEl, (_b = self.selectedWeekends) == null ? void 0 : _b.includes(dayWeekID), "data-vc-date-weekend");
  updateAttribute(dateEl, (_c = self.selectedHolidays) == null ? void 0 : _c.includes(dateStr), "data-vc-date-holiday");
  if ((_d = self.private.selectedDates) == null ? void 0 : _d.includes(dateStr)) {
    dateEl.setAttribute("data-vc-date-selected", "");
    if (dateBtnEl)
      dateBtnEl.setAttribute("aria-selected", "true");
    if (self.private.selectedDates.length > 1 && self.selectionDatesMode === "multiple-ranged") {
      if (self.private.selectedDates[0] === dateStr)
        dateEl.setAttribute("data-vc-date-selected", "first");
      if (self.private.selectedDates[self.private.selectedDates.length - 1] === dateStr)
        dateEl.setAttribute("data-vc-date-selected", "last");
      if (self.private.selectedDates[0] !== dateStr && self.private.selectedDates[self.private.selectedDates.length - 1] !== dateStr)
        dateEl.setAttribute("data-vc-date-selected", "middle");
    }
  } else if (dateEl.hasAttribute("data-vc-date-selected")) {
    dateEl.removeAttribute("data-vc-date-selected");
    if (dateBtnEl)
      dateBtnEl.removeAttribute("aria-selected");
  }
  if (!self.private.disableDates.includes(dateStr) && self.enableEdgeDatesOnly && self.private.selectedDates.length > 1 && self.selectionDatesMode === "multiple-ranged") {
    const firstDate = getDate(self.private.selectedDates[0]);
    const lastDate = getDate(self.private.selectedDates[self.private.selectedDates.length - 1]);
    const currentDate = getDate(dateStr);
    updateAttribute(dateEl, currentDate > firstDate && currentDate < lastDate, "data-vc-date-selected", "middle");
  }
};
const getLocaleString = (dateStr, locale, options) => (/* @__PURE__ */ new Date(`${dateStr}T00:00:00.000Z`)).toLocaleString(locale, options);
const getWeekNumber = (date, weekStartDay) => {
  const currentDate = getDate(date);
  const currentDay = (currentDate.getDay() - weekStartDay + 7) % 7;
  currentDate.setDate(currentDate.getDate() + 4 - currentDay);
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((+currentDate - +yearStart) / 864e5 + 1) / 7);
  return {
    year: currentDate.getFullYear(),
    week: weekNumber
  };
};
const addWeekNumberForDate = (self, dateEl, dateStr) => {
  const weekNumber = getWeekNumber(dateStr, self.firstWeekday);
  if (!weekNumber)
    return;
  dateEl.dataset.vcDateWeekNumber = String(weekNumber.week);
};
const setDaysAsDisabled = (self, date, dayWeekID) => {
  var _a, _b, _c, _d, _e;
  const isDisableWeekday = (_a = self.disableWeekdays) == null ? void 0 : _a.includes(dayWeekID);
  const isDisableAllDaysAndIsRangeEnabled = self.disableAllDates && !!((_b = self.private.enableDates) == null ? void 0 : _b[0]);
  if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !((_c = self.private.enableDates) == null ? void 0 : _c.includes(date)) && !((_d = self.private.disableDates) == null ? void 0 : _d.includes(date))) {
    self.private.disableDates.push(date);
    (_e = self.private.disableDates) == null ? void 0 : _e.sort((a, b) => +new Date(a) - +new Date(b));
  }
};
const createDate = (self, currentYear, datesEl, dateID, dateStr, monthType) => {
  const dayWeekID = getDate(dateStr).getDay();
  const localeDate = typeof self.locale === "string" && self.locale.length ? self.locale : "en";
  const dateEl = document.createElement("div");
  dateEl.className = self.styles.date;
  dateEl.dataset.vcDate = dateStr;
  dateEl.dataset.vcDateMonth = monthType;
  dateEl.dataset.vcDateWeekDay = String(dayWeekID);
  let dateBtnEl = void 0;
  if (monthType !== "current" ? self.displayDatesOutside : true) {
    dateBtnEl = document.createElement("button");
    dateBtnEl.className = self.styles.dateBtn;
    dateBtnEl.type = "button";
    dateBtnEl.role = "gridcell";
    dateBtnEl.ariaLabel = getLocaleString(dateStr, localeDate, { dateStyle: "long", timeZone: "UTC" });
    dateBtnEl.dataset.vcDateBtn = "";
    dateBtnEl.innerText = String(dateID);
    dateEl.appendChild(dateBtnEl);
  }
  if (self.enableWeekNumbers)
    addWeekNumberForDate(self, dateEl, dateStr);
  setDaysAsDisabled(self, dateStr, dayWeekID);
  setDateModifier(self, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType);
  datesEl.appendChild(dateEl);
  if (self.onCreateDateEls)
    self.onCreateDateEls(dateEl, self);
};
const createDatesFromCurrentMonth = (self, datesEl, days, currentYear, currentMonth) => {
  for (let dateID = 1; dateID <= days; dateID++) {
    const date = new Date(currentYear, currentMonth, dateID);
    createDate(self, currentYear, datesEl, dateID, getDateString(date), "current");
  }
};
const createDatesFromNextMonth = (self, daysEl, days, currentYear, currentMonth, firstDayWeek) => {
  const currentTotalDays = firstDayWeek + days;
  const rowsDays = Math.ceil(currentTotalDays / 7);
  const daysNextMonth = 7 * rowsDays - currentTotalDays;
  const year = currentMonth + 1 === 12 ? currentYear + 1 : currentYear;
  const month = currentMonth + 1 === 12 ? "01" : currentMonth + 2 < 10 ? `0${currentMonth + 2}` : currentMonth + 2;
  for (let i = 1; i <= daysNextMonth; i++) {
    const day = i < 10 ? `0${i}` : String(i);
    const dateStr = `${year}-${month}-${day}`;
    createDate(self, currentYear, daysEl, i, dateStr, "next");
  }
};
const createDatesFromPrevMonth = (self, datesEl, currentYear, currentMonth, firstDayWeek) => {
  let date = new Date(currentYear, currentMonth, 0).getDate() - (firstDayWeek - 1);
  const year = currentMonth === 0 ? currentYear - 1 : currentYear;
  const month = currentMonth === 0 ? 12 : currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  for (let i = firstDayWeek; i > 0; i--, date++) {
    const dateStr = `${year}-${month}-${date}`;
    createDate(self, currentYear, datesEl, date, dateStr, "prev");
  }
};
const createWeekNumbers = (self, firstDayWeek, days, weekNumbersEl, datesEl) => {
  if (!self.enableWeekNumbers)
    return;
  weekNumbersEl.textContent = "";
  const weekNumbersTitleEl = document.createElement("b");
  weekNumbersTitleEl.className = self.styles.weekNumbersTitle;
  weekNumbersTitleEl.innerText = "#";
  weekNumbersTitleEl.dataset.vcWeekNumbers = "title";
  weekNumbersEl.appendChild(weekNumbersTitleEl);
  const weekNumbersContentEl = document.createElement("div");
  weekNumbersContentEl.className = self.styles.weekNumbersContent;
  weekNumbersContentEl.dataset.vcWeekNumbers = "content";
  weekNumbersEl.appendChild(weekNumbersContentEl);
  const templateWeekNumberEl = document.createElement("button");
  templateWeekNumberEl.type = "button";
  templateWeekNumberEl.className = self.styles.weekNumber;
  const dateBtnEl = datesEl.querySelectorAll("[data-vc-date]");
  const weeksCount = Math.ceil((firstDayWeek + days) / 7);
  for (let i = 0; i < weeksCount; i++) {
    const index = i === 0 ? 6 : i * 7;
    const date = dateBtnEl[index].dataset.vcDate;
    const weekNumber = getWeekNumber(date, self.firstWeekday);
    if (!weekNumber)
      return;
    const weekNumberEl = templateWeekNumberEl.cloneNode(true);
    weekNumberEl.innerText = String(weekNumber.week);
    weekNumberEl.dataset.vcWeekNumber = String(weekNumber.week);
    weekNumberEl.dataset.vcWeekYear = String(weekNumber.year);
    weekNumberEl.role = "rowheader";
    weekNumberEl.ariaLabel = `${weekNumber.week}`;
    weekNumbersContentEl.appendChild(weekNumberEl);
  }
};
const createDates = (self) => {
  const initDate = new Date(self.private.selectedYear, self.private.selectedMonth, 1);
  const datesEls = self.private.mainElement.querySelectorAll('[data-vc="dates"]');
  const weekNumbersEls = self.private.mainElement.querySelectorAll('[data-vc-week="numbers"]');
  datesEls.forEach((dateEl, index) => {
    if (!self.selectionDatesMode)
      dateEl.dataset.vcDatesDisabled = "";
    dateEl.textContent = "";
    const currentDate = new Date(initDate);
    currentDate.setMonth(currentDate.getMonth() + index);
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDayWeek = (new Date(currentYear, currentMonth, 1).getDay() - self.firstWeekday + 7) % 7;
    const days = new Date(currentYear, currentMonth + 1, 0).getDate();
    createDatesFromPrevMonth(self, dateEl, currentYear, currentMonth, firstDayWeek);
    createDatesFromCurrentMonth(self, dateEl, days, currentYear, currentMonth);
    createDatesFromNextMonth(self, dateEl, days, currentYear, currentMonth, firstDayWeek);
    createDatePopup(self, dateEl);
    createWeekNumbers(self, firstDayWeek, days, weekNumbersEls[index], dateEl);
  });
};
const layoutDefault = (self) => `
  <div class="${self.styles.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [month] />
    <div class="${self.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${self.styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${self.styles.content}" data-vc="content">
      <#Week />
      <#Dates />
    </div>
  </div>
  <#ControlTime />
`;
const layoutMonths = (self) => `
  <div class="${self.styles.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <div class="${self.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${self.styles.wrapper}" data-vc="wrapper">
    <div class="${self.styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`;
const layoutMultiple = (self) => `
  <div class="${self.styles.controls}" data-vc="controls" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${self.styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${self.styles.column}" data-vc="column" role="region">
        <div class="${self.styles.header}" data-vc="header">
          <div class="${self.styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${self.styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${self.styles.content}" data-vc="content">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
  </div>
  <#ControlTime />
`;
const layoutYears = (self) => `
  <div class="${self.styles.header}" data-vc="header" role="toolbar" aria-label="${self.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${self.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${self.styles.wrapper}" data-vc="wrapper">
    <div class="${self.styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`;
const getCorrectNumberOfMonths = (self) => self.viewType === "multiple" ? self.displayMonthsCount === 1 ? 2 : self.displayMonthsCount > 12 ? 12 : self.displayMonthsCount : 1;
const ArrowNext = (self, type) => `<button type="button" class="${self.styles.arrowNext}" data-vc-arrow="next" aria-label="${self.labels.arrowNext[type]}"></button>`;
const ArrowPrev = (self, type) => `<button type="button" class="${self.styles.arrowPrev}" data-vc-arrow="prev" aria-label="${self.labels.arrowPrev[type]}"></button>`;
const ControlTime = (self) => self.selectionTimeMode ? `<div class="${self.styles.time}" data-vc="time" role="group" aria-label="${self.labels.selectingTime}"></div>` : "";
const Dates = (self) => `<div class="${self.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${self.labels.dates}" ${self.viewType === "multiple" ? "aria-multiselectable" : ""}></div>`;
const Month = (self) => `<button type="button" class="${self.styles.month}" data-vc="month"></button>`;
const Months = (self) => `<div class="${self.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${self.labels.months}"></div>`;
const Week = (self) => `<div class="${self.styles.week}" data-vc="week" role="row" aria-label="${self.labels.week}"></div>`;
const WeekNumbers = (self) => self.enableWeekNumbers ? `<div class="${self.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${self.labels.weekNumber}"></div>` : "";
const Year = (self) => `<button type="button" class="${self.styles.year}" data-vc="year"></button>`;
const Years = (self) => `<div class="${self.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${self.labels.years}"></div>`;
const components = { ArrowNext, ArrowPrev, ControlTime, Dates, Month, Months, Week, WeekNumbers, Year, Years };
const getComponent = (pattern) => components[pattern];
const parseLayout = (self, template) => {
  return template.replace(/[\n\t]/g, "").replace(/<#(?!\/?Multiple)(.*?)>/g, (_, tagContent) => {
    const type = (tagContent.match(/\[(.*?)\]/) || [])[1];
    const componentName = tagContent.replace(/[/\s\n\t]|\[(.*?)\]/g, "");
    const component = getComponent(componentName);
    const htmlContent = component ? component(self, type != null ? type : null) : "";
    return self.sanitizerHTML(htmlContent);
  }).replace(/[\n\t]/g, "");
};
const parseMultipleLayout = (self, template) => {
  return template.replace(new RegExp("<#Multiple>(.*?)<#\\/Multiple>", "gs"), (_, content) => {
    const repeatedContent = Array(getCorrectNumberOfMonths(self)).fill(content).join("");
    return self.sanitizerHTML(repeatedContent);
  }).replace(/[\n\t]/g, "");
};
const createLayouts = (self, target) => {
  const templateMap = {
    default: layoutDefault,
    month: layoutMonths,
    year: layoutYears,
    multiple: layoutMultiple
  };
  Object.keys(templateMap).forEach((key) => {
    const typedKey = key;
    if (!self.layouts[typedKey].length)
      self.layouts[typedKey] = templateMap[typedKey](self);
  });
  self.private.mainElement.className = self.styles.calendar;
  self.private.mainElement.dataset.vc = "calendar";
  self.private.mainElement.dataset.vcType = self.private.currentType;
  self.private.mainElement.role = "application";
  self.private.mainElement.tabIndex = 0;
  self.private.mainElement.ariaLabel = self.labels.application;
  if (self.private.currentType === "multiple" && getCorrectNumberOfMonths(self)) {
    self.private.mainElement.innerHTML = parseMultipleLayout(self, parseLayout(self, self.layouts[self.private.currentType]));
    return;
  }
  if (self.viewType === "multiple" && target) {
    const controlsEl = self.private.mainElement.querySelector('[data-vc="controls"]');
    const gridEl = self.private.mainElement.querySelector('[data-vc="grid"]');
    const columnEl = target.closest('[data-vc="column"]');
    if (controlsEl)
      self.private.mainElement.removeChild(controlsEl);
    if (gridEl)
      gridEl.dataset.vcGrid = "hidden";
    if (columnEl)
      columnEl.dataset.vcColumn = self.private.currentType;
    if (columnEl)
      columnEl.innerHTML = parseLayout(self, self.layouts[self.private.currentType]);
    return;
  }
  self.private.mainElement.innerHTML = parseLayout(self, self.layouts[self.private.currentType]);
};
const setVisibilityArrows = (arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden) => {
  arrowPrevEl.style.visibility = isArrowPrevHidden ? "hidden" : "";
  arrowNextEl.style.visibility = isArrowNextHidden ? "hidden" : "";
};
const handleDefaultType = (self, arrowPrevEl, arrowNextEl) => {
  const currentSelectedDate = getDate(getDateString(new Date(self.private.selectedYear, self.private.selectedMonth, 1)));
  const jumpDateMin = new Date(currentSelectedDate.getTime());
  const jumpDateMax = new Date(currentSelectedDate.getTime());
  jumpDateMin.setMonth(jumpDateMin.getMonth() - self.monthsToSwitch);
  jumpDateMax.setMonth(jumpDateMax.getMonth() + self.monthsToSwitch);
  if (!self.selectionYearsMode) {
    self.private.dateMin.setFullYear(currentSelectedDate.getFullYear());
    self.private.dateMax.setFullYear(currentSelectedDate.getFullYear());
  }
  const isArrowPrevHidden = !self.selectionMonthsMode || jumpDateMin.getFullYear() < self.private.dateMin.getFullYear() || jumpDateMin.getFullYear() === self.private.dateMin.getFullYear() && jumpDateMin.getMonth() < self.private.dateMin.getMonth();
  const isArrowNextHidden = !self.selectionMonthsMode || jumpDateMax.getFullYear() > self.private.dateMax.getFullYear() || jumpDateMax.getFullYear() === self.private.dateMax.getFullYear() && jumpDateMax.getMonth() > self.private.dateMax.getMonth();
  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};
const handleYearType = (self, arrowPrevEl, arrowNextEl) => {
  const isArrowPrevHidden = !!(self.private.dateMin.getFullYear() && self.private.displayYear - 7 <= self.private.dateMin.getFullYear());
  const isArrowNextHidden = !!(self.private.dateMax.getFullYear() && self.private.displayYear + 7 >= self.private.dateMax.getFullYear());
  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};
const visibilityArrows = (self) => {
  if (self.private.currentType === "month")
    return;
  const arrowPrevEl = self.private.mainElement.querySelector('[data-vc-arrow="prev"]');
  const arrowNextEl = self.private.mainElement.querySelector('[data-vc-arrow="next"]');
  if (!arrowPrevEl || !arrowNextEl)
    return;
  const updateType = {
    default: () => handleDefaultType(self, arrowPrevEl, arrowNextEl),
    year: () => handleYearType(self, arrowPrevEl, arrowNextEl)
  };
  updateType[self.private.currentType === "multiple" ? "default" : self.private.currentType]();
};
const visibilityHandler = (self, el, index, initDate, type) => {
  const yearID = new Date(initDate.setFullYear(self.private.selectedYear, self.private.selectedMonth + index)).getFullYear();
  const monthID = new Date(initDate.setMonth(self.private.selectedMonth + index)).getMonth();
  const monthLabel = self.private.locale.months.long[monthID];
  const columnEl = el.closest('[data-vc="column"]');
  if (columnEl)
    columnEl.ariaLabel = `${monthLabel} ${yearID}`;
  const value = {
    month: { id: monthID, label: monthLabel },
    year: { id: yearID, label: yearID }
  };
  el.innerText = String(value[type].label);
  el.dataset[`vc${type.charAt(0).toUpperCase() + type.slice(1)}`] = String(value[type].id);
  el.ariaLabel = `${self.labels[type]} ${value[type].label}`;
  const typesMap = { month: self.selectionMonthsMode, year: self.selectionYearsMode };
  const isDisabled = typesMap[type] === false || typesMap[type] === "only-arrows";
  if (isDisabled)
    el.tabIndex = -1;
  el.disabled = isDisabled;
};
const visibilityTitle = (self) => {
  const monthEls = self.private.mainElement.querySelectorAll('[data-vc="month"]');
  const yearEls = self.private.mainElement.querySelectorAll('[data-vc="year"]');
  const initDate = new Date(self.private.selectedYear, self.private.selectedMonth, 1);
  [monthEls, yearEls].forEach((els) => els == null ? void 0 : els.forEach((el, index) => visibilityHandler(self, el, index, initDate, el.dataset.vc)));
};
const setYearModifier = (self, el, type, selected, reset2) => {
  var _a;
  const selectors = {
    month: "[data-vc-months-month]",
    year: "[data-vc-years-year]"
  };
  const attributes = {
    month: {
      selected: "data-vc-months-month-selected",
      aria: "aria-selected",
      value: "vcMonthsMonth",
      selectedProperty: "selectedMonth"
    },
    year: {
      selected: "data-vc-years-year-selected",
      aria: "aria-selected",
      value: "vcYearsYear",
      selectedProperty: "selectedYear"
    }
  };
  if (reset2) {
    (_a = self.private.mainElement.querySelectorAll(selectors[type])) == null ? void 0 : _a.forEach((el2) => {
      el2.removeAttribute(attributes[type].selected);
      el2.removeAttribute(attributes[type].aria);
    });
    self.private[attributes[type].selectedProperty] = Number(el.dataset[attributes[type].value]);
    visibilityTitle(self);
    if (type === "year")
      visibilityArrows(self);
  }
  if (selected) {
    el.setAttribute(attributes[type].selected, "");
    el.setAttribute(attributes[type].aria, "true");
  }
};
const relationshipID = (self) => {
  if (self.viewType !== "multiple")
    return 0;
  const columnEls = self.private.mainElement.querySelectorAll('[data-vc="column"]');
  const indexColumn = Array.from(columnEls).findIndex((column) => column.closest('[data-vc-column="month"]'));
  return indexColumn > 0 ? indexColumn : 0;
};
const createMonthEl = (self, templateEl, selected, titleShort, titleLong, disabled, id) => {
  const monthEl = templateEl.cloneNode(false);
  monthEl.className = self.styles.monthsMonth;
  monthEl.innerText = titleShort;
  monthEl.ariaLabel = titleLong;
  monthEl.role = "gridcell";
  monthEl.dataset.vcMonthsMonth = `${id}`;
  if (disabled)
    monthEl.ariaDisabled = "true";
  if (disabled)
    monthEl.tabIndex = -1;
  monthEl.disabled = disabled;
  setYearModifier(self, monthEl, "month", selected === id, false);
  return monthEl;
};
const createMonths = (self, target) => {
  var _a, _b;
  const yearEl = (_a = target == null ? void 0 : target.closest('[data-vc="header"]')) == null ? void 0 : _a.querySelector('[data-vc="year"]');
  const selectedYear = yearEl ? Number(yearEl.dataset.vcYear) : self.private.selectedYear;
  const selectedMonth = (target == null ? void 0 : target.dataset.vcMonth) ? Number(target.dataset.vcMonth) : self.private.selectedMonth;
  self.private.currentType = "month";
  createLayouts(self, target);
  visibilityTitle(self);
  const monthsEl = self.private.mainElement.querySelector('[data-vc="months"]');
  if (!self.selectionMonthsMode || !monthsEl)
    return;
  const activeMonthsID = self.monthsToSwitch > 1 ? self.private.locale.months.long.map((_, i) => selectedMonth - self.monthsToSwitch * i).concat(self.private.locale.months.long.map((_, i) => selectedMonth + self.monthsToSwitch * i)).filter((monthID) => monthID >= 0 && monthID <= 12) : Array.from(Array(12).keys());
  const templateMonthEl = document.createElement("button");
  templateMonthEl.type = "button";
  for (let i = 0; i < 12; i++) {
    const monthDisabled = i < self.private.dateMin.getMonth() + relationshipID(self) && selectedYear <= self.private.dateMin.getFullYear() || i > self.private.dateMax.getMonth() + relationshipID(self) && selectedYear >= self.private.dateMax.getFullYear() || i !== selectedMonth && !activeMonthsID.includes(i);
    const monthEl = createMonthEl(
      self,
      templateMonthEl,
      selectedMonth,
      self.private.locale.months.short[i],
      self.private.locale.months.long[i],
      monthDisabled,
      i
    );
    monthsEl.appendChild(monthEl);
    if (self.onCreateMonthEls)
      self.onCreateMonthEls(monthEl, self);
  }
  (_b = self.private.mainElement.querySelector(`[data-vc-months-month]`)) == null ? void 0 : _b.focus();
};
const TimeInput = (name, CSSClass, labels2, value, range) => `
  <label class="${CSSClass}" data-vc-time-input="${name}">
    <input type="text" name="${name}" maxlength="2" aria-label="${labels2[`input${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}" ${range ? "disabled" : ""}>
  </label>
`;
const TimeRange = (name, CSSClass, labels2, min, max, step, value) => `
  <label class="${CSSClass}" data-vc-time-range="${name}">
    <input type="range" name="${name}" min="${min}" max="${max}" step="${step}" aria-label="${labels2[`range${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}">
  </label>
`;
const handleActions = (self, event, value, type) => {
  const typeMap = {
    hour: () => self.private.selectedHours = value,
    minute: () => self.private.selectedMinutes = value
  };
  typeMap[type]();
  self.private.selectedTime = `${self.private.selectedHours}:${self.private.selectedMinutes}${self.private.selectedKeeping ? ` ${self.private.selectedKeeping}` : ""}`;
  if (self.onChangeTime)
    self.onChangeTime(event, self, false);
  if (self.isInput && self.private.inputElement && self.private.mainElement && self.onChangeToInput)
    self.onChangeToInput(event, self);
};
const transformTime24 = (hour, keeping) => {
  var _a;
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
    12: { AM: "00", PM: "12" }
  };
  return ((_a = hourMap[Number(hour)]) == null ? void 0 : _a[keeping]) || String(hour);
};
const handleClickKeepingTime = (self, keepingTimeEl, rangeHourEl, max, min) => {
  const handleClickKeepingTimeAction = (event) => {
    const newSelectedKeeping = self.private.selectedKeeping === "AM" ? "PM" : "AM";
    const hour = transformTime24(self.private.selectedHours, newSelectedKeeping);
    if (!(Number(hour) <= max && Number(hour) >= min)) {
      if (self.onChangeTime)
        self.onChangeTime(event, self, true);
      return;
    }
    self.private.selectedKeeping = newSelectedKeeping;
    rangeHourEl.value = hour;
    handleActions(self, event, self.private.selectedHours, "hour");
    keepingTimeEl.ariaLabel = `${self.labels.btnKeeping} ${self.private.selectedKeeping}`;
    keepingTimeEl.innerText = self.private.selectedKeeping;
  };
  keepingTimeEl.addEventListener("click", handleClickKeepingTimeAction);
  return () => {
    keepingTimeEl.removeEventListener("click", handleClickKeepingTimeAction);
  };
};
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
  return hourMap[Number(hour)] || String(hour);
};
const updateInputAndRange = (inputEl, rangeEl, valueInput, valueRange) => {
  inputEl.value = valueInput;
  rangeEl.value = valueRange;
};
const updateKeepingTime$1 = (self, keepingTimeEl, keeping) => {
  if (!keepingTimeEl || !keeping)
    return;
  self.private.selectedKeeping = keeping;
  keepingTimeEl.innerText = keeping;
};
const handleInput$1 = (self, rangeEl, inputEl, keepingTimeEl, type, max, min) => {
  const handlers = {
    hour: (value, valueStr, event) => {
      if (!self.selectionTimeMode)
        return;
      const timeMap = {
        12: () => {
          if (!self.private.selectedKeeping)
            return;
          const correctValue = Number(transformTime24(valueStr, self.private.selectedKeeping));
          if (!(correctValue <= max && correctValue >= min)) {
            updateInputAndRange(inputEl, rangeEl, self.private.selectedHours, self.private.selectedHours);
            if (self.onChangeTime)
              self.onChangeTime(event, self, true);
            return;
          }
          updateInputAndRange(inputEl, rangeEl, transformTime12(valueStr), transformTime24(valueStr, self.private.selectedKeeping));
          if (value > 12)
            updateKeepingTime$1(self, keepingTimeEl, "PM");
          handleActions(self, event, transformTime12(valueStr), type);
        },
        24: () => {
          if (!(value <= max && value >= min)) {
            updateInputAndRange(inputEl, rangeEl, self.private.selectedHours, self.private.selectedHours);
            if (self.onChangeTime)
              self.onChangeTime(event, self, true);
            return;
          }
          updateInputAndRange(inputEl, rangeEl, valueStr, valueStr);
          handleActions(self, event, valueStr, type);
        }
      };
      timeMap[self.selectionTimeMode]();
    },
    minute: (value, valueStr, event) => {
      if (!(value <= max && value >= min)) {
        inputEl.value = self.private.selectedMinutes;
        if (self.onChangeTime)
          self.onChangeTime(event, self, true);
        return;
      }
      inputEl.value = valueStr;
      rangeEl.value = valueStr;
      handleActions(self, event, valueStr, type);
    }
  };
  const handleInputAction = (event) => {
    const value = Number(inputEl.value);
    const valueStr = inputEl.value.padStart(2, "0");
    if (handlers[type])
      handlers[type](value, valueStr, event);
  };
  inputEl.addEventListener("change", handleInputAction);
  return () => {
    inputEl.removeEventListener("change", handleInputAction);
  };
};
const updateInputAndTime = (self, inputEl, event, type, value) => {
  inputEl.value = value;
  handleActions(self, event, value, type);
};
const updateKeepingTime = (self, keepingTimeEl, keeping) => {
  if (!keepingTimeEl)
    return;
  self.private.selectedKeeping = keeping;
  keepingTimeEl.innerText = keeping;
};
const handleRange = (self, rangeEl, inputEl, keepingTimeEl, type) => {
  const handleRangeAction = (event) => {
    const value = Number(rangeEl.value);
    const valueStr = rangeEl.value.padStart(2, "0");
    const isHourType = type === "hour";
    const isFormat24 = self.selectionTimeMode === 24;
    const isAM = value > 0 && value < 12;
    if (isHourType && !isFormat24)
      updateKeepingTime(self, keepingTimeEl, value === 0 || isAM ? "AM" : "PM");
    updateInputAndTime(self, inputEl, event, type, isHourType && !isFormat24 && !isAM ? transformTime12(rangeEl.value) : valueStr);
  };
  rangeEl.addEventListener("input", handleRangeAction);
  return () => {
    rangeEl.removeEventListener("input", handleRangeAction);
  };
};
const handleMouseOver = (inputEl) => inputEl.setAttribute("data-vc-input-focus", "");
const handleMouseOut = (inputEl) => inputEl.removeAttribute("data-vc-input-focus");
const handleTime = (self, timeEl) => {
  const rangeHourEl = timeEl.querySelector('[data-vc-time-range="hour"] input[name="hour"]');
  const rangeMinuteEl = timeEl.querySelector('[data-vc-time-range="minute"] input[name="minute"]');
  const inputHourEl = timeEl.querySelector('[data-vc-time-input="hour"] input[name="hour"]');
  const inputMinuteEl = timeEl.querySelector('[data-vc-time-input="minute"] input[name="minute"]');
  const keepingTimeEl = timeEl.querySelector('[data-vc-time="keeping"]');
  if (!rangeHourEl || !rangeMinuteEl || !inputHourEl || !inputMinuteEl)
    return;
  const handleMouseOverEvent = (event) => {
    if (event.target === rangeHourEl)
      handleMouseOver(inputHourEl);
    if (event.target === rangeMinuteEl)
      handleMouseOver(inputMinuteEl);
  };
  const handleMouseOutEvent = (event) => {
    if (event.target === rangeHourEl)
      handleMouseOut(inputHourEl);
    if (event.target === rangeMinuteEl)
      handleMouseOut(inputMinuteEl);
  };
  timeEl.addEventListener("mouseover", handleMouseOverEvent);
  timeEl.addEventListener("mouseout", handleMouseOutEvent);
  handleInput$1(self, rangeHourEl, inputHourEl, keepingTimeEl, "hour", self.timeMaxHour, self.timeMinHour);
  handleInput$1(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, "minute", self.timeMaxMinute, self.timeMinMinute);
  handleRange(self, rangeHourEl, inputHourEl, keepingTimeEl, "hour");
  handleRange(self, rangeMinuteEl, inputMinuteEl, keepingTimeEl, "minute");
  if (keepingTimeEl)
    handleClickKeepingTime(self, keepingTimeEl, rangeHourEl, self.timeMaxHour, self.timeMinHour);
  return () => {
    timeEl.removeEventListener("mouseover", handleMouseOverEvent);
    timeEl.removeEventListener("mouseout", handleMouseOutEvent);
  };
};
const createTime = (self) => {
  const timeEl = self.private.mainElement.querySelector('[data-vc="time"]');
  if (!self.selectionTimeMode || !timeEl)
    return;
  const [minHour, maxHour] = [self.timeMinHour, self.timeMaxHour];
  const [minMinutes, maxMinutes] = [self.timeMinMinute, self.timeMaxMinute];
  const valueHours = self.private.selectedKeeping ? transformTime24(self.private.selectedHours, self.private.selectedKeeping) : self.private.selectedHours;
  const range = self.timeControls === "range";
  const btnKeeping = (selectedKeeping) => `<button type="button" class="${self.styles.timeKeeping}" aria-label="${self.labels.btnKeeping} ${selectedKeeping}" data-vc-time="keeping" ${range ? "disabled" : ""}>${selectedKeeping}</button>`;
  timeEl.innerHTML = self.sanitizerHTML(`
    <div class="${self.styles.timeContent}" data-vc-time="content">
      ${TimeInput("hour", self.styles.timeHour, self.labels, self.private.selectedHours, range)}
      ${TimeInput("minute", self.styles.timeMinute, self.labels, self.private.selectedMinutes, range)}
      ${self.selectionTimeMode === 12 ? btnKeeping(self.private.selectedKeeping) : ""}
    </div>
    <div class="${self.styles.timeRanges}" data-vc-time="ranges">
      ${TimeRange("hour", self.styles.timeRange, self.labels, minHour, maxHour, self.timeStepHour, valueHours)}
      ${TimeRange("minute", self.styles.timeRange, self.labels, minMinutes, maxMinutes, self.timeStepMinute, self.private.selectedMinutes)}
    </div>
  `);
  handleTime(self, timeEl);
};
const createWeek = (self) => {
  const weekend = self.selectedWeekends ? [...self.selectedWeekends] : [];
  const weekdaysData = [...self.private.locale.weekdays.long].reduce(
    (acc, day, index) => [
      ...acc,
      {
        id: index,
        titleShort: self.private.locale.weekdays.short[index],
        titleLong: day,
        isWeekend: weekend.includes(index)
      }
    ],
    []
  );
  const weekdays = [...weekdaysData.slice(self.firstWeekday), ...weekdaysData.slice(0, self.firstWeekday)];
  self.private.mainElement.querySelectorAll('[data-vc="week"]').forEach((weekEl) => {
    const templateWeekDayEl = document.createElement("button");
    templateWeekDayEl.type = "button";
    weekdays.forEach((weekday) => {
      const weekDayEl = templateWeekDayEl.cloneNode(true);
      weekDayEl.innerText = weekday.titleShort;
      weekDayEl.className = self.styles.weekDay;
      weekDayEl.role = "columnheader";
      weekDayEl.ariaLabel = weekday.titleLong;
      weekDayEl.dataset.vcWeekDay = String(weekday.id);
      if (weekday.isWeekend)
        weekDayEl.dataset.vcWeekDayOff = "";
      weekEl.appendChild(weekDayEl);
    });
  });
};
const createYearEl = (self, templateEl, selected, disabled, id) => {
  const yearEl = templateEl.cloneNode(false);
  yearEl.className = self.styles.yearsYear;
  yearEl.innerText = String(id);
  yearEl.ariaLabel = String(id);
  yearEl.role = "gridcell";
  yearEl.dataset.vcYearsYear = `${id}`;
  if (disabled)
    yearEl.ariaDisabled = "true";
  if (disabled)
    yearEl.tabIndex = -1;
  yearEl.disabled = disabled;
  setYearModifier(self, yearEl, "year", selected === id, false);
  return yearEl;
};
const createYears = (self, target) => {
  var _a;
  const selectedYear = (target == null ? void 0 : target.dataset.vcYear) ? Number(target.dataset.vcYear) : self.private.selectedYear;
  self.private.currentType = "year";
  createLayouts(self, target);
  visibilityTitle(self);
  visibilityArrows(self);
  const yearsEl = self.private.mainElement.querySelector('[data-vc="years"]');
  if (!self.selectionYearsMode || !yearsEl)
    return;
  const relationshipID2 = self.viewType !== "multiple" ? 0 : self.private.selectedYear === selectedYear ? 0 : 1;
  const templateYearEl = document.createElement("button");
  templateYearEl.type = "button";
  for (let i = self.private.displayYear - 7; i < self.private.displayYear + 8; i++) {
    const yearDisabled = i < self.private.dateMin.getFullYear() + relationshipID2 || i > self.private.dateMax.getFullYear();
    const yearEl = createYearEl(self, templateYearEl, selectedYear, yearDisabled, i);
    yearsEl.appendChild(yearEl);
    if (self.onCreateYearEls)
      self.onCreateYearEls(yearEl, self);
  }
  (_a = self.private.mainElement.querySelector(`[data-vc-years-year]`)) == null ? void 0 : _a.focus();
};
const haveListener = {
  value: false,
  set: () => haveListener.value = true,
  check: () => haveListener.value
};
const setTheme = (htmlEl, theme) => htmlEl.dataset.vcTheme = theme;
const trackChangesThemeInSystemSettings = (self, supportDarkTheme) => {
  setTheme(self.private.mainElement, supportDarkTheme.matches ? "dark" : "light");
  if (self.selectedTheme !== "system" || haveListener.check())
    return;
  const changeDataAttrTheme = (event) => {
    const calendarEls = document.querySelectorAll('[data-vc="calendar"]');
    calendarEls == null ? void 0 : calendarEls.forEach((calendarEl) => setTheme(calendarEl, event.matches ? "dark" : "light"));
  };
  if (supportDarkTheme.addEventListener) {
    supportDarkTheme.addEventListener("change", changeDataAttrTheme);
  } else {
    supportDarkTheme.addListener(changeDataAttrTheme);
  }
  haveListener.set();
};
const trackChangesThemeInHTMLElement = (self, htmlEl, attr) => {
  const changes = (mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const record = mutationsList[i];
      if (record.attributeName === attr) {
        const activeTheme = htmlEl.getAttribute(attr);
        if (activeTheme)
          setTheme(self.private.mainElement, activeTheme);
        break;
      }
    }
  };
  const observer = new MutationObserver(changes);
  observer.observe(htmlEl, { attributes: true });
};
const detectTheme = (self, supportDarkTheme) => {
  const detectedThemeEl = self.themeAttrDetect ? document.querySelector(self.themeAttrDetect) : null;
  const attr = self.themeAttrDetect.replace(/^.*\[(.+)\]/g, (_, p1) => p1);
  if (!detectedThemeEl || detectedThemeEl.getAttribute(attr) === "system") {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
    return;
  }
  const activeTheme = detectedThemeEl.getAttribute(attr);
  if (activeTheme) {
    setTheme(self.private.mainElement, activeTheme);
    trackChangesThemeInHTMLElement(self, detectedThemeEl, attr);
  } else {
    trackChangesThemeInSystemSettings(self, supportDarkTheme);
  }
};
const handleTheme = (self) => {
  if (!(window.matchMedia("(prefers-color-scheme)").media !== "not all")) {
    setTheme(self.private.mainElement, "light");
    return;
  }
  if (self.selectedTheme === "system") {
    detectTheme(self, window.matchMedia("(prefers-color-scheme: dark)"));
  } else {
    setTheme(self.private.mainElement, self.selectedTheme);
  }
};
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, "");
const getLocaleWeekday = (self, dayIndex, locale) => {
  const date = /* @__PURE__ */ new Date(`1978-01-0${dayIndex + 1}T00:00:00.000Z`);
  const weekdayShort = date.toLocaleString(locale, { weekday: "short", timeZone: "UTC" });
  const weekdayLong = date.toLocaleString(locale, { weekday: "long", timeZone: "UTC" });
  self.private.locale.weekdays.short.push(capitalizeFirstLetter(weekdayShort));
  self.private.locale.weekdays.long.push(capitalizeFirstLetter(weekdayLong));
};
const getLocaleMonth = (self, monthIndex, locale) => {
  const date = /* @__PURE__ */ new Date(`1978-${String(monthIndex + 1).padStart(2, "0")}-01T00:00:00.000Z`);
  const monthShort = date.toLocaleString(locale, { month: "short", timeZone: "UTC" });
  const monthLong = date.toLocaleString(locale, { month: "long", timeZone: "UTC" });
  self.private.locale.months.short.push(capitalizeFirstLetter(monthShort));
  self.private.locale.months.long.push(capitalizeFirstLetter(monthLong));
};
const getLocale = (self) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const isHasPrivateLocale = self.private.locale.weekdays.short[6] && self.private.locale.weekdays.long[6] && self.private.locale.months.short[11] && self.private.locale.months.long[11];
  if (isHasPrivateLocale)
    return;
  if (typeof self.locale !== "string") {
    const isManually = ((_b = (_a = self.locale) == null ? void 0 : _a.weekdays) == null ? void 0 : _b.short[6]) && ((_d = (_c = self.locale) == null ? void 0 : _c.weekdays) == null ? void 0 : _d.long[6]) && ((_f = (_e = self.locale) == null ? void 0 : _e.months) == null ? void 0 : _f.short[11]) && ((_h = (_g = self.locale) == null ? void 0 : _g.months) == null ? void 0 : _h.long[11]);
    if (!isManually)
      throw new Error(errorMessages.notLocale);
    self.private.locale = __spreadValues({}, self.locale);
    return;
  }
  if (typeof self.locale === "string" && !self.locale.length)
    throw new Error(errorMessages.notLocale);
  Array.from({ length: 7 }, (_, i) => getLocaleWeekday(self, i, self.locale));
  Array.from({ length: 12 }, (_, i) => getLocaleMonth(self, i, self.locale));
};
const create = (self) => {
  const createComponents = {
    default: () => {
      createWeek(self);
      createDates(self);
    },
    multiple: () => {
      createWeek(self);
      createDates(self);
    },
    month: () => createMonths(self),
    year: () => createYears(self)
  };
  handleTheme(self);
  getLocale(self);
  createLayouts(self);
  visibilityTitle(self);
  visibilityArrows(self);
  createTime(self);
  createComponents[self.private.currentType]();
};
const handleArrowKeys = (self) => {
  const updateButtons = () => Array.from(self.private.mainElement.querySelectorAll('[data-vc="calendar"] button'));
  let currentFocusedIndex = 0;
  const directionMapping = {
    ArrowUp: (index, offset) => Math.max(0, index - offset),
    ArrowDown: (index, offset) => Math.min(updateButtons().length - 1, index + offset),
    ArrowLeft: (index) => Math.max(0, index - 1),
    ArrowRight: (index) => Math.min(updateButtons().length - 1, index + 1)
  };
  const onKeyDown = (event) => {
    var _a, _b;
    if (!directionMapping[event.key] || ((_a = event.target) == null ? void 0 : _a.localName) !== "button")
      return;
    const buttons = updateButtons();
    const offset = buttons[currentFocusedIndex].hasAttribute("data-vc-date-btn") ? 7 : buttons[currentFocusedIndex].hasAttribute("data-vc-months-month") ? 4 : buttons[currentFocusedIndex].hasAttribute("data-vc-years-year") ? 5 : 1;
    currentFocusedIndex = directionMapping[event.key](currentFocusedIndex, offset);
    (_b = buttons[currentFocusedIndex]) == null ? void 0 : _b.focus();
  };
  self.private.mainElement.addEventListener("keydown", onKeyDown);
  return () => {
    self.private.mainElement.removeEventListener("keydown", onKeyDown);
  };
};
const handleMonth = (self, route) => {
  const jumpDate = getDate(getDateString(new Date(self.private.selectedYear, self.private.selectedMonth, 1)));
  const routeMap = {
    prev: () => jumpDate.setMonth(jumpDate.getMonth() - self.monthsToSwitch),
    next: () => jumpDate.setMonth(jumpDate.getMonth() + self.monthsToSwitch)
  };
  routeMap[route]();
  [self.private.selectedMonth, self.private.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];
  visibilityTitle(self);
  visibilityArrows(self);
  createDates(self);
};
const handleClickArrow = (self, event) => {
  const element = event.target;
  const arrowEl = element.closest("[data-vc-arrow]");
  if (!arrowEl)
    return;
  if (["default", "multiple"].includes(self.private.currentType)) {
    handleMonth(self, arrowEl.dataset.vcArrow);
  } else if (self.private.currentType === "year" && self.private.displayYear !== void 0) {
    self.private.displayYear += { prev: -15, next: 15 }[arrowEl.dataset.vcArrow];
    createYears(self, event.target);
  }
  if (self.onClickArrow)
    self.onClickArrow(event, self);
};
const canToggleSelection = (self) => {
  if (self.enableDateToggle !== void 0)
    return typeof self.enableDateToggle === "function" ? self.enableDateToggle(self) : self.enableDateToggle;
  return true;
};
const handleSelectDate = (self, dateEl, multiple) => {
  const selectedDate = dateEl.dataset.vcDate;
  const isSelected = dateEl.closest("[data-vc-date][data-vc-date-selected]");
  const isToggleAllowed = canToggleSelection(self);
  if (isSelected && !isToggleAllowed)
    return;
  self.private.selectedDates = isSelected ? self.private.selectedDates.filter((date) => date !== selectedDate) : multiple ? [...self.private.selectedDates, selectedDate] : [selectedDate];
};
const parseDates = (dates) => dates.reduce((accumulator, date) => {
  if (date instanceof Date || typeof date === "number") {
    const d = date instanceof Date ? date : new Date(date);
    accumulator.push(d.toISOString().substring(0, 10));
  } else if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
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
const current = {
  self: null,
  rangeMin: void 0,
  rangeMax: void 0
};
const removeHoverEffect = () => {
  var _a, _b;
  if (!((_b = (_a = current.self) == null ? void 0 : _a.private) == null ? void 0 : _b.mainElement))
    return;
  const dateEls = current.self.private.mainElement.querySelectorAll("[data-vc-date]");
  dateEls.forEach((d) => ["data-vc-date-hover", "data-vc-date-hover-first", "data-vc-date-hover-last"].forEach((attr) => d.removeAttribute(attr)));
};
const addHoverEffect = (date, firstDateEls, lastDateEls) => {
  var _a, _b, _c;
  if (!((_b = (_a = current.self) == null ? void 0 : _a.private) == null ? void 0 : _b.selectedDates))
    return;
  const formattedDate = getDateString(date);
  if ((_c = current.self.private.disableDates) == null ? void 0 : _c.includes(formattedDate))
    return;
  const dateEls = current.self.private.mainElement.querySelectorAll(`[data-vc-date="${formattedDate}"]`);
  dateEls == null ? void 0 : dateEls.forEach((d) => d.dataset.vcDateHover = "");
  firstDateEls.forEach((d) => d.dataset.vcDateHoverFirst = "");
  lastDateEls.forEach((d) => d.dataset.vcDateHoverLast = "");
};
const handleHoverDatesEvent = (e) => {
  var _a, _b;
  if (!e.target || !((_b = (_a = current.self) == null ? void 0 : _a.private) == null ? void 0 : _b.selectedDates))
    return;
  const datesEl = e.target.closest('[data-vc="dates"]');
  if (!datesEl) {
    removeHoverEffect();
    return;
  }
  const dateEl = e.target.closest("[data-vc-date]");
  if (!dateEl)
    return;
  const lastDateString = dateEl.dataset.vcDate;
  const startDate = getDate(current.self.private.selectedDates[0]);
  const endDate = getDate(lastDateString);
  const firstDateEls = current.self.private.mainElement.querySelectorAll(`[data-vc-date="${current.self.private.selectedDates[0]}"]`);
  const lastDateEls = current.self.private.mainElement.querySelectorAll(`[data-vc-date="${lastDateString}"]`);
  const [firstDateElsCorrect, lastDateElsCorrect] = startDate < endDate ? [firstDateEls, lastDateEls] : [lastDateEls, firstDateEls];
  const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];
  removeHoverEffect();
  for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
    addHoverEffect(i, firstDateElsCorrect, lastDateElsCorrect);
  }
};
const handleCancelSelectionDates = (e) => {
  if (!current.self || e.key !== "Escape")
    return;
  current.self.private.selectedDates = [];
  current.self.private.mainElement.removeEventListener("mousemove", handleHoverDatesEvent);
  document.removeEventListener("keydown", handleCancelSelectionDates);
  create(current.self);
};
const updateDisabledDates = () => {
  var _a, _b, _c, _d;
  if (!((_c = (_b = (_a = current.self) == null ? void 0 : _a.private) == null ? void 0 : _b.selectedDates) == null ? void 0 : _c[0]) || !((_d = current.self.private.disableDates) == null ? void 0 : _d[0]))
    return;
  const selectedDate = getDate(current.self.private.selectedDates[0]);
  const [startDate, endDate] = current.self.private.disableDates.map((dateStr) => getDate(dateStr)).reduce(([start, end], disabledDate) => [selectedDate >= disabledDate ? disabledDate : start, selectedDate < disabledDate && end === null ? disabledDate : end], [null, null]);
  if (startDate)
    current.self.private.displayDateMin = getDateString(new Date(startDate.setDate(startDate.getDate() + 1)));
  if (endDate)
    current.self.private.displayDateMax = getDateString(new Date(endDate.setDate(endDate.getDate() - 1)));
};
const resetDisabledDates = () => {
  if (!current.self)
    return;
  current.self.private.displayDateMin = current.rangeMin;
  current.self.private.displayDateMax = current.rangeMax;
};
const handleSelectDateRange = (self, formattedDate) => {
  var _a;
  if (formattedDate) {
    const selectedDateExists = self.private.selectedDates.length === 1 && self.private.selectedDates[0].includes(formattedDate);
    self.private.selectedDates = selectedDateExists && !canToggleSelection(self) ? [formattedDate, formattedDate] : selectedDateExists && canToggleSelection(self) ? [] : self.private.selectedDates.length > 1 ? [formattedDate] : [...self.private.selectedDates, formattedDate];
    (_a = self.private.selectedDates) == null ? void 0 : _a.sort((a, b) => +new Date(a) - +new Date(b));
  }
  if (self.disableDatesGaps) {
    current.rangeMin = current.rangeMin ? current.rangeMin : self.private.displayDateMin;
    current.rangeMax = current.rangeMax ? current.rangeMax : self.private.displayDateMax;
  }
  current.self = self;
  removeHoverEffect();
  const selectionHandlers = {
    set: () => {
      self.private.mainElement.addEventListener("mousemove", handleHoverDatesEvent);
      self.private.mainElement.addEventListener("keydown", handleCancelSelectionDates);
      if (self.disableDatesGaps)
        updateDisabledDates();
    },
    reset: () => {
      const [startDate, endDate] = [self.private.selectedDates[0], self.private.selectedDates[self.private.selectedDates.length - 1]];
      const notSameDate = self.private.selectedDates[0] !== self.private.selectedDates[self.private.selectedDates.length - 1];
      const allDates = parseDates([`${startDate}:${endDate}`]);
      const actualDates = allDates.filter((d) => !self.private.disableDates.includes(d));
      self.private.selectedDates = notSameDate ? self.enableEdgeDatesOnly ? [startDate, endDate] : actualDates : [self.private.selectedDates[0], self.private.selectedDates[0]];
      self.private.mainElement.removeEventListener("mousemove", handleHoverDatesEvent);
      self.private.mainElement.removeEventListener("keydown", handleCancelSelectionDates);
      if (self.disableDatesGaps)
        resetDisabledDates();
    }
  };
  selectionHandlers[self.private.selectedDates.length === 1 ? "set" : "reset"]();
};
const updateDateModifier = (self) => {
  const dateEls = self.private.mainElement.querySelectorAll("[data-vc-date]");
  dateEls.forEach((dateEl) => {
    const dateBtnEl = dateEl.querySelector("[data-vc-date-btn]");
    const dateStr = dateEl.dataset.vcDate;
    const dayWeekID = getDate(dateStr).getDay();
    setDateModifier(self, self.private.selectedYear, dateEl, dateBtnEl, dayWeekID, dateStr, "current");
  });
};
const handleClickDate = (self, event) => {
  var _a;
  const element = event.target;
  const dateBtnEl = element.closest("[data-vc-date-btn]");
  if (!self.selectionDatesMode || !["single", "multiple", "multiple-ranged"].includes(self.selectionDatesMode) || !dateBtnEl)
    return;
  const dateEl = dateBtnEl.closest("[data-vc-date]");
  const daySelectionActions = {
    single: () => handleSelectDate(self, dateEl, false),
    multiple: () => handleSelectDate(self, dateEl, true),
    "multiple-ranged": () => handleSelectDateRange(self, dateEl.dataset.vcDate)
  };
  daySelectionActions[self.selectionDatesMode]();
  (_a = self.private.selectedDates) == null ? void 0 : _a.sort((a, b) => +new Date(a) - +new Date(b));
  if (self.onClickDate)
    self.onClickDate(event, self);
  if (self.isInput && self.private.inputElement && self.private.mainElement && self.onChangeToInput)
    self.onChangeToInput(event, self);
  const dayPrevEl = element.closest('[data-vc-date-month="prev"]');
  const dayNextEl = element.closest('[data-vc-date-month="next"]');
  const actionMapping = {
    prev: () => self.enableMonthChangeOnDayClick ? handleMonth(self, "prev") : updateDateModifier(self),
    next: () => self.enableMonthChangeOnDayClick ? handleMonth(self, "next") : updateDateModifier(self),
    current: () => updateDateModifier(self)
  };
  actionMapping[dayPrevEl ? "prev" : dayNextEl ? "next" : "current"]();
};
const typeClick = ["month", "year"];
const getColumnID = (self, type, id) => {
  const columnEls = self.private.mainElement.querySelectorAll('[data-vc="column"]');
  const indexColumn = Array.from(columnEls).findIndex((column) => column.closest(`[data-vc-column="${type}"]`));
  const currentValue = Number(columnEls[indexColumn].querySelector(`[data-vc="${type}"]`).getAttribute(`data-vc-${type}`));
  return self.private.currentType === "month" && indexColumn >= 0 ? id - indexColumn : self.private.currentType === "year" && self.private.selectedYear !== currentValue ? id - 1 : id;
};
const handleMultipleYearSelection = (self, itemEl) => {
  const selectedYear = getColumnID(self, "year", Number(itemEl.dataset.vcYearsYear));
  const isBeforeMinDate = self.private.selectedMonth < self.private.dateMin.getMonth() && selectedYear <= self.private.dateMin.getFullYear();
  const isAfterMaxDate = self.private.selectedMonth > self.private.dateMax.getMonth() && selectedYear >= self.private.dateMax.getFullYear();
  const isBeforeMinYear = selectedYear < self.private.dateMin.getFullYear();
  const isAfterMaxYear = selectedYear > self.private.dateMax.getFullYear();
  self.private.selectedYear = isBeforeMinDate || isBeforeMinYear ? self.private.dateMin.getFullYear() : isAfterMaxDate || isAfterMaxYear ? self.private.dateMax.getFullYear() : selectedYear;
  self.private.selectedMonth = isBeforeMinDate || isBeforeMinYear ? self.private.dateMin.getMonth() : isAfterMaxDate || isAfterMaxYear ? self.private.dateMax.getMonth() : self.private.selectedMonth;
};
const handleMultipleMonthSelection = (self, itemEl) => {
  const column = itemEl.closest('[data-vc-column="month"]');
  const yearEl = column.querySelector('[data-vc="year"]');
  const selectedMonth = getColumnID(self, "month", Number(itemEl.dataset.vcMonthsMonth));
  const selectedYear = Number(yearEl.dataset.vcYear);
  const isBeforeMinDate = selectedMonth < self.private.dateMin.getMonth() && selectedYear <= self.private.dateMin.getFullYear();
  const isAfterMaxDate = selectedMonth > self.private.dateMax.getMonth() && selectedYear >= self.private.dateMax.getFullYear();
  self.private.selectedYear = selectedYear;
  self.private.selectedMonth = isBeforeMinDate ? self.private.dateMin.getMonth() : isAfterMaxDate ? self.private.dateMax.getMonth() : selectedMonth;
};
const handleItemClick = (self, event, type, itemEl) => {
  var _a;
  const selectByType = {
    year: () => {
      if (self.viewType === "multiple")
        return handleMultipleYearSelection(self, itemEl);
      self.private.selectedYear = Number(itemEl.dataset.vcYearsYear);
    },
    month: () => {
      if (self.viewType === "multiple")
        return handleMultipleMonthSelection(self, itemEl);
      self.private.selectedMonth = Number(itemEl.dataset.vcMonthsMonth);
    }
  };
  selectByType[type]();
  const actionByType = {
    year: () => {
      var _a2;
      return (_a2 = self.onClickYear) == null ? void 0 : _a2.call(self, event, self);
    },
    month: () => {
      var _a2;
      return (_a2 = self.onClickMonth) == null ? void 0 : _a2.call(self, event, self);
    }
  };
  actionByType[type]();
  if (self.private.currentType !== self.viewType) {
    self.private.currentType = self.viewType;
    create(self);
    (_a = self.private.mainElement.querySelector(`[data-vc="${type}"]`)) == null ? void 0 : _a.focus();
  } else {
    setYearModifier(self, itemEl, type, true, true);
  }
};
const handleClickType = (self, event, type) => {
  var _a;
  const target = event.target;
  const headerEl = target.closest(`[data-vc="${type}"]`);
  const createByType = {
    year: () => createYears(self, target),
    month: () => createMonths(self, target)
  };
  if (headerEl && self.onClickTitle)
    self.onClickTitle(event, self);
  if (headerEl && self.private.currentType !== type)
    return createByType[type]();
  const itemEl = target.closest(`[data-vc-${type}s-${type}]`);
  if (itemEl)
    return handleItemClick(self, event, type, itemEl);
  const gridEl = target.closest('[data-vc="grid"]');
  const columnEl = target.closest('[data-vc="column"]');
  if (self.private.currentType === type && headerEl || self.viewType === "multiple" && self.private.currentType === type && gridEl && !columnEl) {
    self.private.currentType = self.viewType;
    create(self);
    (_a = self.private.mainElement.querySelector(`[data-vc="${type}"]`)) == null ? void 0 : _a.focus();
  }
};
const handleClickMonthOrYear = (self, event) => {
  const typesMap = { month: self.selectionMonthsMode, year: self.selectionYearsMode };
  typeClick.forEach((type) => {
    if (!typesMap[type] || !event.target)
      return;
    handleClickType(self, event, type);
  });
};
const handleClickWeekNumber = (self, event) => {
  if (!self.enableWeekNumbers || !self.onClickWeekNumber)
    return;
  const weekNumberEl = event.target.closest("[data-vc-week-number]");
  const daysToWeeks = self.private.mainElement.querySelectorAll("[data-vc-date-week-number]");
  if (!weekNumberEl || !daysToWeeks[0])
    return;
  const weekNumberValue = Number(weekNumberEl.innerText);
  const yearWeek = Number(weekNumberEl.dataset.vcWeekYear);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number(day.dataset.vcDateWeekNumber) === weekNumberValue);
  self.onClickWeekNumber(event, weekNumberValue, daysOfThisWeek, yearWeek, self);
};
const handleClickWeekDay = (self, event) => {
  if (!self.onClickWeekDay)
    return;
  const weekDayEl = event.target.closest("[data-vc-week-day]");
  const columnEl = event.target.closest('[data-vc="column"]');
  const daysToWeeks = columnEl ? columnEl.querySelectorAll("[data-vc-date-week-day]") : self.private.mainElement.querySelectorAll("[data-vc-date-week-day]");
  if (!weekDayEl || !daysToWeeks[0])
    return;
  const weekDayValue = Number(weekDayEl.dataset.vcWeekDay);
  const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number(day.dataset.vcDateWeekDay) === weekDayValue);
  self.onClickWeekDay(event, weekDayValue, daysOfThisWeek, self);
};
const handleClick = (self) => {
  const clickEventHandler = (e) => {
    handleClickArrow(self, e);
    handleClickWeekDay(self, e);
    handleClickWeekNumber(self, e);
    handleClickDate(self, e);
    handleClickMonthOrYear(self, e);
  };
  self.private.mainElement.addEventListener("click", clickEventHandler);
  return () => self.private.mainElement.removeEventListener("click", clickEventHandler);
};
const initDateMinMax = (self) => {
  self.private.dateMin = self.displayDisabledDates ? getDate(self.dateMin) : getDate(self.private.displayDateMin);
  self.private.dateMax = self.displayDisabledDates ? getDate(self.dateMax) : getDate(self.private.displayDateMax);
};
const getLocalDate = () => {
  const now = /* @__PURE__ */ new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 6e4).toISOString().substring(0, 10);
};
const initRange = (self) => {
  var _a, _b, _c;
  if (self.dateMin === "today")
    self.dateMin = getLocalDate();
  if (self.dateMax === "today")
    self.dateMax = getLocalDate();
  if (self.displayDateMin === "today")
    self.displayDateMin = getLocalDate();
  if (self.displayDateMax === "today")
    self.displayDateMax = getLocalDate();
  self.displayDateMin = self.displayDateMin ? getDate(self.dateMin) >= getDate(self.displayDateMin) ? self.dateMin : self.displayDateMin : self.dateMin;
  self.displayDateMax = self.displayDateMax ? getDate(self.dateMax) <= getDate(self.displayDateMax) ? self.dateMax : self.displayDateMax : self.dateMax;
  const isDisablePast = self.disableDatesPast && !self.disableAllDates && getDate(self.displayDateMin) < self.dateToday;
  self.private.displayDateMin = isDisablePast ? getDateString(self.dateToday) : self.disableAllDates ? getDateString(self.dateToday) : self.displayDateMin;
  self.private.displayDateMax = self.disableAllDates ? getDateString(self.dateToday) : self.displayDateMax;
  self.private.disableDates = self.disableDates && !self.disableAllDates ? parseDates(self.disableDates) : self.disableAllDates ? [self.private.displayDateMin] : [];
  if (self.private.disableDates.length > 1)
    self.private.disableDates.sort((a, b) => +new Date(a) - +new Date(b));
  self.private.enableDates = self.enableDates ? parseDates(self.enableDates) : [];
  if (((_a = self.private.enableDates) == null ? void 0 : _a[0]) && ((_b = self.private.disableDates) == null ? void 0 : _b[0]))
    self.private.disableDates = self.private.disableDates.filter((d) => !self.private.enableDates.includes(d));
  if (self.private.enableDates.length > 1)
    self.private.enableDates.sort((a, b) => +new Date(a) - +new Date(b));
  if (((_c = self.private.enableDates) == null ? void 0 : _c[0]) && self.disableAllDates) {
    self.private.displayDateMin = self.private.enableDates[0];
    self.private.displayDateMax = self.private.enableDates[self.private.enableDates.length - 1];
  }
};
const initSelectedDates = (self) => {
  var _a;
  self.private.selectedDates = ((_a = self.selectedDates) == null ? void 0 : _a[0]) ? parseDates(self.selectedDates) : [];
};
const initSelectedMonthYear = (self) => {
  var _a;
  if (self.enableJumpToSelectedDate && ((_a = self.selectedDates) == null ? void 0 : _a.length) && self.selectedMonth === void 0 && self.selectedYear === void 0) {
    const selectedDate = getDate(parseDates(self.selectedDates)[0]);
    self.selectedMonth = selectedDate.getMonth();
    self.selectedYear = selectedDate.getFullYear();
  }
  const isValidMonth = self.selectedMonth !== void 0 && Number(self.selectedMonth) >= 0 && Number(self.selectedMonth) < 12;
  const isValidYear = self.selectedYear !== void 0 && Number(self.selectedYear) >= 0 && Number(self.selectedYear) <= 9999;
  self.private.selectedMonth = isValidMonth ? Number(self.selectedMonth) : self.dateToday.getMonth();
  self.private.selectedYear = isValidYear ? Number(self.selectedYear) : self.dateToday.getFullYear();
  self.private.displayYear = self.private.selectedYear;
};
const initTime = (self) => {
  var _a, _b, _c;
  if (!self.selectionTimeMode)
    return;
  if (![12, 24].includes(self.selectionTimeMode))
    throw new Error(errorMessages.incorrectTime);
  const isTime12 = self.selectionTimeMode === 12;
  const timeRegex = isTime12 ? /^(0[1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
  let [hours, minutes, keeping] = (_c = (_b = (_a = self.selectedTime) == null ? void 0 : _a.match(timeRegex)) == null ? void 0 : _b.slice(1)) != null ? _c : [];
  if (!hours) {
    hours = isTime12 ? transformTime12(String(self.timeMinHour)) : String(self.timeMinHour);
    minutes = String(self.timeMinMinute);
    keeping = isTime12 ? Number(transformTime12(String(self.timeMinHour))) >= 12 ? "PM" : "AM" : null;
  } else if (isTime12 && !keeping) {
    keeping = "AM";
  }
  self.private.selectedHours = hours.padStart(2, "0");
  self.private.selectedMinutes = minutes.padStart(2, "0");
  self.private.selectedKeeping = keeping;
  self.private.selectedTime = `${self.private.selectedHours}:${self.private.selectedMinutes}${keeping ? ` ${keeping}` : ""}`;
};
const initAllVariables = (self) => {
  self.private.currentType = self.viewType;
  initSelectedMonthYear(self);
  initRange(self);
  initSelectedDates(self);
  initDateMinMax(self);
  initTime(self);
};
const reset = (self, { year, month, dates, time, locale }) => {
  var _a;
  const previousSelected = {
    year: self.selectedYear,
    month: self.selectedMonth,
    dates: self.selectedDates,
    time: self.selectedTime
  };
  self.selectedYear = year ? previousSelected.year : self.private.selectedYear;
  self.selectedMonth = month ? previousSelected.month : self.private.selectedMonth;
  self.selectedTime = time ? previousSelected.time : self.private.selectedTime;
  self.selectedDates = dates === "only-first" && ((_a = self.private.selectedDates) == null ? void 0 : _a[0]) ? [self.private.selectedDates[0]] : dates === true ? previousSelected.dates : self.private.selectedDates;
  if (locale) {
    self.private.locale = {
      months: { short: [], long: [] },
      weekdays: { short: [], long: [] }
    };
  }
  initAllVariables(self);
  create(self);
  self.selectedYear = previousSelected.year;
  self.selectedMonth = previousSelected.month;
  self.selectedDates = previousSelected.dates;
  self.selectedTime = previousSelected.time;
  if (self.selectionDatesMode === "multiple-ranged" && dates)
    handleSelectDateRange(self);
};
function findBestPickerPosition(input, calendar) {
  const position = "left";
  if (!calendar || !input)
    return position;
  const { canShow, parentPositions } = getAvailablePosition(input, calendar);
  const isCenterPosition = canShow.left && canShow.right;
  const bestPosition = isCenterPosition && canShow.bottom ? "center" : isCenterPosition && canShow.top ? ["top", "center"] : Array.isArray(parentPositions) ? [parentPositions[0] === "bottom" ? "top" : "bottom", ...parentPositions.slice(1)] : parentPositions;
  return bestPosition || position;
}
const setPosition = (input, calendar, position) => {
  if (!input)
    return;
  const pos = position === "auto" ? findBestPickerPosition(input, calendar) : position;
  const getPosition = {
    top: -calendar.offsetHeight,
    bottom: input.offsetHeight,
    left: 0,
    center: input.offsetWidth / 2 - calendar.offsetWidth / 2,
    right: input.offsetWidth - calendar.offsetWidth
  };
  const YPosition = !Array.isArray(pos) ? "bottom" : pos[0];
  const XPosition = !Array.isArray(pos) ? pos : pos[1];
  calendar.dataset.vcPosition = YPosition;
  const { top: offsetTop, left: offsetLeft } = getOffset(input);
  const top = offsetTop + getPosition[YPosition];
  let left = offsetLeft + getPosition[XPosition];
  const { vw } = getViewportDimensions();
  if (left + calendar.clientWidth > vw) {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    left = vw - calendar.clientWidth - scrollbarWidth;
  } else if (left < 0) {
    left = 0;
  }
  Object.assign(calendar.style, { left: `${left}px`, top: `${top}px` });
};
const createToInput = (self, isVisible = true) => {
  const calendar = document.createElement("div");
  calendar.className = self.styles.calendar;
  calendar.dataset.vc = "calendar";
  calendar.dataset.vcInput = "";
  calendar.dataset.vcCalendarHidden = "";
  calendar.style.visibility = "hidden";
  self.private.isInputInit = true;
  self.private.mainElement = calendar;
  document.body.appendChild(self.private.mainElement);
  if (isVisible) {
    queueMicrotask(() => {
      setPosition(self.private.inputElement, calendar, self.positionToInput);
      self.private.mainElement.style.visibility = "visible";
      self.show();
    });
  }
  reset(self, {
    year: true,
    month: true,
    dates: true,
    time: true,
    locale: true
  });
  if (self.onInit)
    self.onInit(self);
  handleArrowKeys(self);
  return handleClick(self);
};
const handleInput = (self) => {
  const cleanup = [];
  self.private.inputElement = self.private.mainElement;
  const handleResize = () => setPosition(self.private.inputElement, self.private.mainElement, self.positionToInput);
  const handleEscapeKey = (e) => {
    var _a, _b;
    if (e.key !== "Escape")
      return;
    if (((_a = self == null ? void 0 : self.private) == null ? void 0 : _a.inputElement) && ((_b = self == null ? void 0 : self.private) == null ? void 0 : _b.mainElement))
      self.hide();
    document.removeEventListener("keydown", handleEscapeKey);
  };
  const documentClickEvent = (e) => {
    if (!self || e.target === self.private.inputElement || self.private.mainElement.contains(e.target))
      return;
    if (self.private.inputElement && self.private.mainElement)
      self.hide();
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("click", documentClickEvent, { capture: true });
  };
  const handleOpenCalendar = () => {
    if (!self.private.isInputInit) {
      cleanup.push(createToInput(self));
    } else {
      setPosition(self.private.inputElement, self.private.mainElement, self.positionToInput);
      self.private.mainElement.style.visibility = "visible";
      self.show();
    }
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", documentClickEvent, { capture: true });
    document.addEventListener("keydown", handleEscapeKey);
  };
  self.private.inputElement.addEventListener("click", handleOpenCalendar);
  self.private.inputElement.addEventListener("focus", handleOpenCalendar);
  return () => {
    cleanup.forEach((clean) => clean());
  };
};
const init = (self) => {
  self.private.originalElement = self.private.mainElement.cloneNode(true);
  self.private.isInit = true;
  if (self.isInput)
    return handleInput(self);
  initAllVariables(self);
  create(self);
  if (self.onInit)
    self.onInit(self);
  handleArrowKeys(self);
  return handleClick(self);
};
const replaceProperties = (original, replacement) => {
  const keys = Object.keys(replacement);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof original[key] === "object" && typeof replacement[key] === "object" && !(replacement[key] instanceof Date) && !Array.isArray(replacement[key])) {
      replaceProperties(original[key], replacement[key]);
    } else if (replacement[key] !== void 0) {
      original[key] = replacement[key];
    }
  }
};
const set = (self, options, resetOptions) => {
  const defaultReset = { year: true, month: true, dates: true, time: true, locale: true };
  replaceProperties(self, options);
  reset(self, __spreadValues(__spreadValues({}, defaultReset), resetOptions));
};
const show = (self) => {
  if (!self.private.currentType) {
    self.private.mainElement.click();
    return;
  }
  self.private.mainElement.removeAttribute("data-vc-calendar-hidden");
  if (self.onShow)
    self.onShow(self);
};
const update = (self, resetOptions) => {
  if (!self.private.isInit)
    throw new Error(errorMessages.notInit);
  if (self.isInput && !self.private.isInputInit)
    createToInput(self, false);
  const defaultReset = { year: false, month: false, dates: false, time: false, locale: false };
  reset(self, __spreadValues(__spreadValues({}, defaultReset), resetOptions));
  if (self.onUpdate)
    self.onUpdate(self);
};
const labels = {
  application: "Calendar",
  navigation: "Calendar Navigation",
  arrowNext: {
    month: "Next month",
    year: "Next list of years"
  },
  arrowPrev: {
    month: "Previous month",
    year: "Previous list of years"
  },
  month: "Select month, current selected month:",
  months: "List of months",
  year: "Select year, current selected year:",
  years: "List of years",
  week: "Days of the week",
  weekNumber: "Numbers of weeks in a year",
  dates: "Dates in the current month",
  selectingTime: "Selecting a time ",
  inputHour: "Hours",
  inputMinute: "Minutes",
  rangeHour: "Slider for selecting hours",
  rangeMinute: "Slider for selecting minutes",
  btnKeeping: "Switch AM/PM, current position:"
};
const styles = {
  calendar: "vc",
  controls: "vc-controls",
  grid: "vc-grid",
  column: "vc-column",
  header: "vc-header",
  headerContent: "vc-header__content",
  month: "vc-month",
  year: "vc-year",
  arrowPrev: "vc-arrow vc-arrow_prev",
  arrowNext: "vc-arrow vc-arrow_next",
  wrapper: "vc-wrapper",
  content: "vc-content",
  months: "vc-months",
  monthsMonth: "vc-months__month",
  years: "vc-years",
  yearsYear: "vc-years__year",
  week: "vc-week",
  weekDay: "vc-week__day",
  weekNumbers: "vc-week-numbers",
  weekNumbersTitle: "vc-week-numbers__title",
  weekNumbersContent: "vc-week-numbers__content",
  weekNumber: "vc-week-number",
  dates: "vc-dates",
  date: "vc-date",
  dateBtn: "vc-date__btn",
  datePopup: "vc-date__popup",
  time: "vc-time",
  timeContent: "vc-time__content",
  timeHour: "vc-time__hour",
  timeMinute: "vc-time__minute",
  timeKeeping: "vc-time__keeping",
  timeRanges: "vc-time__ranges",
  timeRange: "vc-time__range"
};
class OptionsCalendar {
  constructor() {
    __publicField(this, "viewType", "default");
    __publicField(this, "isInput", false);
    __publicField(this, "positionToInput", "left");
    __publicField(this, "firstWeekday", 1);
    __publicField(this, "monthsToSwitch", 1);
    __publicField(this, "themeAttrDetect", "html[data-theme]");
    __publicField(this, "locale", "en");
    __publicField(this, "dateToday", /* @__PURE__ */ new Date());
    __publicField(this, "dateMin", "1970-01-01");
    __publicField(this, "dateMax", "2470-12-31");
    __publicField(this, "displayMonthsCount", 2);
    __publicField(this, "displayDateMin");
    __publicField(this, "displayDateMax");
    __publicField(this, "displayDatesOutside", true);
    __publicField(this, "displayDisabledDates", false);
    __publicField(this, "disableDates", []);
    __publicField(this, "disableAllDates", false);
    __publicField(this, "disableDatesPast", false);
    __publicField(this, "disableDatesGaps", false);
    __publicField(this, "disableWeekdays", []);
    __publicField(this, "disableToday", false);
    __publicField(this, "enableDates", []);
    __publicField(this, "enableEdgeDatesOnly", true);
    __publicField(this, "enableDateToggle", true);
    __publicField(this, "enableWeekNumbers", false);
    __publicField(this, "enableMonthChangeOnDayClick", true);
    __publicField(this, "enableJumpToSelectedDate", false);
    __publicField(this, "selectionDatesMode", "single");
    __publicField(this, "selectionMonthsMode", true);
    __publicField(this, "selectionYearsMode", true);
    __publicField(this, "selectionTimeMode", false);
    __publicField(this, "selectedDates", []);
    __publicField(this, "selectedMonth");
    __publicField(this, "selectedYear");
    __publicField(this, "selectedHolidays", []);
    __publicField(this, "selectedWeekends", [0, 6]);
    __publicField(this, "selectedTime");
    __publicField(this, "selectedTheme", "system");
    __publicField(this, "timeMinHour", 0);
    __publicField(this, "timeMaxHour", 23);
    __publicField(this, "timeMinMinute", 0);
    __publicField(this, "timeMaxMinute", 59);
    __publicField(this, "timeControls", "all");
    __publicField(this, "timeStepHour", 1);
    __publicField(this, "timeStepMinute", 1);
    __publicField(this, "sanitizerHTML", (dirtyHtml) => dirtyHtml);
    __publicField(this, "onClickDate");
    __publicField(this, "onClickWeekDay");
    __publicField(this, "onClickWeekNumber");
    __publicField(this, "onClickTitle");
    __publicField(this, "onClickMonth");
    __publicField(this, "onClickYear");
    __publicField(this, "onClickArrow");
    __publicField(this, "onChangeTime");
    __publicField(this, "onChangeToInput");
    __publicField(this, "onCreateDateEls");
    __publicField(this, "onCreateMonthEls");
    __publicField(this, "onCreateYearEls");
    __publicField(this, "onInit");
    __publicField(this, "onUpdate");
    __publicField(this, "onDestroy");
    __publicField(this, "onShow");
    __publicField(this, "onHide");
    __publicField(this, "popups", {});
    __publicField(this, "labels", __spreadValues({}, labels));
    __publicField(this, "layouts", { default: "", multiple: "", month: "", year: "" });
    __publicField(this, "styles", __spreadValues({}, styles));
  }
}
const _VanillaCalendarPro = class _VanillaCalendarPro extends OptionsCalendar {
  constructor(selector, options) {
    var _a;
    super();
    __publicField(this, "init", () => init(this));
    __publicField(this, "update", (resetOptions) => update(this, resetOptions));
    __publicField(this, "destroy", () => destroy(this));
    __publicField(this, "show", () => show(this));
    __publicField(this, "hide", () => hide(this));
    __publicField(this, "set", (options, resetOptions) => set(this, options, resetOptions));
    __publicField(this, "private");
    this.private = __spreadProps(__spreadValues({}, this.private), {
      locale: {
        months: {
          short: [],
          long: []
        },
        weekdays: {
          short: [],
          long: []
        }
      }
    });
    this.private.mainElement = typeof selector === "string" ? (_a = _VanillaCalendarPro.memoizedElements.get(selector)) != null ? _a : this.queryAndMemoize(selector) : selector;
    if (options)
      replaceProperties(this, options);
  }
  queryAndMemoize(selector) {
    const element = document.querySelector(selector);
    if (!element)
      throw new Error(errorMessages.notFoundSelector(selector));
    _VanillaCalendarPro.memoizedElements.set(selector, element);
    return element;
  }
};
__publicField(_VanillaCalendarPro, "memoizedElements", /* @__PURE__ */ new Map());
let VanillaCalendarPro = _VanillaCalendarPro;
export {
  VanillaCalendarPro
};
