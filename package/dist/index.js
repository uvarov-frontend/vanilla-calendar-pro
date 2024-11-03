/*! name: vanilla-calendar-pro v3.0.0-beta.29 | url: https://github.com/uvarov-frontend/vanilla-calendar-pro */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.VanillaCalendarPro = {}));
})(this, function(exports2) {
  "use strict";var __defProp = Object.defineProperty;
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
  const destroy = (self2) => {
    var _a, _b, _c, _d, _e;
    if (!self2.private.isInit)
      throw new Error(errorMessages.notInit);
    if (self2.isInput) {
      (_a = self2.private.mainElement.parentElement) == null ? void 0 : _a.removeChild(self2.private.mainElement);
      (_c = (_b = self2.private.inputElement) == null ? void 0 : _b.replaceWith) == null ? void 0 : _c.call(_b, self2.private.originalElement);
      self2.private.inputElement = void 0;
    } else {
      (_e = (_d = self2.private.mainElement).replaceWith) == null ? void 0 : _e.call(_d, self2.private.originalElement);
    }
    self2.private.mainElement = self2.private.originalElement;
    if (self2.onDestroy)
      self2.onDestroy(self2);
  };
  const hide = (self2) => {
    if (!self2.private.currentType)
      return;
    self2.private.mainElement.dataset.vcCalendarHidden = "";
    if (self2.onHide)
      self2.onHide(self2);
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
  const handleDay = (self2, date, dateInfo, datesEl) => {
    var _a;
    const dateEl = datesEl.querySelector(`[data-vc-date="${date}"]`);
    if (!dateEl)
      return;
    const dateBtnEl = dateEl.querySelector(`[data-vc-date-btn]`);
    if (dateInfo == null ? void 0 : dateInfo.modifier)
      dateBtnEl.classList.add(...dateInfo.modifier.trim().split(" "));
    if (dateInfo == null ? void 0 : dateInfo.html) {
      const datePopup = document.createElement("div");
      datePopup.className = self2.styles.datePopup;
      datePopup.dataset.vcDatePopup = "";
      datePopup.innerHTML = self2.sanitizerHTML(dateInfo.html);
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
  const createDatePopup = (self2, datesEl) => {
    var _a;
    if (!self2.popups)
      return;
    (_a = Object.entries(self2.popups)) == null ? void 0 : _a.forEach(([date, dateInfo]) => handleDay(self2, date, dateInfo, datesEl));
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
  const setDateModifier = (self2, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType) => {
    var _a, _b, _c, _d;
    const isDisabled = getDate(self2.private.displayDateMin) > getDate(dateStr) || getDate(self2.private.displayDateMax) < getDate(dateStr) || ((_a = self2.private.disableDates) == null ? void 0 : _a.includes(dateStr)) || !self2.selectionMonthsMode && monthType !== "current" || !self2.selectionYearsMode && getDate(dateStr).getFullYear() !== currentYear;
    updateAttribute(dateEl, isDisabled, "data-vc-date-disabled");
    if (dateBtnEl)
      updateAttribute(dateBtnEl, isDisabled, "aria-disabled", "true");
    if (dateBtnEl)
      updateAttribute(dateBtnEl, isDisabled, "tabindex", "-1");
    updateAttribute(dateEl, !self2.disableToday && getDateString(self2.dateToday) === dateStr, "data-vc-date-today");
    updateAttribute(dateEl, !self2.disableToday && getDateString(self2.dateToday) === dateStr, "aria-current", "date");
    updateAttribute(dateEl, (_b = self2.selectedWeekends) == null ? void 0 : _b.includes(dayWeekID), "data-vc-date-weekend");
    updateAttribute(dateEl, (_c = self2.selectedHolidays) == null ? void 0 : _c.includes(dateStr), "data-vc-date-holiday");
    if ((_d = self2.private.selectedDates) == null ? void 0 : _d.includes(dateStr)) {
      dateEl.setAttribute("data-vc-date-selected", "");
      if (dateBtnEl)
        dateBtnEl.setAttribute("aria-selected", "true");
      if (self2.private.selectedDates.length > 1 && self2.selectionDatesMode === "multiple-ranged") {
        if (self2.private.selectedDates[0] === dateStr)
          dateEl.setAttribute("data-vc-date-selected", "first");
        if (self2.private.selectedDates[self2.private.selectedDates.length - 1] === dateStr)
          dateEl.setAttribute("data-vc-date-selected", "last");
        if (self2.private.selectedDates[0] !== dateStr && self2.private.selectedDates[self2.private.selectedDates.length - 1] !== dateStr)
          dateEl.setAttribute("data-vc-date-selected", "middle");
      }
    } else if (dateEl.hasAttribute("data-vc-date-selected")) {
      dateEl.removeAttribute("data-vc-date-selected");
      if (dateBtnEl)
        dateBtnEl.removeAttribute("aria-selected");
    }
    if (!self2.private.disableDates.includes(dateStr) && self2.enableEdgeDatesOnly && self2.private.selectedDates.length > 1 && self2.selectionDatesMode === "multiple-ranged") {
      const firstDate = getDate(self2.private.selectedDates[0]);
      const lastDate = getDate(self2.private.selectedDates[self2.private.selectedDates.length - 1]);
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
  const addWeekNumberForDate = (self2, dateEl, dateStr) => {
    const weekNumber = getWeekNumber(dateStr, self2.firstWeekday);
    if (!weekNumber)
      return;
    dateEl.dataset.vcDateWeekNumber = String(weekNumber.week);
  };
  const setDaysAsDisabled = (self2, date, dayWeekID) => {
    var _a, _b, _c, _d, _e;
    const isDisableWeekday = (_a = self2.disableWeekdays) == null ? void 0 : _a.includes(dayWeekID);
    const isDisableAllDaysAndIsRangeEnabled = self2.disableAllDates && !!((_b = self2.private.enableDates) == null ? void 0 : _b[0]);
    if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !((_c = self2.private.enableDates) == null ? void 0 : _c.includes(date)) && !((_d = self2.private.disableDates) == null ? void 0 : _d.includes(date))) {
      self2.private.disableDates.push(date);
      (_e = self2.private.disableDates) == null ? void 0 : _e.sort((a, b) => +new Date(a) - +new Date(b));
    }
  };
  const createDate = (self2, currentYear, datesEl, dateID, dateStr, monthType) => {
    const dayWeekID = getDate(dateStr).getDay();
    const localeDate = typeof self2.locale === "string" && self2.locale.length ? self2.locale : "en";
    const dateEl = document.createElement("div");
    dateEl.className = self2.styles.date;
    dateEl.dataset.vcDate = dateStr;
    dateEl.dataset.vcDateMonth = monthType;
    dateEl.dataset.vcDateWeekDay = String(dayWeekID);
    let dateBtnEl = void 0;
    if (monthType !== "current" ? self2.displayDatesOutside : true) {
      dateBtnEl = document.createElement("button");
      dateBtnEl.className = self2.styles.dateBtn;
      dateBtnEl.type = "button";
      dateBtnEl.role = "gridcell";
      dateBtnEl.ariaLabel = getLocaleString(dateStr, localeDate, { dateStyle: "long", timeZone: "UTC" });
      dateBtnEl.dataset.vcDateBtn = "";
      dateBtnEl.innerText = String(dateID);
      dateEl.appendChild(dateBtnEl);
    }
    if (self2.enableWeekNumbers)
      addWeekNumberForDate(self2, dateEl, dateStr);
    setDaysAsDisabled(self2, dateStr, dayWeekID);
    setDateModifier(self2, currentYear, dateEl, dateBtnEl, dayWeekID, dateStr, monthType);
    datesEl.appendChild(dateEl);
    if (self2.onCreateDateEls)
      self2.onCreateDateEls(dateEl, self2);
  };
  const createDatesFromCurrentMonth = (self2, datesEl, days, currentYear, currentMonth) => {
    for (let dateID = 1; dateID <= days; dateID++) {
      const date = new Date(currentYear, currentMonth, dateID);
      createDate(self2, currentYear, datesEl, dateID, getDateString(date), "current");
    }
  };
  const createDatesFromNextMonth = (self2, daysEl, days, currentYear, currentMonth, firstDayWeek) => {
    const currentTotalDays = firstDayWeek + days;
    const rowsDays = Math.ceil(currentTotalDays / 7);
    const daysNextMonth = 7 * rowsDays - currentTotalDays;
    const year = currentMonth + 1 === 12 ? currentYear + 1 : currentYear;
    const month = currentMonth + 1 === 12 ? "01" : currentMonth + 2 < 10 ? `0${currentMonth + 2}` : currentMonth + 2;
    for (let i = 1; i <= daysNextMonth; i++) {
      const day = i < 10 ? `0${i}` : String(i);
      const dateStr = `${year}-${month}-${day}`;
      createDate(self2, currentYear, daysEl, i, dateStr, "next");
    }
  };
  const createDatesFromPrevMonth = (self2, datesEl, currentYear, currentMonth, firstDayWeek) => {
    let date = new Date(currentYear, currentMonth, 0).getDate() - (firstDayWeek - 1);
    const year = currentMonth === 0 ? currentYear - 1 : currentYear;
    const month = currentMonth === 0 ? 12 : currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    for (let i = firstDayWeek; i > 0; i--, date++) {
      const dateStr = `${year}-${month}-${date}`;
      createDate(self2, currentYear, datesEl, date, dateStr, "prev");
    }
  };
  const createWeekNumbers = (self2, firstDayWeek, days, weekNumbersEl, datesEl) => {
    if (!self2.enableWeekNumbers)
      return;
    weekNumbersEl.textContent = "";
    const weekNumbersTitleEl = document.createElement("b");
    weekNumbersTitleEl.className = self2.styles.weekNumbersTitle;
    weekNumbersTitleEl.innerText = "#";
    weekNumbersTitleEl.dataset.vcWeekNumbers = "title";
    weekNumbersEl.appendChild(weekNumbersTitleEl);
    const weekNumbersContentEl = document.createElement("div");
    weekNumbersContentEl.className = self2.styles.weekNumbersContent;
    weekNumbersContentEl.dataset.vcWeekNumbers = "content";
    weekNumbersEl.appendChild(weekNumbersContentEl);
    const templateWeekNumberEl = document.createElement("button");
    templateWeekNumberEl.type = "button";
    templateWeekNumberEl.className = self2.styles.weekNumber;
    const dateBtnEl = datesEl.querySelectorAll("[data-vc-date]");
    const weeksCount = Math.ceil((firstDayWeek + days) / 7);
    for (let i = 0; i < weeksCount; i++) {
      const index = i === 0 ? 6 : i * 7;
      const date = dateBtnEl[index].dataset.vcDate;
      const weekNumber = getWeekNumber(date, self2.firstWeekday);
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
  const createDates = (self2) => {
    const initDate = new Date(self2.private.selectedYear, self2.private.selectedMonth, 1);
    const datesEls = self2.private.mainElement.querySelectorAll('[data-vc="dates"]');
    const weekNumbersEls = self2.private.mainElement.querySelectorAll('[data-vc-week="numbers"]');
    datesEls.forEach((dateEl, index) => {
      if (!self2.selectionDatesMode)
        dateEl.dataset.vcDatesDisabled = "";
      dateEl.textContent = "";
      const currentDate = new Date(initDate);
      currentDate.setMonth(currentDate.getMonth() + index);
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const firstDayWeek = (new Date(currentYear, currentMonth, 1).getDay() - self2.firstWeekday + 7) % 7;
      const days = new Date(currentYear, currentMonth + 1, 0).getDate();
      createDatesFromPrevMonth(self2, dateEl, currentYear, currentMonth, firstDayWeek);
      createDatesFromCurrentMonth(self2, dateEl, days, currentYear, currentMonth);
      createDatesFromNextMonth(self2, dateEl, days, currentYear, currentMonth, firstDayWeek);
      createDatePopup(self2, dateEl);
      createWeekNumbers(self2, firstDayWeek, days, weekNumbersEls[index], dateEl);
    });
  };
  const layoutDefault = (self2) => `
  <div class="${self2.styles.header}" data-vc="header" role="toolbar" aria-label="${self2.labels.navigation}">
    <#ArrowPrev [month] />
    <div class="${self2.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${self2.styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${self2.styles.content}" data-vc="content">
      <#Week />
      <#Dates />
    </div>
  </div>
  <#ControlTime />
`;
  const layoutMonths = (self2) => `
  <div class="${self2.styles.header}" data-vc="header" role="toolbar" aria-label="${self2.labels.navigation}">
    <div class="${self2.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${self2.styles.wrapper}" data-vc="wrapper">
    <div class="${self2.styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`;
  const layoutMultiple = (self2) => `
  <div class="${self2.styles.controls}" data-vc="controls" role="toolbar" aria-label="${self2.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${self2.styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${self2.styles.column}" data-vc="column" role="region">
        <div class="${self2.styles.header}" data-vc="header">
          <div class="${self2.styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${self2.styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${self2.styles.content}" data-vc="content">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
  </div>
  <#ControlTime />
`;
  const layoutYears = (self2) => `
  <div class="${self2.styles.header}" data-vc="header" role="toolbar" aria-label="${self2.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${self2.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${self2.styles.wrapper}" data-vc="wrapper">
    <div class="${self2.styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`;
  const getCorrectNumberOfMonths = (self2) => self2.viewType === "multiple" ? self2.displayMonthsCount === 1 ? 2 : self2.displayMonthsCount > 12 ? 12 : self2.displayMonthsCount : 1;
  const ArrowNext = (self2, type) => `<button type="button" class="${self2.styles.arrowNext}" data-vc-arrow="next" aria-label="${self2.labels.arrowNext[type]}"></button>`;
  const ArrowPrev = (self2, type) => `<button type="button" class="${self2.styles.arrowPrev}" data-vc-arrow="prev" aria-label="${self2.labels.arrowPrev[type]}"></button>`;
  const ControlTime = (self2) => self2.selectionTimeMode ? `<div class="${self2.styles.time}" data-vc="time" role="group" aria-label="${self2.labels.selectingTime}"></div>` : "";
  const Dates = (self2) => `<div class="${self2.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${self2.labels.dates}" ${self2.viewType === "multiple" ? "aria-multiselectable" : ""}></div>`;
  const Month = (self2) => `<button type="button" class="${self2.styles.month}" data-vc="month"></button>`;
  const Months = (self2) => `<div class="${self2.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${self2.labels.months}"></div>`;
  const Week = (self2) => `<div class="${self2.styles.week}" data-vc="week" role="row" aria-label="${self2.labels.week}"></div>`;
  const WeekNumbers = (self2) => self2.enableWeekNumbers ? `<div class="${self2.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${self2.labels.weekNumber}"></div>` : "";
  const Year = (self2) => `<button type="button" class="${self2.styles.year}" data-vc="year"></button>`;
  const Years = (self2) => `<div class="${self2.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${self2.labels.years}"></div>`;
  const components = { ArrowNext, ArrowPrev, ControlTime, Dates, Month, Months, Week, WeekNumbers, Year, Years };
  const getComponent = (pattern) => components[pattern];
  const parseLayout = (self2, template) => {
    return template.replace(/[\n\t]/g, "").replace(/<#(?!\/?Multiple)(.*?)>/g, (_, tagContent) => {
      const type = (tagContent.match(/\[(.*?)\]/) || [])[1];
      const componentName = tagContent.replace(/[/\s\n\t]|\[(.*?)\]/g, "");
      const component = getComponent(componentName);
      const htmlContent = component ? component(self2, type != null ? type : null) : "";
      return self2.sanitizerHTML(htmlContent);
    }).replace(/[\n\t]/g, "");
  };
  const parseMultipleLayout = (self2, template) => {
    return template.replace(new RegExp("<#Multiple>(.*?)<#\\/Multiple>", "gs"), (_, content) => {
      const repeatedContent = Array(getCorrectNumberOfMonths(self2)).fill(content).join("");
      return self2.sanitizerHTML(repeatedContent);
    }).replace(/[\n\t]/g, "");
  };
  const createLayouts = (self2, target) => {
    const templateMap = {
      default: layoutDefault,
      month: layoutMonths,
      year: layoutYears,
      multiple: layoutMultiple
    };
    Object.keys(templateMap).forEach((key) => {
      const typedKey = key;
      if (!self2.layouts[typedKey].length)
        self2.layouts[typedKey] = templateMap[typedKey](self2);
    });
    self2.private.mainElement.className = self2.styles.calendar;
    self2.private.mainElement.dataset.vc = "calendar";
    self2.private.mainElement.dataset.vcType = self2.private.currentType;
    self2.private.mainElement.role = "application";
    self2.private.mainElement.tabIndex = 0;
    self2.private.mainElement.ariaLabel = self2.labels.application;
    if (self2.private.currentType === "multiple" && getCorrectNumberOfMonths(self2)) {
      self2.private.mainElement.innerHTML = parseMultipleLayout(self2, parseLayout(self2, self2.layouts[self2.private.currentType]));
      return;
    }
    if (self2.viewType === "multiple" && target) {
      const controlsEl = self2.private.mainElement.querySelector('[data-vc="controls"]');
      const gridEl = self2.private.mainElement.querySelector('[data-vc="grid"]');
      const columnEl = target.closest('[data-vc="column"]');
      if (controlsEl)
        self2.private.mainElement.removeChild(controlsEl);
      if (gridEl)
        gridEl.dataset.vcGrid = "hidden";
      if (columnEl)
        columnEl.dataset.vcColumn = self2.private.currentType;
      if (columnEl)
        columnEl.innerHTML = parseLayout(self2, self2.layouts[self2.private.currentType]);
      return;
    }
    self2.private.mainElement.innerHTML = parseLayout(self2, self2.layouts[self2.private.currentType]);
  };
  const setVisibilityArrows = (arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden) => {
    arrowPrevEl.style.visibility = isArrowPrevHidden ? "hidden" : "";
    arrowNextEl.style.visibility = isArrowNextHidden ? "hidden" : "";
  };
  const handleDefaultType = (self2, arrowPrevEl, arrowNextEl) => {
    const currentSelectedDate = getDate(getDateString(new Date(self2.private.selectedYear, self2.private.selectedMonth, 1)));
    const jumpDateMin = new Date(currentSelectedDate.getTime());
    const jumpDateMax = new Date(currentSelectedDate.getTime());
    jumpDateMin.setMonth(jumpDateMin.getMonth() - self2.monthsToSwitch);
    jumpDateMax.setMonth(jumpDateMax.getMonth() + self2.monthsToSwitch);
    if (!self2.selectionYearsMode) {
      self2.private.dateMin.setFullYear(currentSelectedDate.getFullYear());
      self2.private.dateMax.setFullYear(currentSelectedDate.getFullYear());
    }
    const isArrowPrevHidden = !self2.selectionMonthsMode || jumpDateMin.getFullYear() < self2.private.dateMin.getFullYear() || jumpDateMin.getFullYear() === self2.private.dateMin.getFullYear() && jumpDateMin.getMonth() < self2.private.dateMin.getMonth();
    const isArrowNextHidden = !self2.selectionMonthsMode || jumpDateMax.getFullYear() > self2.private.dateMax.getFullYear() || jumpDateMax.getFullYear() === self2.private.dateMax.getFullYear() && jumpDateMax.getMonth() > self2.private.dateMax.getMonth();
    setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
  };
  const handleYearType = (self2, arrowPrevEl, arrowNextEl) => {
    const isArrowPrevHidden = !!(self2.private.dateMin.getFullYear() && self2.private.displayYear - 7 <= self2.private.dateMin.getFullYear());
    const isArrowNextHidden = !!(self2.private.dateMax.getFullYear() && self2.private.displayYear + 7 >= self2.private.dateMax.getFullYear());
    setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
  };
  const visibilityArrows = (self2) => {
    if (self2.private.currentType === "month")
      return;
    const arrowPrevEl = self2.private.mainElement.querySelector('[data-vc-arrow="prev"]');
    const arrowNextEl = self2.private.mainElement.querySelector('[data-vc-arrow="next"]');
    if (!arrowPrevEl || !arrowNextEl)
      return;
    const updateType = {
      default: () => handleDefaultType(self2, arrowPrevEl, arrowNextEl),
      year: () => handleYearType(self2, arrowPrevEl, arrowNextEl)
    };
    updateType[self2.private.currentType === "multiple" ? "default" : self2.private.currentType]();
  };
  const visibilityHandler = (self2, el, index, initDate, type) => {
    const yearID = new Date(initDate.setFullYear(self2.private.selectedYear, self2.private.selectedMonth + index)).getFullYear();
    const monthID = new Date(initDate.setMonth(self2.private.selectedMonth + index)).getMonth();
    const monthLabel = self2.private.locale.months.long[monthID];
    const columnEl = el.closest('[data-vc="column"]');
    if (columnEl)
      columnEl.ariaLabel = `${monthLabel} ${yearID}`;
    const value = {
      month: { id: monthID, label: monthLabel },
      year: { id: yearID, label: yearID }
    };
    el.innerText = String(value[type].label);
    el.dataset[`vc${type.charAt(0).toUpperCase() + type.slice(1)}`] = String(value[type].id);
    el.ariaLabel = `${self2.labels[type]} ${value[type].label}`;
    const typesMap = { month: self2.selectionMonthsMode, year: self2.selectionYearsMode };
    const isDisabled = typesMap[type] === false || typesMap[type] === "only-arrows";
    if (isDisabled)
      el.tabIndex = -1;
    el.disabled = isDisabled;
  };
  const visibilityTitle = (self2) => {
    const monthEls = self2.private.mainElement.querySelectorAll('[data-vc="month"]');
    const yearEls = self2.private.mainElement.querySelectorAll('[data-vc="year"]');
    const initDate = new Date(self2.private.selectedYear, self2.private.selectedMonth, 1);
    [monthEls, yearEls].forEach((els) => els == null ? void 0 : els.forEach((el, index) => visibilityHandler(self2, el, index, initDate, el.dataset.vc)));
  };
  const setYearModifier = (self2, el, type, selected, reset2) => {
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
      (_a = self2.private.mainElement.querySelectorAll(selectors[type])) == null ? void 0 : _a.forEach((el2) => {
        el2.removeAttribute(attributes[type].selected);
        el2.removeAttribute(attributes[type].aria);
      });
      self2.private[attributes[type].selectedProperty] = Number(el.dataset[attributes[type].value]);
      visibilityTitle(self2);
      if (type === "year")
        visibilityArrows(self2);
    }
    if (selected) {
      el.setAttribute(attributes[type].selected, "");
      el.setAttribute(attributes[type].aria, "true");
    }
  };
  const relationshipID = (self2) => {
    if (self2.viewType !== "multiple")
      return 0;
    const columnEls = self2.private.mainElement.querySelectorAll('[data-vc="column"]');
    const indexColumn = Array.from(columnEls).findIndex((column) => column.closest('[data-vc-column="month"]'));
    return indexColumn > 0 ? indexColumn : 0;
  };
  const createMonthEl = (self2, templateEl, selected, titleShort, titleLong, disabled, id) => {
    const monthEl = templateEl.cloneNode(false);
    monthEl.className = self2.styles.monthsMonth;
    monthEl.innerText = titleShort;
    monthEl.ariaLabel = titleLong;
    monthEl.role = "gridcell";
    monthEl.dataset.vcMonthsMonth = `${id}`;
    if (disabled)
      monthEl.ariaDisabled = "true";
    if (disabled)
      monthEl.tabIndex = -1;
    monthEl.disabled = disabled;
    setYearModifier(self2, monthEl, "month", selected === id, false);
    return monthEl;
  };
  const createMonths = (self2, target) => {
    var _a, _b;
    const yearEl = (_a = target == null ? void 0 : target.closest('[data-vc="header"]')) == null ? void 0 : _a.querySelector('[data-vc="year"]');
    const selectedYear = yearEl ? Number(yearEl.dataset.vcYear) : self2.private.selectedYear;
    const selectedMonth = (target == null ? void 0 : target.dataset.vcMonth) ? Number(target.dataset.vcMonth) : self2.private.selectedMonth;
    self2.private.currentType = "month";
    createLayouts(self2, target);
    visibilityTitle(self2);
    const monthsEl = self2.private.mainElement.querySelector('[data-vc="months"]');
    if (!self2.selectionMonthsMode || !monthsEl)
      return;
    const activeMonthsID = self2.monthsToSwitch > 1 ? self2.private.locale.months.long.map((_, i) => selectedMonth - self2.monthsToSwitch * i).concat(self2.private.locale.months.long.map((_, i) => selectedMonth + self2.monthsToSwitch * i)).filter((monthID) => monthID >= 0 && monthID <= 12) : Array.from(Array(12).keys());
    const templateMonthEl = document.createElement("button");
    templateMonthEl.type = "button";
    for (let i = 0; i < 12; i++) {
      const monthDisabled = i < self2.private.dateMin.getMonth() + relationshipID(self2) && selectedYear <= self2.private.dateMin.getFullYear() || i > self2.private.dateMax.getMonth() + relationshipID(self2) && selectedYear >= self2.private.dateMax.getFullYear() || i !== selectedMonth && !activeMonthsID.includes(i);
      const monthEl = createMonthEl(
        self2,
        templateMonthEl,
        selectedMonth,
        self2.private.locale.months.short[i],
        self2.private.locale.months.long[i],
        monthDisabled,
        i
      );
      monthsEl.appendChild(monthEl);
      if (self2.onCreateMonthEls)
        self2.onCreateMonthEls(monthEl, self2);
    }
    (_b = self2.private.mainElement.querySelector(`[data-vc-months-month]`)) == null ? void 0 : _b.focus();
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
  const handleActions = (self2, event, value, type) => {
    const typeMap = {
      hour: () => self2.private.selectedHours = value,
      minute: () => self2.private.selectedMinutes = value
    };
    typeMap[type]();
    self2.private.selectedTime = `${self2.private.selectedHours}:${self2.private.selectedMinutes}${self2.private.selectedKeeping ? ` ${self2.private.selectedKeeping}` : ""}`;
    if (self2.onChangeTime)
      self2.onChangeTime(event, self2, false);
    if (self2.isInput && self2.private.inputElement && self2.private.mainElement && self2.onChangeToInput)
      self2.onChangeToInput(event, self2);
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
  const handleClickKeepingTime = (self2, keepingTimeEl, rangeHourEl, max, min) => {
    const handleClickKeepingTimeAction = (event) => {
      const newSelectedKeeping = self2.private.selectedKeeping === "AM" ? "PM" : "AM";
      const hour = transformTime24(self2.private.selectedHours, newSelectedKeeping);
      if (!(Number(hour) <= max && Number(hour) >= min)) {
        if (self2.onChangeTime)
          self2.onChangeTime(event, self2, true);
        return;
      }
      self2.private.selectedKeeping = newSelectedKeeping;
      rangeHourEl.value = hour;
      handleActions(self2, event, self2.private.selectedHours, "hour");
      keepingTimeEl.ariaLabel = `${self2.labels.btnKeeping} ${self2.private.selectedKeeping}`;
      keepingTimeEl.innerText = self2.private.selectedKeeping;
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
  const updateKeepingTime$1 = (self2, keepingTimeEl, keeping) => {
    if (!keepingTimeEl || !keeping)
      return;
    self2.private.selectedKeeping = keeping;
    keepingTimeEl.innerText = keeping;
  };
  const handleInput$1 = (self2, rangeEl, inputEl, keepingTimeEl, type, max, min) => {
    const handlers = {
      hour: (value, valueStr, event) => {
        if (!self2.selectionTimeMode)
          return;
        const timeMap = {
          12: () => {
            if (!self2.private.selectedKeeping)
              return;
            const correctValue = Number(transformTime24(valueStr, self2.private.selectedKeeping));
            if (!(correctValue <= max && correctValue >= min)) {
              updateInputAndRange(inputEl, rangeEl, self2.private.selectedHours, self2.private.selectedHours);
              if (self2.onChangeTime)
                self2.onChangeTime(event, self2, true);
              return;
            }
            updateInputAndRange(inputEl, rangeEl, transformTime12(valueStr), transformTime24(valueStr, self2.private.selectedKeeping));
            if (value > 12)
              updateKeepingTime$1(self2, keepingTimeEl, "PM");
            handleActions(self2, event, transformTime12(valueStr), type);
          },
          24: () => {
            if (!(value <= max && value >= min)) {
              updateInputAndRange(inputEl, rangeEl, self2.private.selectedHours, self2.private.selectedHours);
              if (self2.onChangeTime)
                self2.onChangeTime(event, self2, true);
              return;
            }
            updateInputAndRange(inputEl, rangeEl, valueStr, valueStr);
            handleActions(self2, event, valueStr, type);
          }
        };
        timeMap[self2.selectionTimeMode]();
      },
      minute: (value, valueStr, event) => {
        if (!(value <= max && value >= min)) {
          inputEl.value = self2.private.selectedMinutes;
          if (self2.onChangeTime)
            self2.onChangeTime(event, self2, true);
          return;
        }
        inputEl.value = valueStr;
        rangeEl.value = valueStr;
        handleActions(self2, event, valueStr, type);
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
  const updateInputAndTime = (self2, inputEl, event, type, value) => {
    inputEl.value = value;
    handleActions(self2, event, value, type);
  };
  const updateKeepingTime = (self2, keepingTimeEl, keeping) => {
    if (!keepingTimeEl)
      return;
    self2.private.selectedKeeping = keeping;
    keepingTimeEl.innerText = keeping;
  };
  const handleRange = (self2, rangeEl, inputEl, keepingTimeEl, type) => {
    const handleRangeAction = (event) => {
      const value = Number(rangeEl.value);
      const valueStr = rangeEl.value.padStart(2, "0");
      const isHourType = type === "hour";
      const isFormat24 = self2.selectionTimeMode === 24;
      const isAM = value > 0 && value < 12;
      if (isHourType && !isFormat24)
        updateKeepingTime(self2, keepingTimeEl, value === 0 || isAM ? "AM" : "PM");
      updateInputAndTime(self2, inputEl, event, type, isHourType && !isFormat24 && !isAM ? transformTime12(rangeEl.value) : valueStr);
    };
    rangeEl.addEventListener("input", handleRangeAction);
    return () => {
      rangeEl.removeEventListener("input", handleRangeAction);
    };
  };
  const handleMouseOver = (inputEl) => inputEl.setAttribute("data-vc-input-focus", "");
  const handleMouseOut = (inputEl) => inputEl.removeAttribute("data-vc-input-focus");
  const handleTime = (self2, timeEl) => {
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
    handleInput$1(self2, rangeHourEl, inputHourEl, keepingTimeEl, "hour", self2.timeMaxHour, self2.timeMinHour);
    handleInput$1(self2, rangeMinuteEl, inputMinuteEl, keepingTimeEl, "minute", self2.timeMaxMinute, self2.timeMinMinute);
    handleRange(self2, rangeHourEl, inputHourEl, keepingTimeEl, "hour");
    handleRange(self2, rangeMinuteEl, inputMinuteEl, keepingTimeEl, "minute");
    if (keepingTimeEl)
      handleClickKeepingTime(self2, keepingTimeEl, rangeHourEl, self2.timeMaxHour, self2.timeMinHour);
    return () => {
      timeEl.removeEventListener("mouseover", handleMouseOverEvent);
      timeEl.removeEventListener("mouseout", handleMouseOutEvent);
    };
  };
  const createTime = (self2) => {
    const timeEl = self2.private.mainElement.querySelector('[data-vc="time"]');
    if (!self2.selectionTimeMode || !timeEl)
      return;
    const [minHour, maxHour] = [self2.timeMinHour, self2.timeMaxHour];
    const [minMinutes, maxMinutes] = [self2.timeMinMinute, self2.timeMaxMinute];
    const valueHours = self2.private.selectedKeeping ? transformTime24(self2.private.selectedHours, self2.private.selectedKeeping) : self2.private.selectedHours;
    const range = self2.timeControls === "range";
    const btnKeeping = (selectedKeeping) => `<button type="button" class="${self2.styles.timeKeeping}" aria-label="${self2.labels.btnKeeping} ${selectedKeeping}" data-vc-time="keeping" ${range ? "disabled" : ""}>${selectedKeeping}</button>`;
    timeEl.innerHTML = self2.sanitizerHTML(`
    <div class="${self2.styles.timeContent}" data-vc-time="content">
      ${TimeInput("hour", self2.styles.timeHour, self2.labels, self2.private.selectedHours, range)}
      ${TimeInput("minute", self2.styles.timeMinute, self2.labels, self2.private.selectedMinutes, range)}
      ${self2.selectionTimeMode === 12 ? btnKeeping(self2.private.selectedKeeping) : ""}
    </div>
    <div class="${self2.styles.timeRanges}" data-vc-time="ranges">
      ${TimeRange("hour", self2.styles.timeRange, self2.labels, minHour, maxHour, self2.timeStepHour, valueHours)}
      ${TimeRange("minute", self2.styles.timeRange, self2.labels, minMinutes, maxMinutes, self2.timeStepMinute, self2.private.selectedMinutes)}
    </div>
  `);
    handleTime(self2, timeEl);
  };
  const createWeek = (self2) => {
    const weekend = self2.selectedWeekends ? [...self2.selectedWeekends] : [];
    const weekdaysData = [...self2.private.locale.weekdays.long].reduce(
      (acc, day, index) => [
        ...acc,
        {
          id: index,
          titleShort: self2.private.locale.weekdays.short[index],
          titleLong: day,
          isWeekend: weekend.includes(index)
        }
      ],
      []
    );
    const weekdays = [...weekdaysData.slice(self2.firstWeekday), ...weekdaysData.slice(0, self2.firstWeekday)];
    self2.private.mainElement.querySelectorAll('[data-vc="week"]').forEach((weekEl) => {
      const templateWeekDayEl = document.createElement("button");
      templateWeekDayEl.type = "button";
      weekdays.forEach((weekday) => {
        const weekDayEl = templateWeekDayEl.cloneNode(true);
        weekDayEl.innerText = weekday.titleShort;
        weekDayEl.className = self2.styles.weekDay;
        weekDayEl.role = "columnheader";
        weekDayEl.ariaLabel = weekday.titleLong;
        weekDayEl.dataset.vcWeekDay = String(weekday.id);
        if (weekday.isWeekend)
          weekDayEl.dataset.vcWeekDayOff = "";
        weekEl.appendChild(weekDayEl);
      });
    });
  };
  const createYearEl = (self2, templateEl, selected, disabled, id) => {
    const yearEl = templateEl.cloneNode(false);
    yearEl.className = self2.styles.yearsYear;
    yearEl.innerText = String(id);
    yearEl.ariaLabel = String(id);
    yearEl.role = "gridcell";
    yearEl.dataset.vcYearsYear = `${id}`;
    if (disabled)
      yearEl.ariaDisabled = "true";
    if (disabled)
      yearEl.tabIndex = -1;
    yearEl.disabled = disabled;
    setYearModifier(self2, yearEl, "year", selected === id, false);
    return yearEl;
  };
  const createYears = (self2, target) => {
    var _a;
    const selectedYear = (target == null ? void 0 : target.dataset.vcYear) ? Number(target.dataset.vcYear) : self2.private.selectedYear;
    self2.private.currentType = "year";
    createLayouts(self2, target);
    visibilityTitle(self2);
    visibilityArrows(self2);
    const yearsEl = self2.private.mainElement.querySelector('[data-vc="years"]');
    if (!self2.selectionYearsMode || !yearsEl)
      return;
    const relationshipID2 = self2.viewType !== "multiple" ? 0 : self2.private.selectedYear === selectedYear ? 0 : 1;
    const templateYearEl = document.createElement("button");
    templateYearEl.type = "button";
    for (let i = self2.private.displayYear - 7; i < self2.private.displayYear + 8; i++) {
      const yearDisabled = i < self2.private.dateMin.getFullYear() + relationshipID2 || i > self2.private.dateMax.getFullYear();
      const yearEl = createYearEl(self2, templateYearEl, selectedYear, yearDisabled, i);
      yearsEl.appendChild(yearEl);
      if (self2.onCreateYearEls)
        self2.onCreateYearEls(yearEl, self2);
    }
    (_a = self2.private.mainElement.querySelector(`[data-vc-years-year]`)) == null ? void 0 : _a.focus();
  };
  const haveListener = {
    value: false,
    set: () => haveListener.value = true,
    check: () => haveListener.value
  };
  const setTheme = (htmlEl, theme) => htmlEl.dataset.vcTheme = theme;
  const trackChangesThemeInSystemSettings = (self2, supportDarkTheme) => {
    setTheme(self2.private.mainElement, supportDarkTheme.matches ? "dark" : "light");
    if (self2.selectedTheme !== "system" || haveListener.check())
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
  const trackChangesThemeInHTMLElement = (self2, htmlEl, attr) => {
    const changes = (mutationsList) => {
      for (let i = 0; i < mutationsList.length; i++) {
        const record = mutationsList[i];
        if (record.attributeName === attr) {
          const activeTheme = htmlEl.getAttribute(attr);
          if (activeTheme)
            setTheme(self2.private.mainElement, activeTheme);
          break;
        }
      }
    };
    const observer = new MutationObserver(changes);
    observer.observe(htmlEl, { attributes: true });
  };
  const detectTheme = (self2, supportDarkTheme) => {
    const detectedThemeEl = self2.themeAttrDetect ? document.querySelector(self2.themeAttrDetect) : null;
    const attr = self2.themeAttrDetect.replace(/^.*\[(.+)\]/g, (_, p1) => p1);
    if (!detectedThemeEl || detectedThemeEl.getAttribute(attr) === "system") {
      trackChangesThemeInSystemSettings(self2, supportDarkTheme);
      return;
    }
    const activeTheme = detectedThemeEl.getAttribute(attr);
    if (activeTheme) {
      setTheme(self2.private.mainElement, activeTheme);
      trackChangesThemeInHTMLElement(self2, detectedThemeEl, attr);
    } else {
      trackChangesThemeInSystemSettings(self2, supportDarkTheme);
    }
  };
  const handleTheme = (self2) => {
    if (!(window.matchMedia("(prefers-color-scheme)").media !== "not all")) {
      setTheme(self2.private.mainElement, "light");
      return;
    }
    if (self2.selectedTheme === "system") {
      detectTheme(self2, window.matchMedia("(prefers-color-scheme: dark)"));
    } else {
      setTheme(self2.private.mainElement, self2.selectedTheme);
    }
  };
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, "");
  const getLocaleWeekday = (self2, dayIndex, locale) => {
    const date = /* @__PURE__ */ new Date(`1978-01-0${dayIndex + 1}T00:00:00.000Z`);
    const weekdayShort = date.toLocaleString(locale, { weekday: "short", timeZone: "UTC" });
    const weekdayLong = date.toLocaleString(locale, { weekday: "long", timeZone: "UTC" });
    self2.private.locale.weekdays.short.push(capitalizeFirstLetter(weekdayShort));
    self2.private.locale.weekdays.long.push(capitalizeFirstLetter(weekdayLong));
  };
  const getLocaleMonth = (self2, monthIndex, locale) => {
    const date = /* @__PURE__ */ new Date(`1978-${String(monthIndex + 1).padStart(2, "0")}-01T00:00:00.000Z`);
    const monthShort = date.toLocaleString(locale, { month: "short", timeZone: "UTC" });
    const monthLong = date.toLocaleString(locale, { month: "long", timeZone: "UTC" });
    self2.private.locale.months.short.push(capitalizeFirstLetter(monthShort));
    self2.private.locale.months.long.push(capitalizeFirstLetter(monthLong));
  };
  const getLocale = (self2) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const isHasPrivateLocale = self2.private.locale.weekdays.short[6] && self2.private.locale.weekdays.long[6] && self2.private.locale.months.short[11] && self2.private.locale.months.long[11];
    if (isHasPrivateLocale)
      return;
    if (typeof self2.locale !== "string") {
      const isManually = ((_b = (_a = self2.locale) == null ? void 0 : _a.weekdays) == null ? void 0 : _b.short[6]) && ((_d = (_c = self2.locale) == null ? void 0 : _c.weekdays) == null ? void 0 : _d.long[6]) && ((_f = (_e = self2.locale) == null ? void 0 : _e.months) == null ? void 0 : _f.short[11]) && ((_h = (_g = self2.locale) == null ? void 0 : _g.months) == null ? void 0 : _h.long[11]);
      if (!isManually)
        throw new Error(errorMessages.notLocale);
      self2.private.locale = __spreadValues({}, self2.locale);
      return;
    }
    if (typeof self2.locale === "string" && !self2.locale.length)
      throw new Error(errorMessages.notLocale);
    Array.from({ length: 7 }, (_, i) => getLocaleWeekday(self2, i, self2.locale));
    Array.from({ length: 12 }, (_, i) => getLocaleMonth(self2, i, self2.locale));
  };
  const create = (self2) => {
    const createComponents = {
      default: () => {
        createWeek(self2);
        createDates(self2);
      },
      multiple: () => {
        createWeek(self2);
        createDates(self2);
      },
      month: () => createMonths(self2),
      year: () => createYears(self2)
    };
    handleTheme(self2);
    getLocale(self2);
    createLayouts(self2);
    visibilityTitle(self2);
    visibilityArrows(self2);
    createTime(self2);
    createComponents[self2.private.currentType]();
  };
  const handleArrowKeys = (self2) => {
    const updateButtons = () => Array.from(self2.private.mainElement.querySelectorAll('[data-vc="calendar"] button'));
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
    self2.private.mainElement.addEventListener("keydown", onKeyDown);
    return () => {
      self2.private.mainElement.removeEventListener("keydown", onKeyDown);
    };
  };
  const handleMonth = (self2, route) => {
    const jumpDate = getDate(getDateString(new Date(self2.private.selectedYear, self2.private.selectedMonth, 1)));
    const routeMap = {
      prev: () => jumpDate.setMonth(jumpDate.getMonth() - self2.monthsToSwitch),
      next: () => jumpDate.setMonth(jumpDate.getMonth() + self2.monthsToSwitch)
    };
    routeMap[route]();
    [self2.private.selectedMonth, self2.private.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];
    visibilityTitle(self2);
    visibilityArrows(self2);
    createDates(self2);
  };
  const handleClickArrow = (self2, event) => {
    const element = event.target;
    const arrowEl = element.closest("[data-vc-arrow]");
    if (!arrowEl)
      return;
    if (["default", "multiple"].includes(self2.private.currentType)) {
      handleMonth(self2, arrowEl.dataset.vcArrow);
    } else if (self2.private.currentType === "year" && self2.private.displayYear !== void 0) {
      self2.private.displayYear += { prev: -15, next: 15 }[arrowEl.dataset.vcArrow];
      createYears(self2, event.target);
    }
    if (self2.onClickArrow)
      self2.onClickArrow(event, self2);
  };
  const canToggleSelection = (self2) => {
    if (self2.enableDateToggle !== void 0)
      return typeof self2.enableDateToggle === "function" ? self2.enableDateToggle(self2) : self2.enableDateToggle;
    return true;
  };
  const handleSelectDate = (self2, dateEl, multiple) => {
    const selectedDate = dateEl.dataset.vcDate;
    const isSelected = dateEl.closest("[data-vc-date][data-vc-date-selected]");
    const isToggleAllowed = canToggleSelection(self2);
    if (isSelected && !isToggleAllowed)
      return;
    self2.private.selectedDates = isSelected ? self2.private.selectedDates.filter((date) => date !== selectedDate) : multiple ? [...self2.private.selectedDates, selectedDate] : [selectedDate];
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
  const handleSelectDateRange = (self2, formattedDate) => {
    var _a;
    if (formattedDate) {
      const selectedDateExists = self2.private.selectedDates.length === 1 && self2.private.selectedDates[0].includes(formattedDate);
      self2.private.selectedDates = selectedDateExists && !canToggleSelection(self2) ? [formattedDate, formattedDate] : selectedDateExists && canToggleSelection(self2) ? [] : self2.private.selectedDates.length > 1 ? [formattedDate] : [...self2.private.selectedDates, formattedDate];
      (_a = self2.private.selectedDates) == null ? void 0 : _a.sort((a, b) => +new Date(a) - +new Date(b));
    }
    if (self2.disableDatesGaps) {
      current.rangeMin = current.rangeMin ? current.rangeMin : self2.private.displayDateMin;
      current.rangeMax = current.rangeMax ? current.rangeMax : self2.private.displayDateMax;
    }
    current.self = self2;
    removeHoverEffect();
    const selectionHandlers = {
      set: () => {
        self2.private.mainElement.addEventListener("mousemove", handleHoverDatesEvent);
        self2.private.mainElement.addEventListener("keydown", handleCancelSelectionDates);
        if (self2.disableDatesGaps)
          updateDisabledDates();
      },
      reset: () => {
        const [startDate, endDate] = [self2.private.selectedDates[0], self2.private.selectedDates[self2.private.selectedDates.length - 1]];
        const notSameDate = self2.private.selectedDates[0] !== self2.private.selectedDates[self2.private.selectedDates.length - 1];
        const allDates = parseDates([`${startDate}:${endDate}`]);
        const actualDates = allDates.filter((d) => !self2.private.disableDates.includes(d));
        self2.private.selectedDates = notSameDate ? self2.enableEdgeDatesOnly ? [startDate, endDate] : actualDates : [self2.private.selectedDates[0], self2.private.selectedDates[0]];
        self2.private.mainElement.removeEventListener("mousemove", handleHoverDatesEvent);
        self2.private.mainElement.removeEventListener("keydown", handleCancelSelectionDates);
        if (self2.disableDatesGaps)
          resetDisabledDates();
      }
    };
    selectionHandlers[self2.private.selectedDates.length === 1 ? "set" : "reset"]();
  };
  const updateDateModifier = (self2) => {
    const dateEls = self2.private.mainElement.querySelectorAll("[data-vc-date]");
    dateEls.forEach((dateEl) => {
      const dateBtnEl = dateEl.querySelector("[data-vc-date-btn]");
      const dateStr = dateEl.dataset.vcDate;
      const dayWeekID = getDate(dateStr).getDay();
      setDateModifier(self2, self2.private.selectedYear, dateEl, dateBtnEl, dayWeekID, dateStr, "current");
    });
  };
  const handleClickDate = (self2, event) => {
    var _a;
    const element = event.target;
    const dateBtnEl = element.closest("[data-vc-date-btn]");
    if (!self2.selectionDatesMode || !["single", "multiple", "multiple-ranged"].includes(self2.selectionDatesMode) || !dateBtnEl)
      return;
    const dateEl = dateBtnEl.closest("[data-vc-date]");
    const daySelectionActions = {
      single: () => handleSelectDate(self2, dateEl, false),
      multiple: () => handleSelectDate(self2, dateEl, true),
      "multiple-ranged": () => handleSelectDateRange(self2, dateEl.dataset.vcDate)
    };
    daySelectionActions[self2.selectionDatesMode]();
    (_a = self2.private.selectedDates) == null ? void 0 : _a.sort((a, b) => +new Date(a) - +new Date(b));
    if (self2.onClickDate)
      self2.onClickDate(event, self2);
    if (self2.isInput && self2.private.inputElement && self2.private.mainElement && self2.onChangeToInput)
      self2.onChangeToInput(event, self2);
    const dayPrevEl = element.closest('[data-vc-date-month="prev"]');
    const dayNextEl = element.closest('[data-vc-date-month="next"]');
    const actionMapping = {
      prev: () => self2.enableMonthChangeOnDayClick ? handleMonth(self2, "prev") : updateDateModifier(self2),
      next: () => self2.enableMonthChangeOnDayClick ? handleMonth(self2, "next") : updateDateModifier(self2),
      current: () => updateDateModifier(self2)
    };
    actionMapping[dayPrevEl ? "prev" : dayNextEl ? "next" : "current"]();
  };
  const typeClick = ["month", "year"];
  const getColumnID = (self2, type, id) => {
    const columnEls = self2.private.mainElement.querySelectorAll('[data-vc="column"]');
    const indexColumn = Array.from(columnEls).findIndex((column) => column.closest(`[data-vc-column="${type}"]`));
    const currentValue = Number(columnEls[indexColumn].querySelector(`[data-vc="${type}"]`).getAttribute(`data-vc-${type}`));
    return self2.private.currentType === "month" && indexColumn >= 0 ? id - indexColumn : self2.private.currentType === "year" && self2.private.selectedYear !== currentValue ? id - 1 : id;
  };
  const handleMultipleYearSelection = (self2, itemEl) => {
    const selectedYear = getColumnID(self2, "year", Number(itemEl.dataset.vcYearsYear));
    const isBeforeMinDate = self2.private.selectedMonth < self2.private.dateMin.getMonth() && selectedYear <= self2.private.dateMin.getFullYear();
    const isAfterMaxDate = self2.private.selectedMonth > self2.private.dateMax.getMonth() && selectedYear >= self2.private.dateMax.getFullYear();
    const isBeforeMinYear = selectedYear < self2.private.dateMin.getFullYear();
    const isAfterMaxYear = selectedYear > self2.private.dateMax.getFullYear();
    self2.private.selectedYear = isBeforeMinDate || isBeforeMinYear ? self2.private.dateMin.getFullYear() : isAfterMaxDate || isAfterMaxYear ? self2.private.dateMax.getFullYear() : selectedYear;
    self2.private.selectedMonth = isBeforeMinDate || isBeforeMinYear ? self2.private.dateMin.getMonth() : isAfterMaxDate || isAfterMaxYear ? self2.private.dateMax.getMonth() : self2.private.selectedMonth;
  };
  const handleMultipleMonthSelection = (self2, itemEl) => {
    const column = itemEl.closest('[data-vc-column="month"]');
    const yearEl = column.querySelector('[data-vc="year"]');
    const selectedMonth = getColumnID(self2, "month", Number(itemEl.dataset.vcMonthsMonth));
    const selectedYear = Number(yearEl.dataset.vcYear);
    const isBeforeMinDate = selectedMonth < self2.private.dateMin.getMonth() && selectedYear <= self2.private.dateMin.getFullYear();
    const isAfterMaxDate = selectedMonth > self2.private.dateMax.getMonth() && selectedYear >= self2.private.dateMax.getFullYear();
    self2.private.selectedYear = selectedYear;
    self2.private.selectedMonth = isBeforeMinDate ? self2.private.dateMin.getMonth() : isAfterMaxDate ? self2.private.dateMax.getMonth() : selectedMonth;
  };
  const handleItemClick = (self2, event, type, itemEl) => {
    var _a;
    const selectByType = {
      year: () => {
        if (self2.viewType === "multiple")
          return handleMultipleYearSelection(self2, itemEl);
        self2.private.selectedYear = Number(itemEl.dataset.vcYearsYear);
      },
      month: () => {
        if (self2.viewType === "multiple")
          return handleMultipleMonthSelection(self2, itemEl);
        self2.private.selectedMonth = Number(itemEl.dataset.vcMonthsMonth);
      }
    };
    selectByType[type]();
    const actionByType = {
      year: () => {
        var _a2;
        return (_a2 = self2.onClickYear) == null ? void 0 : _a2.call(self2, event, self2);
      },
      month: () => {
        var _a2;
        return (_a2 = self2.onClickMonth) == null ? void 0 : _a2.call(self2, event, self2);
      }
    };
    actionByType[type]();
    if (self2.private.currentType !== self2.viewType) {
      self2.private.currentType = self2.viewType;
      create(self2);
      (_a = self2.private.mainElement.querySelector(`[data-vc="${type}"]`)) == null ? void 0 : _a.focus();
    } else {
      setYearModifier(self2, itemEl, type, true, true);
    }
  };
  const handleClickType = (self2, event, type) => {
    var _a;
    const target = event.target;
    const headerEl = target.closest(`[data-vc="${type}"]`);
    const createByType = {
      year: () => createYears(self2, target),
      month: () => createMonths(self2, target)
    };
    if (headerEl && self2.onClickTitle)
      self2.onClickTitle(event, self2);
    if (headerEl && self2.private.currentType !== type)
      return createByType[type]();
    const itemEl = target.closest(`[data-vc-${type}s-${type}]`);
    if (itemEl)
      return handleItemClick(self2, event, type, itemEl);
    const gridEl = target.closest('[data-vc="grid"]');
    const columnEl = target.closest('[data-vc="column"]');
    if (self2.private.currentType === type && headerEl || self2.viewType === "multiple" && self2.private.currentType === type && gridEl && !columnEl) {
      self2.private.currentType = self2.viewType;
      create(self2);
      (_a = self2.private.mainElement.querySelector(`[data-vc="${type}"]`)) == null ? void 0 : _a.focus();
    }
  };
  const handleClickMonthOrYear = (self2, event) => {
    const typesMap = { month: self2.selectionMonthsMode, year: self2.selectionYearsMode };
    typeClick.forEach((type) => {
      if (!typesMap[type] || !event.target)
        return;
      handleClickType(self2, event, type);
    });
  };
  const handleClickWeekNumber = (self2, event) => {
    if (!self2.enableWeekNumbers || !self2.onClickWeekNumber)
      return;
    const weekNumberEl = event.target.closest("[data-vc-week-number]");
    const daysToWeeks = self2.private.mainElement.querySelectorAll("[data-vc-date-week-number]");
    if (!weekNumberEl || !daysToWeeks[0])
      return;
    const weekNumberValue = Number(weekNumberEl.innerText);
    const yearWeek = Number(weekNumberEl.dataset.vcWeekYear);
    const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number(day.dataset.vcDateWeekNumber) === weekNumberValue);
    self2.onClickWeekNumber(event, weekNumberValue, daysOfThisWeek, yearWeek, self2);
  };
  const handleClickWeekDay = (self2, event) => {
    if (!self2.onClickWeekDay)
      return;
    const weekDayEl = event.target.closest("[data-vc-week-day]");
    const columnEl = event.target.closest('[data-vc="column"]');
    const daysToWeeks = columnEl ? columnEl.querySelectorAll("[data-vc-date-week-day]") : self2.private.mainElement.querySelectorAll("[data-vc-date-week-day]");
    if (!weekDayEl || !daysToWeeks[0])
      return;
    const weekDayValue = Number(weekDayEl.dataset.vcWeekDay);
    const daysOfThisWeek = Array.from(daysToWeeks).filter((day) => Number(day.dataset.vcDateWeekDay) === weekDayValue);
    self2.onClickWeekDay(event, weekDayValue, daysOfThisWeek, self2);
  };
  const handleClick = (self2) => {
    const clickEventHandler = (e) => {
      handleClickArrow(self2, e);
      handleClickWeekDay(self2, e);
      handleClickWeekNumber(self2, e);
      handleClickDate(self2, e);
      handleClickMonthOrYear(self2, e);
    };
    self2.private.mainElement.addEventListener("click", clickEventHandler);
    return () => self2.private.mainElement.removeEventListener("click", clickEventHandler);
  };
  const initDateMinMax = (self2) => {
    self2.private.dateMin = self2.displayDisabledDates ? getDate(self2.dateMin) : getDate(self2.private.displayDateMin);
    self2.private.dateMax = self2.displayDisabledDates ? getDate(self2.dateMax) : getDate(self2.private.displayDateMax);
  };
  const getLocalDate = () => {
    const now = /* @__PURE__ */ new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 6e4).toISOString().substring(0, 10);
  };
  const initRange = (self2) => {
    var _a, _b, _c;
    if (self2.dateMin === "today")
      self2.dateMin = getLocalDate();
    if (self2.dateMax === "today")
      self2.dateMax = getLocalDate();
    if (self2.displayDateMin === "today")
      self2.displayDateMin = getLocalDate();
    if (self2.displayDateMax === "today")
      self2.displayDateMax = getLocalDate();
    self2.displayDateMin = self2.displayDateMin ? getDate(self2.dateMin) >= getDate(self2.displayDateMin) ? self2.dateMin : self2.displayDateMin : self2.dateMin;
    self2.displayDateMax = self2.displayDateMax ? getDate(self2.dateMax) <= getDate(self2.displayDateMax) ? self2.dateMax : self2.displayDateMax : self2.dateMax;
    const isDisablePast = self2.disableDatesPast && !self2.disableAllDates && getDate(self2.displayDateMin) < self2.dateToday;
    self2.private.displayDateMin = isDisablePast ? getDateString(self2.dateToday) : self2.disableAllDates ? getDateString(self2.dateToday) : self2.displayDateMin;
    self2.private.displayDateMax = self2.disableAllDates ? getDateString(self2.dateToday) : self2.displayDateMax;
    self2.private.disableDates = self2.disableDates && !self2.disableAllDates ? parseDates(self2.disableDates) : self2.disableAllDates ? [self2.private.displayDateMin] : [];
    if (self2.private.disableDates.length > 1)
      self2.private.disableDates.sort((a, b) => +new Date(a) - +new Date(b));
    self2.private.enableDates = self2.enableDates ? parseDates(self2.enableDates) : [];
    if (((_a = self2.private.enableDates) == null ? void 0 : _a[0]) && ((_b = self2.private.disableDates) == null ? void 0 : _b[0]))
      self2.private.disableDates = self2.private.disableDates.filter((d) => !self2.private.enableDates.includes(d));
    if (self2.private.enableDates.length > 1)
      self2.private.enableDates.sort((a, b) => +new Date(a) - +new Date(b));
    if (((_c = self2.private.enableDates) == null ? void 0 : _c[0]) && self2.disableAllDates) {
      self2.private.displayDateMin = self2.private.enableDates[0];
      self2.private.displayDateMax = self2.private.enableDates[self2.private.enableDates.length - 1];
    }
  };
  const initSelectedDates = (self2) => {
    var _a;
    self2.private.selectedDates = ((_a = self2.selectedDates) == null ? void 0 : _a[0]) ? parseDates(self2.selectedDates) : [];
  };
  const initSelectedMonthYear = (self2) => {
    var _a;
    if (self2.enableJumpToSelectedDate && ((_a = self2.selectedDates) == null ? void 0 : _a.length) && self2.selectedMonth === void 0 && self2.selectedYear === void 0) {
      const selectedDate = getDate(parseDates(self2.selectedDates)[0]);
      self2.selectedMonth = selectedDate.getMonth();
      self2.selectedYear = selectedDate.getFullYear();
    }
    const isValidMonth = self2.selectedMonth !== void 0 && Number(self2.selectedMonth) >= 0 && Number(self2.selectedMonth) < 12;
    const isValidYear = self2.selectedYear !== void 0 && Number(self2.selectedYear) >= 0 && Number(self2.selectedYear) <= 9999;
    self2.private.selectedMonth = isValidMonth ? Number(self2.selectedMonth) : self2.dateToday.getMonth();
    self2.private.selectedYear = isValidYear ? Number(self2.selectedYear) : self2.dateToday.getFullYear();
    self2.private.displayYear = self2.private.selectedYear;
  };
  const initTime = (self2) => {
    var _a, _b, _c;
    if (!self2.selectionTimeMode)
      return;
    if (![12, 24].includes(self2.selectionTimeMode))
      throw new Error(errorMessages.incorrectTime);
    const isTime12 = self2.selectionTimeMode === 12;
    const timeRegex = isTime12 ? /^(0[1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    let [hours, minutes, keeping] = (_c = (_b = (_a = self2.selectedTime) == null ? void 0 : _a.match(timeRegex)) == null ? void 0 : _b.slice(1)) != null ? _c : [];
    if (!hours) {
      hours = isTime12 ? transformTime12(String(self2.timeMinHour)) : String(self2.timeMinHour);
      minutes = String(self2.timeMinMinute);
      keeping = isTime12 ? Number(transformTime12(String(self2.timeMinHour))) >= 12 ? "PM" : "AM" : null;
    } else if (isTime12 && !keeping) {
      keeping = "AM";
    }
    self2.private.selectedHours = hours.padStart(2, "0");
    self2.private.selectedMinutes = minutes.padStart(2, "0");
    self2.private.selectedKeeping = keeping;
    self2.private.selectedTime = `${self2.private.selectedHours}:${self2.private.selectedMinutes}${keeping ? ` ${keeping}` : ""}`;
  };
  const initAllVariables = (self2) => {
    self2.private.currentType = self2.viewType;
    initSelectedMonthYear(self2);
    initRange(self2);
    initSelectedDates(self2);
    initDateMinMax(self2);
    initTime(self2);
  };
  const reset = (self2, { year, month, dates, time, locale }) => {
    var _a;
    const previousSelected = {
      year: self2.selectedYear,
      month: self2.selectedMonth,
      dates: self2.selectedDates,
      time: self2.selectedTime
    };
    self2.selectedYear = year ? previousSelected.year : self2.private.selectedYear;
    self2.selectedMonth = month ? previousSelected.month : self2.private.selectedMonth;
    self2.selectedTime = time ? previousSelected.time : self2.private.selectedTime;
    self2.selectedDates = dates === "only-first" && ((_a = self2.private.selectedDates) == null ? void 0 : _a[0]) ? [self2.private.selectedDates[0]] : dates === true ? previousSelected.dates : self2.private.selectedDates;
    if (locale) {
      self2.private.locale = {
        months: { short: [], long: [] },
        weekdays: { short: [], long: [] }
      };
    }
    initAllVariables(self2);
    create(self2);
    self2.selectedYear = previousSelected.year;
    self2.selectedMonth = previousSelected.month;
    self2.selectedDates = previousSelected.dates;
    self2.selectedTime = previousSelected.time;
    if (self2.selectionDatesMode === "multiple-ranged" && dates)
      handleSelectDateRange(self2);
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
  const createToInput = (self2, isVisible = true) => {
    const calendar = document.createElement("div");
    calendar.className = self2.styles.calendar;
    calendar.dataset.vc = "calendar";
    calendar.dataset.vcInput = "";
    calendar.dataset.vcCalendarHidden = "";
    calendar.style.visibility = "hidden";
    self2.private.isInputInit = true;
    self2.private.mainElement = calendar;
    document.body.appendChild(self2.private.mainElement);
    if (isVisible) {
      queueMicrotask(() => {
        setPosition(self2.private.inputElement, calendar, self2.positionToInput);
        self2.private.mainElement.style.visibility = "visible";
        self2.show();
      });
    }
    reset(self2, {
      year: true,
      month: true,
      dates: true,
      time: true,
      locale: true
    });
    if (self2.onInit)
      self2.onInit(self2);
    handleArrowKeys(self2);
    return handleClick(self2);
  };
  const handleInput = (self2) => {
    const cleanup = [];
    self2.private.inputElement = self2.private.mainElement;
    const handleResize = () => setPosition(self2.private.inputElement, self2.private.mainElement, self2.positionToInput);
    const handleEscapeKey = (e) => {
      var _a, _b;
      if (e.key !== "Escape")
        return;
      if (((_a = self2 == null ? void 0 : self2.private) == null ? void 0 : _a.inputElement) && ((_b = self2 == null ? void 0 : self2.private) == null ? void 0 : _b.mainElement))
        self2.hide();
      document.removeEventListener("keydown", handleEscapeKey);
    };
    const documentClickEvent = (e) => {
      if (!self2 || e.target === self2.private.inputElement || self2.private.mainElement.contains(e.target))
        return;
      if (self2.private.inputElement && self2.private.mainElement)
        self2.hide();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", documentClickEvent, { capture: true });
    };
    const handleOpenCalendar = () => {
      if (!self2.private.isInputInit) {
        cleanup.push(createToInput(self2));
      } else {
        setPosition(self2.private.inputElement, self2.private.mainElement, self2.positionToInput);
        self2.private.mainElement.style.visibility = "visible";
        self2.show();
      }
      window.addEventListener("resize", handleResize);
      document.addEventListener("click", documentClickEvent, { capture: true });
      document.addEventListener("keydown", handleEscapeKey);
    };
    self2.private.inputElement.addEventListener("click", handleOpenCalendar);
    self2.private.inputElement.addEventListener("focus", handleOpenCalendar);
    return () => {
      cleanup.forEach((clean) => clean());
    };
  };
  const init = (self2) => {
    self2.private.originalElement = self2.private.mainElement.cloneNode(true);
    self2.private.isInit = true;
    if (self2.isInput)
      return handleInput(self2);
    initAllVariables(self2);
    create(self2);
    if (self2.onInit)
      self2.onInit(self2);
    handleArrowKeys(self2);
    return handleClick(self2);
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
  const set = (self2, options, resetOptions) => {
    const defaultReset = { year: true, month: true, dates: true, time: true, locale: true };
    replaceProperties(self2, options);
    reset(self2, __spreadValues(__spreadValues({}, defaultReset), resetOptions));
  };
  const show = (self2) => {
    if (!self2.private.currentType) {
      self2.private.mainElement.click();
      return;
    }
    self2.private.mainElement.removeAttribute("data-vc-calendar-hidden");
    if (self2.onShow)
      self2.onShow(self2);
  };
  const update = (self2, resetOptions) => {
    if (!self2.private.isInit)
      throw new Error(errorMessages.notInit);
    if (self2.isInput && !self2.private.isInputInit)
      createToInput(self2, false);
    const defaultReset = { year: false, month: false, dates: false, time: false, locale: false };
    reset(self2, __spreadValues(__spreadValues({}, defaultReset), resetOptions));
    if (self2.onUpdate)
      self2.onUpdate(self2);
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
  exports2.VanillaCalendarPro = VanillaCalendarPro;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
