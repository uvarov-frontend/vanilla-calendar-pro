/*! name: @uvarov.frontend/vanilla-calendar | url: https://github.com/uvarov-frontend/vanilla-calendar */
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
const generateDate = (date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  return `${year}-${month}-${day}`;
};
const parserDates = (dates) => {
  const newDates = [];
  dates.forEach((date) => {
    if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
      newDates.push(date);
    } else {
      date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, d1, d2) => {
        const startDate = /* @__PURE__ */ new Date(`${d1}T00:00:00`);
        const endDate = /* @__PURE__ */ new Date(`${d2}T00:00:00`);
        const currentDate = new Date(startDate.getTime());
        for (currentDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
          newDates.push(generateDate(currentDate));
        }
        return _;
      });
    }
  });
  return newDates;
};
const transformTime12 = (hour) => {
  const oldHour = Number(hour);
  let newHour = String(oldHour);
  if (oldHour === 0) {
    newHour = "12";
  } else if (oldHour === 13) {
    newHour = "01";
  } else if (oldHour === 14) {
    newHour = "02";
  } else if (oldHour === 15) {
    newHour = "03";
  } else if (oldHour === 16) {
    newHour = "04";
  } else if (oldHour === 17) {
    newHour = "05";
  } else if (oldHour === 18) {
    newHour = "06";
  } else if (oldHour === 19) {
    newHour = "07";
  } else if (oldHour === 20) {
    newHour = "08";
  } else if (oldHour === 21) {
    newHour = "09";
  } else if (oldHour === 22) {
    newHour = "10";
  } else if (oldHour === 23) {
    newHour = "11";
  }
  return newHour;
};
const setVariablesDates = (self) => {
  var _a, _b;
  self.rangeMin = self.settings.range.min;
  self.rangeMax = self.settings.range.max;
  self.rangeDisabled = self.settings.range.disabled ? parserDates([...self.settings.range.disabled]) : [];
  self.rangeEnabled = self.settings.range.enabled ? parserDates([...self.settings.range.enabled]) : [];
  self.selectedDates = self.settings.selected.dates ? parserDates([...self.settings.selected.dates]) : [];
  self.selectedHolidays = self.settings.selected.holidays ? parserDates([...self.settings.selected.holidays]) : [];
  if (self.settings.range.disablePast && !self.settings.range.disableAllDays && /* @__PURE__ */ new Date(`${self.settings.range.min}T00:00:00`) < self.date.today) {
    self.rangeMin = generateDate(self.date.today);
  }
  if (self.settings.range.disableAllDays) {
    self.rangeMin = generateDate(self.date.today);
    self.rangeMax = generateDate(self.date.today);
    (_a = self.rangeDisabled) == null ? void 0 : _a.push(generateDate(self.date.today));
  }
  if (self.rangeEnabled)
    self.rangeEnabled.sort((a, b) => +new Date(a) - +new Date(b));
  if (((_b = self.rangeEnabled) == null ? void 0 : _b[0]) && self.settings.range.disableAllDays) {
    self.rangeMin = self.rangeEnabled[0];
    self.rangeMax = self.rangeEnabled[self.rangeEnabled.length - 1];
  }
  const firstDay = /* @__PURE__ */ new Date(`${self.rangeMin}T00:00:00`);
  const lastDay = /* @__PURE__ */ new Date(`${self.rangeMax}T00:00:00`);
  firstDay.setDate(firstDay.getDate() - 1);
  lastDay.setDate(lastDay.getDate() + 1);
  self.rangeDisabled.push(generateDate(firstDay));
  self.rangeDisabled.push(generateDate(lastDay));
  if (self.settings.selected.month !== null && self.settings.selected.month >= 0 && self.settings.selected.month < 12) {
    self.selectedMonth = self.settings.selected.month;
  } else {
    self.selectedMonth = self.date.today.getMonth();
  }
  if (self.settings.selected.year !== null && self.settings.selected.year >= 0 && self.settings.selected.year <= 9999) {
    self.selectedYear = self.settings.selected.year;
  } else {
    self.selectedYear = self.date.today.getFullYear();
  }
  self.viewYear = self.selectedYear;
  self.dateMin = self.settings.visibility.disabled ? /* @__PURE__ */ new Date(`${self.date.min}T00:00:00`) : /* @__PURE__ */ new Date(`${self.rangeMin}T00:00:00`);
  self.dateMax = self.settings.visibility.disabled ? /* @__PURE__ */ new Date(`${self.date.max}T00:00:00`) : /* @__PURE__ */ new Date(`${self.rangeMax}T00:00:00`);
  const time12 = self.settings.selection.time === true || self.settings.selection.time === 12;
  if (time12 || self.settings.selection.time === 24) {
    self.userTime = false;
    if (typeof self.settings.selected.time === "string") {
      const regExr = time12 ? /^([0-9]|0[1-9]|1[0-2]):([0-5][0-9])|(AM|PM)/g : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])/g;
      self.settings.selected.time.replace(regExr, (_, p1, p2, p3) => {
        if (p1 && p2) {
          self.userTime = true;
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
    if (!self.userTime && time12) {
      self.selectedHours = transformTime12(String(self.date.today.getHours()));
      self.selectedMinutes = String(self.date.today.getMinutes());
      self.selectedKeeping = Number(self.date.today.getHours()) >= 12 ? "PM" : "AM";
    } else if (!self.userTime) {
      self.selectedHours = String(self.date.today.getHours());
      self.selectedMinutes = String(self.date.today.getMinutes());
    }
    self.selectedHours = Number(self.selectedHours) < 10 ? `0${Number(self.selectedHours)}` : `${self.selectedHours}`;
    self.selectedMinutes = Number(self.selectedMinutes) < 10 ? `0${Number(self.selectedMinutes)}` : `${self.selectedMinutes}`;
    self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ""}`;
  } else if (self.settings.selection.time) {
    self.settings.selection.time = false;
    console.error("The value of the time property can be: false, true, 12 or 24.");
  }
  if (self.type !== "multiple")
    return;
  if (self.months === 1) {
    console.warn("The value of the «months» parameter cannot be less than «2», the minimum available value will be initialized.");
    self.correctMonths = 2;
  } else if (self.months > 12) {
    console.warn("The value of the «months» parameter cannot be greater than «12», the maximum available value will be initialized.");
    self.correctMonths = 12;
  } else {
    self.correctMonths = self.months;
  }
};
const controlArrows = (self) => {
  if (!["default", "multiple", "year"].includes(self.currentType))
    return;
  const arrowPrev = self.HTMLElement.querySelector(`.${self.CSSClasses.arrowPrev}`);
  const arrowNext = self.HTMLElement.querySelector(`.${self.CSSClasses.arrowNext}`);
  if (!arrowPrev || !arrowNext)
    return;
  const defaultControl = () => {
    if (!self.dateMin || !self.dateMax)
      return;
    const jumpDateMin = /* @__PURE__ */ new Date(`${generateDate(new Date(self.selectedYear, self.selectedMonth, 1))}T00:00:00`);
    const jumpDateMax = new Date(jumpDateMin.getTime());
    jumpDateMin.setMonth(jumpDateMin.getMonth() - self.jumpMonths);
    jumpDateMax.setMonth(jumpDateMax.getMonth() + self.jumpMonths);
    if (!self.settings.selection.month || jumpDateMin.getFullYear() < self.dateMin.getFullYear() || jumpDateMin.getFullYear() === self.dateMin.getFullYear() && jumpDateMin.getMonth() < self.dateMin.getMonth()) {
      arrowPrev.style.visibility = "hidden";
    } else {
      arrowPrev.style.visibility = "";
    }
    if (!self.settings.selection.month || jumpDateMax.getFullYear() > self.dateMax.getFullYear() || jumpDateMax.getFullYear() === self.dateMax.getFullYear() && jumpDateMax.getMonth() > self.dateMax.getMonth()) {
      arrowNext.style.visibility = "hidden";
    } else {
      arrowNext.style.visibility = "";
    }
  };
  const yearControl = () => {
    if (!self.dateMin || !self.dateMax || self.viewYear === void 0)
      return;
    if (self.dateMin.getFullYear() && self.viewYear - 7 <= self.dateMin.getFullYear()) {
      arrowPrev.style.visibility = "hidden";
    } else {
      arrowPrev.style.visibility = "";
    }
    if (self.dateMax.getFullYear() && self.viewYear + 7 >= self.dateMax.getFullYear()) {
      arrowNext.style.visibility = "hidden";
    } else {
      arrowNext.style.visibility = "";
    }
  };
  if (self.currentType === "default" || self.currentType === "multiple")
    defaultControl();
  if (self.currentType === "year")
    yearControl();
};
const createPopup = (self, daysEl) => {
  if (!self.popups)
    return;
  Object.keys(self.popups).forEach((date) => {
    var _a;
    const dayBtnEl = daysEl.querySelector(`[data-calendar-day="${date}"]`);
    if (dayBtnEl) {
      const dayInfo = (_a = self.popups) == null ? void 0 : _a[date];
      if (dayInfo == null ? void 0 : dayInfo.modifier)
        dayInfo.modifier.trim().split(" ").forEach((cl) => {
          dayBtnEl.classList.add(cl);
        });
      if (dayInfo == null ? void 0 : dayInfo.html)
        dayBtnEl.parentNode.innerHTML += `<div class="${self.CSSClasses.dayPopup}">${dayInfo.html}</div>`;
    }
  });
};
const getWeekNumber = (date, iso8601) => {
  if (!date)
    return null;
  const day = (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getDate();
  const month = (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getMonth();
  const year = (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getFullYear();
  const currentDate = new Date(year, month, day);
  const dayNum = iso8601 ? currentDate.getDay() || 7 : currentDate.getDay();
  currentDate.setDate(currentDate.getDate() + 4 - dayNum);
  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((+currentDate - +yearStart) / 864e5 + 1) / 7);
  return {
    year,
    week: weekNumber
  };
};
const createWeekNumbers = (self, firstDayWeek, daysSelectedMonth, weekNumbersEl, daysEl) => {
  if (!self.settings.visibility.weekNumbers)
    return;
  const dayEls = daysEl.querySelectorAll(`.${self.CSSClasses.day}`);
  weekNumbersEl.innerHTML = "";
  const countWeek = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);
  const weekNumbersTitleEl = document.createElement("b");
  weekNumbersTitleEl.className = self.CSSClasses.weekNumbersTitle;
  weekNumbersTitleEl.innerText = "#";
  weekNumbersEl.append(weekNumbersTitleEl);
  const weekNumbersContentEl = document.createElement("div");
  weekNumbersContentEl.className = self.CSSClasses.weekNumbersContent;
  weekNumbersEl.append(weekNumbersContentEl);
  const templateWeekNumberEl = document.createElement("span");
  templateWeekNumberEl.className = self.CSSClasses.weekNumber;
  for (let i = 0; i < countWeek; i++) {
    let dayBtnEl = null;
    if (i === 0) {
      dayBtnEl = dayEls[6].querySelector(`.${self.CSSClasses.dayBtn}`);
    } else {
      dayBtnEl = dayEls[i * 7].querySelector(`.${self.CSSClasses.dayBtn}`);
    }
    const weekNumber = getWeekNumber(dayBtnEl.dataset.calendarDay, self.settings.iso8601);
    if (!weekNumber)
      return;
    const weekNumberEl = templateWeekNumberEl.cloneNode(true);
    weekNumberEl.innerText = `${weekNumber.week}`;
    weekNumberEl.dataset.calendarYearWeek = `${weekNumber.year}`;
    weekNumbersContentEl.append(weekNumberEl);
  }
};
const createDays = (self) => {
  var _a, _b;
  const daysEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.days}`);
  const weekNumbersEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.weekNumbers}`);
  const initDate = new Date(self.selectedYear, self.selectedMonth, 1);
  const templateDayEl = document.createElement("div");
  const templateDayBtnEl = document.createElement("button");
  templateDayEl.className = self.CSSClasses.day;
  templateDayBtnEl.className = self.CSSClasses.dayBtn;
  templateDayBtnEl.type = "button";
  (_a = self.selectedDates) == null ? void 0 : _a.sort((a, b) => +new Date(a) - +new Date(b));
  daysEls.forEach((_, index) => {
    const selectedMonth = new Date(initDate.setMonth(self.selectedMonth + index)).getMonth();
    const selectedYear = new Date(initDate.setFullYear(self.selectedYear, self.selectedMonth + index)).getFullYear();
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const daysSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    let firstDayWeek = Number(firstDay.getDay());
    if (self.settings.iso8601)
      firstDayWeek = Number((firstDay.getDay() !== 0 ? firstDay.getDay() : 7) - 1);
    if (self.settings.selection.day && ["single", "multiple", "multiple-ranged"].includes(self.settings.selection.day)) {
      daysEls[index].classList.add(self.CSSClasses.daysSelecting);
    }
    daysEls[index].innerHTML = "";
    const setDayModifier = (dayEl, dayBtnEl, dayID, date, otherMonth) => {
      if (self.rangeMin > date || self.rangeMax < date) {
        dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
        dayBtnEl.tabIndex = -1;
      }
      if (self.settings.visibility.weekend && (dayID === 0 || dayID === 6)) {
        dayBtnEl.classList.add(self.CSSClasses.dayBtnWeekend);
      }
      if (Array.isArray(self.selectedHolidays)) {
        self.selectedHolidays.forEach((holiday) => {
          if (holiday === date) {
            dayBtnEl.classList.add(self.CSSClasses.dayBtnHoliday);
          }
        });
      }
      let thisToday = self.date.today.getDate();
      let thisMonth = self.date.today.getMonth() + 1;
      thisToday = thisToday < 10 ? `0${thisToday}` : thisToday;
      thisMonth = thisMonth < 10 ? `0${thisMonth}` : thisMonth;
      const thisDay = `${self.date.today.getFullYear()}-${thisMonth}-${thisToday}`;
      if (self.settings.visibility.today && dayBtnEl.dataset.calendarDay === thisDay) {
        dayBtnEl.classList.add(self.CSSClasses.dayBtnToday);
      }
      if (self.selectedDates && self.selectedDates.indexOf(date) === 0) {
        if (self.settings.selection.day === "multiple-ranged" && self.selectedDates.length > 1) {
          dayEl.classList.add(self.CSSClasses.daySelectedFirst);
        } else {
          dayEl.classList.add(self.CSSClasses.daySelected);
        }
        dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
      } else if (self.selectedDates && self.selectedDates[0] && self.selectedDates.indexOf(date) === self.selectedDates.length - 1) {
        dayEl.classList.add(self.CSSClasses.daySelected);
        if (self.settings.selection.day === "multiple-ranged") {
          dayEl.classList.add(self.CSSClasses.daySelectedLast);
        } else {
          dayEl.classList.add(self.CSSClasses.daySelected);
        }
        dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
      } else if (self.selectedDates && self.selectedDates.indexOf(date) > 0 && self.settings.selection.day === "multiple-ranged") {
        dayEl.classList.add(self.CSSClasses.daySelectedIntermediate);
        dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
        dayBtnEl.classList.add(self.CSSClasses.dayBtnIntermediate);
      } else if (self.selectedDates && self.selectedDates.indexOf(date) > 0) {
        dayEl.classList.add(self.CSSClasses.daySelected);
        dayBtnEl.classList.add(self.CSSClasses.dayBtnSelected);
      }
      if (Array.isArray(self.rangeDisabled) && self.rangeDisabled[0]) {
        self.rangeDisabled.forEach((dateDisabled) => {
          if (dateDisabled === date) {
            dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
            dayBtnEl.tabIndex = -1;
          }
        });
      }
      if (!self.settings.selection.month && otherMonth) {
        dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
        dayBtnEl.tabIndex = -1;
      }
      if (!self.settings.selection.year && (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getFullYear() !== selectedYear) {
        dayBtnEl.classList.add(self.CSSClasses.dayBtnDisabled);
        dayBtnEl.tabIndex = -1;
      }
    };
    const createDay = (dayText, dayID, date, otherMonth, modifier) => {
      var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
      const dayEl = templateDayEl.cloneNode(true);
      const dayBtnEl = templateDayBtnEl.cloneNode(true);
      if (modifier)
        dayBtnEl.classList.add(modifier);
      dayBtnEl.innerText = dayText;
      dayBtnEl.dataset.calendarDay = date;
      if (self.settings.visibility.weekNumbers) {
        const weekNumber = getWeekNumber(date, self.settings.iso8601);
        if (!weekNumber)
          return;
        dayBtnEl.dataset.calendarWeekNumber = `${weekNumber.week}`;
      }
      if (((_a2 = self.rangeEnabled) == null ? void 0 : _a2[0]) && self.settings.range.disableAllDays && !((_b2 = self.rangeDisabled) == null ? void 0 : _b2.includes(date))) {
        (_c = self.rangeDisabled) == null ? void 0 : _c.push(date);
      }
      if (((_d = self.rangeEnabled) == null ? void 0 : _d[0]) && ((_e = self.rangeDisabled) == null ? void 0 : _e.includes(date))) {
        self.rangeDisabled = (_f = self.rangeDisabled) == null ? void 0 : _f.filter((d) => {
          var _a3;
          return !((_a3 = self.rangeEnabled) == null ? void 0 : _a3.includes(d));
        });
      }
      if (((_g = self.settings.range.disableWeekday) == null ? void 0 : _g.includes(dayID)) && !((_h = self.rangeDisabled) == null ? void 0 : _h.includes(date))) {
        (_i = self.rangeDisabled) == null ? void 0 : _i.push(date);
      }
      setDayModifier(dayEl, dayBtnEl, dayID, date, otherMonth);
      if (otherMonth) {
        if (self.settings.visibility.daysOutside)
          dayEl.append(dayBtnEl);
      } else {
        dayEl.append(dayBtnEl);
      }
      daysEls[index].append(dayEl);
      if (self.actions.getDays)
        self.actions.getDays(Number(dayText), date, dayEl, dayBtnEl);
    };
    const prevMonth = () => {
      const prevMonthDays = new Date(selectedYear, selectedMonth, 0).getDate();
      let day = prevMonthDays - firstDayWeek;
      let year = selectedYear;
      let month = selectedMonth;
      if (selectedMonth === 0) {
        month = self.locale.months.length;
        year = selectedYear - 1;
      } else if (selectedMonth < 10) {
        month = `0${selectedMonth}`;
      }
      for (let i = 0; i < firstDayWeek; i++) {
        day += 1;
        const date = `${year}-${month}-${day}`;
        const dayIDCurrent = new Date(selectedYear, selectedMonth, day - 1);
        const prevMonthID = dayIDCurrent.getMonth() - 1;
        const dayID = new Date(selectedYear, prevMonthID, day).getDay();
        createDay(String(day), dayID, date, true, self.CSSClasses.dayBtnPrev);
      }
    };
    const currentMonth = () => {
      for (let i = 1; i <= daysSelectedMonth; i++) {
        const day = new Date(selectedYear, selectedMonth, i);
        const date = generateDate(day);
        const dayID = day.getDay();
        createDay(String(i), dayID, date, false, null);
      }
    };
    const nextMonth = () => {
      const total = firstDayWeek + daysSelectedMonth;
      const rows = Math.ceil(total / self.locale.weekday.length);
      const nextDays = self.locale.weekday.length * rows - total;
      let year = selectedYear;
      let month = String(selectedMonth + 2);
      if (selectedMonth + 1 === self.locale.months.length) {
        month = "01";
        year = selectedYear + 1;
      } else if (selectedMonth + 2 < 10) {
        month = `0${selectedMonth + 2}`;
      }
      for (let i = 1; i <= nextDays; i++) {
        const day = i < 10 ? `0${i}` : String(i);
        const date = `${year}-${month}-${day}`;
        const dayIDCurrent = new Date(selectedYear, selectedMonth, i);
        const nextMonthID = dayIDCurrent.getMonth() + 1;
        const dayID = new Date(selectedYear, nextMonthID, i).getDay();
        createDay(String(i), dayID, date, true, self.CSSClasses.dayBtnNext);
      }
    };
    prevMonth();
    currentMonth();
    nextMonth();
    createPopup(self, daysEls[index]);
    createWeekNumbers(self, firstDayWeek, daysSelectedMonth, weekNumbersEls[index], daysEls[index]);
  });
  (_b = self.rangeDisabled) == null ? void 0 : _b.sort((a, b) => +new Date(a) - +new Date(b));
};
const ArrowPrev = (self) => `
	<button type="button"
		class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowPrev}"
		data-calendar-arrow="prev"
		title="Prev">
	</button>
`;
const ArrowNext = (self) => `
	<button type="button"
	class="${self.CSSClasses.arrow} ${self.CSSClasses.arrowNext}"
	data-calendar-arrow="next"
	title="Next">
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
const getComponent = (pattern) => {
  let FC = null;
  switch (pattern) {
    case "ArrowPrev":
      FC = ArrowPrev;
      break;
    case "ArrowNext":
      FC = ArrowNext;
      break;
    case "Month":
      FC = Month;
      break;
    case "Year":
      FC = Year;
      break;
    case "Week":
      FC = Week;
      break;
    case "Days":
      FC = Days;
      break;
    case "Months":
      FC = Months;
      break;
    case "Years":
      FC = Years;
      break;
    case "WeekNumbers":
      FC = WeekNumbers;
      break;
    case "ControlTime":
      FC = ControlTime;
      break;
  }
  return FC;
};
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
  const calendarElement = self.HTMLElement;
  calendarElement.classList.add(self.CSSClasses.calendar);
  const switcherTypeMultiple = (columnClass, DOMTemplates) => {
    if (!target)
      return;
    const controls = self.HTMLElement.querySelector(`.${self.CSSClasses.controls}`);
    if (controls)
      self.HTMLElement.removeChild(controls);
    const grid = self.HTMLElement.querySelector(`.${self.CSSClasses.grid}`);
    grid.classList.add(self.CSSClasses.gridDisabled);
    const columnElement = target.closest(`.${self.CSSClasses.column}`);
    columnElement.classList.add(columnClass);
    columnElement.innerHTML = DOMParser(self, DOMTemplates);
  };
  switch (self.currentType) {
    case "default":
      calendarElement.classList.add(self.CSSClasses.calendarDefault);
      calendarElement.classList.remove(self.CSSClasses.calendarMonth);
      calendarElement.classList.remove(self.CSSClasses.calendarYear);
      calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.default);
      break;
    case "multiple":
      if (!self.correctMonths)
        break;
      calendarElement.classList.add(self.CSSClasses.calendarMultiple);
      calendarElement.classList.remove(self.CSSClasses.calendarMonth);
      calendarElement.classList.remove(self.CSSClasses.calendarYear);
      calendarElement.innerHTML = MultipleParser(self, DOMParser(self, self.DOMTemplates.multiple));
      break;
    case "month":
      if (self.type === "multiple") {
        switcherTypeMultiple(self.CSSClasses.columnMonth, self.DOMTemplates.month);
        break;
      }
      calendarElement.classList.remove(self.CSSClasses.calendarDefault);
      calendarElement.classList.add(self.CSSClasses.calendarMonth);
      calendarElement.classList.remove(self.CSSClasses.calendarYear);
      calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.month);
      break;
    case "year":
      if (self.type === "multiple") {
        switcherTypeMultiple(self.CSSClasses.columnYear, self.DOMTemplates.year);
        break;
      }
      calendarElement.classList.remove(self.CSSClasses.calendarDefault);
      calendarElement.classList.remove(self.CSSClasses.calendarMonth);
      calendarElement.classList.add(self.CSSClasses.calendarYear);
      calendarElement.innerHTML = DOMParser(self, self.DOMTemplates.year);
      break;
  }
};
const showMonth = (self) => {
  const months = self.HTMLElement.querySelectorAll("[data-calendar-selected-month]");
  if (!months[0] || self.selectedMonth === void 0)
    return;
  const initDate = new Date(self.selectedYear, self.selectedMonth, 1);
  months.forEach((_, index) => {
    const selectedMonth = new Date(initDate.setMonth(self.selectedMonth + index)).getMonth();
    months[index].dataset.calendarSelectedMonth = String(selectedMonth);
    months[index].innerText = self.locale.months[selectedMonth];
    if (self.settings.selection.month === false || self.settings.selection.month === "only-arrows") {
      months[index].tabIndex = -1;
      months[index].classList.add(self.CSSClasses.monthDisabled);
    } else {
      months[index].tabIndex = 0;
      months[index].classList.remove(self.CSSClasses.monthDisabled);
    }
  });
};
const showYear = (self) => {
  const years = self.HTMLElement.querySelectorAll("[data-calendar-selected-year]");
  if (!years || self.selectedMonth === void 0)
    return;
  const initDate = new Date(self.selectedYear, self.selectedMonth, 1);
  years.forEach((_, index) => {
    const selectedYear = new Date(initDate.setFullYear(self.selectedYear, self.selectedMonth + index)).getFullYear();
    years[index].dataset.calendarSelectedYear = String(selectedYear);
    years[index].innerText = String(selectedYear);
    if (self.settings.selection.year === false || self.settings.selection.year === "only-arrows") {
      years[index].tabIndex = -1;
      years[index].classList.add(self.CSSClasses.yearDisabled);
    } else {
      years[index].tabIndex = 0;
      years[index].classList.remove(self.CSSClasses.yearDisabled);
    }
  });
};
const createMonths = (self, target) => {
  var _a;
  const selectedMonth = (target == null ? void 0 : target.dataset.calendarSelectedMonth) ? Number(target.dataset.calendarSelectedMonth) : self.selectedMonth;
  const yearEl = (_a = target == null ? void 0 : target.closest(`.${self.CSSClasses.column}`)) == null ? void 0 : _a.querySelector(`.${self.CSSClasses.year}`);
  const selectedYear = yearEl ? Number(yearEl.dataset.calendarSelectedYear) : self.selectedYear;
  self.currentType = "month";
  createDOM(self, target);
  showMonth(self);
  showYear(self);
  const monthsEl = self.HTMLElement.querySelector(`.${self.CSSClasses.months}`);
  if (!self.dateMin || !self.dateMax || !monthsEl)
    return;
  if (self.settings.selection.month)
    monthsEl.classList.add(self.CSSClasses.monthsSelecting);
  const activeMonthsID = self.jumpMonths > 1 ? self.locale.months.map((_, i) => selectedMonth - self.jumpMonths * i).concat(self.locale.months.map((_, i) => selectedMonth + self.jumpMonths * i)).filter((monthID) => monthID >= 0 && monthID <= 12) : Array.from(Array(12).keys());
  const templateMonthEl = document.createElement("button");
  templateMonthEl.type = "button";
  templateMonthEl.className = self.CSSClasses.monthsMonth;
  const columnID = () => {
    if (self.type !== "multiple")
      return 0;
    const columnEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.column}`);
    const indexColumn = [...columnEls].findIndex((column) => column.classList.contains(`${self.CSSClasses.columnMonth}`));
    return indexColumn > 0 ? indexColumn : 0;
  };
  for (let i = 0; i < self.locale.months.length; i++) {
    const month = self.locale.months[i];
    const monthEl = templateMonthEl.cloneNode(true);
    if (i === selectedMonth) {
      monthEl.classList.add(self.CSSClasses.monthsMonthSelected);
    }
    if (i < self.dateMin.getMonth() + columnID() && selectedYear <= self.dateMin.getFullYear() || i > self.dateMax.getMonth() + columnID() && selectedYear >= self.dateMax.getFullYear() || i !== selectedMonth && !activeMonthsID.includes(i)) {
      monthEl.classList.add(self.CSSClasses.monthsMonthDisabled);
      monthEl.tabIndex = -1;
    }
    monthEl.dataset.calendarMonth = String(i);
    monthEl.title = `${month}`;
    monthEl.innerText = `${self.settings.visibility.monthShort ? month.substring(0, 3) : month}`;
    monthsEl.append(monthEl);
  }
};
const transformTime24 = (hour, keeping) => {
  const oldHour = Number(hour);
  let newHour = String(oldHour);
  if (keeping === "AM") {
    if (oldHour === 12) {
      newHour = "00";
    }
  } else if (keeping === "PM") {
    if (oldHour === 1) {
      newHour = "13";
    } else if (oldHour === 2) {
      newHour = "14";
    } else if (oldHour === 3) {
      newHour = "15";
    } else if (oldHour === 4) {
      newHour = "16";
    } else if (oldHour === 5) {
      newHour = "17";
    } else if (oldHour === 6) {
      newHour = "18";
    } else if (oldHour === 7) {
      newHour = "19";
    } else if (oldHour === 8) {
      newHour = "20";
    } else if (oldHour === 9) {
      newHour = "21";
    } else if (oldHour === 10) {
      newHour = "22";
    } else if (oldHour === 11) {
      newHour = "23";
    }
  }
  return newHour;
};
const controlTime = (self, keepingTime) => {
  const rangeHours = self.HTMLElement.querySelector(`.${self.CSSClasses.timeRange} input[name="hours"]`);
  const rangeMinutes = self.HTMLElement.querySelector(`.${self.CSSClasses.timeRange} input[name="minutes"]`);
  const inputHours = self.HTMLElement.querySelector(`.${self.CSSClasses.timeHours} input[name="hours"]`);
  const inputMinutes = self.HTMLElement.querySelector(`.${self.CSSClasses.timeMinutes} input[name="minutes"]`);
  const btnKeepingTime = self.HTMLElement.querySelector(`.${self.CSSClasses.timeKeeping}`);
  const mouseoverRange = (range, input) => {
    range.addEventListener("mouseover", () => input.classList.add(self.CSSClasses.isFocus));
  };
  const mouseoutRange = (range, input) => {
    range.addEventListener("mouseout", () => input.classList.remove(self.CSSClasses.isFocus));
  };
  const setTime = (e, value, type) => {
    if (type === "hours") {
      self.selectedHours = `${value}`;
    } else if (type === "minutes") {
      self.selectedMinutes = `${value}`;
    }
    self.selectedTime = `${self.selectedHours}:${self.selectedMinutes}${self.selectedKeeping ? ` ${self.selectedKeeping}` : ""}`;
    if (self.actions.changeTime) {
      self.actions.changeTime(e, self.selectedTime, self.selectedHours, self.selectedMinutes, self.selectedKeeping);
    }
    if (self.input && self.HTMLInputElement && self.actions.changeToInput) {
      self.actions.changeToInput(e, self.HTMLInputElement, self.selectedDates, self.selectedTime, self.selectedHours, self.selectedMinutes, self.selectedKeeping);
    }
  };
  const changeRange = (range, input, type, max) => {
    range.addEventListener("input", (e) => {
      let value = Number(e.target.value);
      value = value < 10 ? `0${value}` : `${value}`;
      if (type === "hours" && max === 12) {
        if (Number(e.target.value) < max && Number(e.target.value) > 0) {
          input.value = value;
          self.selectedKeeping = "AM";
          btnKeepingTime.innerText = self.selectedKeeping;
          setTime(e, value, type);
        } else {
          if (Number(e.target.value) === 0) {
            self.selectedKeeping = "AM";
            btnKeepingTime.innerText = "AM";
          } else {
            self.selectedKeeping = "PM";
            btnKeepingTime.innerText = "PM";
          }
          input.value = transformTime12(e.target.value);
          setTime(e, transformTime12(e.target.value), type);
        }
      } else {
        input.value = value;
        setTime(e, value, type);
      }
    });
  };
  const changeInput = (range, input, type, max) => {
    input.addEventListener("change", (e) => {
      const changeInputEl = e.target;
      let value = Number(changeInputEl.value);
      value = value < 10 ? `0${value}` : `${value}`;
      if (type === "hours" && max === 12) {
        if (changeInputEl.value && Number(changeInputEl.value) <= max && Number(changeInputEl.value) > 0) {
          changeInputEl.value = value;
          range.value = transformTime24(value, self.selectedKeeping);
          setTime(e, value, type);
        } else if (changeInputEl.value && Number(changeInputEl.value) < 24 && (Number(changeInputEl.value) > max || Number(changeInputEl.value) === 0)) {
          if (Number(changeInputEl.value) === 0) {
            self.selectedKeeping = "AM";
            btnKeepingTime.innerText = "AM";
          } else {
            self.selectedKeeping = "PM";
            btnKeepingTime.innerText = "PM";
          }
          changeInputEl.value = transformTime12(changeInputEl.value);
          range.value = value;
          setTime(e, transformTime12(changeInputEl.value), type);
        } else {
          changeInputEl.value = self.selectedHours;
        }
      } else if (changeInputEl.value && Number(changeInputEl.value) <= max && Number(changeInputEl.value) >= 0) {
        changeInputEl.value = value;
        range.value = value;
        setTime(e, value, type);
      } else if (type === "hours") {
        changeInputEl.value = self.selectedHours;
      } else if (type === "minutes") {
        changeInputEl.value = self.selectedMinutes;
      }
    });
  };
  mouseoverRange(rangeHours, inputHours);
  mouseoverRange(rangeMinutes, inputMinutes);
  mouseoutRange(rangeHours, inputHours);
  mouseoutRange(rangeMinutes, inputMinutes);
  changeRange(rangeHours, inputHours, "hours", keepingTime === 24 ? 23 : 12);
  changeRange(rangeMinutes, inputMinutes, "minutes", 0);
  changeInput(rangeHours, inputHours, "hours", keepingTime === 24 ? 23 : 12);
  changeInput(rangeMinutes, inputMinutes, "minutes", 59);
  if (!btnKeepingTime)
    return;
  btnKeepingTime.addEventListener("click", (e) => {
    if (btnKeepingTime.innerText.includes("AM")) {
      self.selectedKeeping = "PM";
    } else {
      self.selectedKeeping = "AM";
    }
    rangeHours.value = transformTime24(self.selectedHours, self.selectedKeeping);
    setTime(e, self.selectedHours, "hours");
    btnKeepingTime.innerText = self.selectedKeeping;
  });
};
const createTime = (self) => {
  const timeEl = self.HTMLElement.querySelector(`.${self.CSSClasses.time}`);
  if (!timeEl)
    return;
  const keepingTime = self.settings.selection.time === true ? 12 : self.settings.selection.time;
  const range = self.settings.selection.controlTime === "range";
  timeEl.innerHTML = `
	<div class="${self.CSSClasses.timeContent}">
		<label class="${self.CSSClasses.timeHours}">
			<input type="text"
				name="hours"
				maxlength="2"
				value="${self.selectedHours}"
				${range ? "disabled" : ""}>
		</label>
		<label class="${self.CSSClasses.timeMinutes}">
			<input type="text"
				name="minutes"
				maxlength="2"
				value="${self.selectedMinutes}"
				${range ? "disabled" : ""}>
		</label>
		${keepingTime === 12 ? `
		<button type="button"
			class="${self.CSSClasses.timeKeeping}"
			${range ? "disabled" : ""}>${self.selectedKeeping}</button>
		` : ""}
	</div>
	<div class="${self.CSSClasses.timeRanges}">
		<label class="${self.CSSClasses.timeRange}">
			<input type="range"
				name="hours"
				min="0"
				max="23"
				step="${self.settings.selection.stepHours}"
				value="${self.selectedKeeping ? transformTime24(self.selectedHours, self.selectedKeeping) : self.selectedHours}">
		</label>
		<label class="${self.CSSClasses.timeRange}">
			<input type="range"
				name="minutes"
				min="0"
				max="59"
				step="${self.settings.selection.stepMinutes}"
				value="${self.selectedMinutes}">
		</label>
	</div>`;
  controlTime(self, keepingTime);
};
const createWeek = (self) => {
  const weekday = [...self.locale.weekday];
  if (!weekday[0])
    return;
  const weekEls = self.HTMLElement.querySelectorAll(`.${self.CSSClasses.week}`);
  const templateWeekDayEl = document.createElement("b");
  templateWeekDayEl.className = self.CSSClasses.weekDay;
  if (self.settings.iso8601)
    weekday.push(weekday.shift());
  weekEls.forEach((weekEl) => {
    weekEl.innerHTML = "";
    for (let i = 0; i < weekday.length; i++) {
      const weekDayName = weekday[i];
      const weekDayEl = templateWeekDayEl.cloneNode(true);
      if (self.settings.visibility.weekend && self.settings.iso8601) {
        if (i === 5 || i === 6) {
          weekDayEl.classList.add(self.CSSClasses.weekDayWeekend);
        }
      } else if (self.settings.visibility.weekend && !self.settings.iso8601) {
        if (i === 0 || i === 6) {
          weekDayEl.classList.add(self.CSSClasses.weekDayWeekend);
        }
      }
      weekDayEl.innerText = `${weekDayName}`;
      weekEl.append(weekDayEl);
    }
  });
};
const createYears = (self, target) => {
  if (self.viewYear === void 0 || !self.dateMin || !self.dateMax)
    return;
  const selectedYear = (target == null ? void 0 : target.dataset.calendarSelectedYear) ? Number(target == null ? void 0 : target.dataset.calendarSelectedYear) : self.selectedYear;
  self.currentType = "year";
  createDOM(self, target);
  showMonth(self);
  showYear(self);
  controlArrows(self);
  const yearsEl = self.HTMLElement.querySelector(`.${self.CSSClasses.years}`);
  if (!yearsEl)
    return;
  if (self.settings.selection.year)
    yearsEl.classList.add(self.CSSClasses.yearsSelecting);
  const templateYearEl = document.createElement("button");
  templateYearEl.type = "button";
  templateYearEl.className = self.CSSClasses.yearsYear;
  const relationshipID = () => {
    if (self.type !== "multiple")
      return 0;
    return self.selectedYear === selectedYear ? 0 : 1;
  };
  for (let i = self.viewYear - 7; i < self.viewYear + 8; i++) {
    const year = i;
    const yearEl = templateYearEl.cloneNode(true);
    if (year === selectedYear) {
      yearEl.classList.add(self.CSSClasses.yearsYearSelected);
    }
    if (year < self.dateMin.getFullYear() + relationshipID() || year > self.dateMax.getFullYear()) {
      yearEl.classList.add(self.CSSClasses.yearsYearDisabled);
      yearEl.tabIndex = -1;
    }
    yearEl.dataset.calendarYear = String(year);
    yearEl.innerText = `${year}`;
    yearsEl.append(yearEl);
  }
};
const getLocale = (self) => {
  if (self.settings.lang === "define")
    return;
  self.locale.weekday = [];
  for (let i = 0; i < 7; i++) {
    let weekday = new Date(0, 0, i).toLocaleString(self.settings.lang, { weekday: "short" });
    weekday = `${weekday.charAt(0).toUpperCase()}${weekday.substring(1, weekday.length)}`;
    weekday = weekday.replace(/\./, "");
    self.locale.weekday.push(weekday);
  }
  self.locale.months = [];
  for (let i = 0; i < 12; i++) {
    let month = new Date(0, i).toLocaleString(self.settings.lang, { month: "long" });
    month = `${month.charAt(0).toUpperCase()}${month.substring(1, month.length)}`;
    month = month.replace(/\./, "");
    self.locale.months.push(month);
  }
};
const themes = ["light", "dark", "system"];
let haveListener = false;
const getActiveTheme = (htmlEl, attr) => {
  var _a;
  let activeTheme = null;
  for (let i = 0; i < themes.length; i++) {
    const theme = themes[i];
    if (theme === "system")
      return;
    if ((_a = htmlEl.getAttribute(attr)) == null ? void 0 : _a.includes(themes[i])) {
      activeTheme = themes[i];
      break;
    }
  }
  return activeTheme;
};
const set = (self, theme) => {
  if (!self.HTMLElement)
    return;
  if (themes.includes(theme)) {
    self.HTMLElement.dataset.calendarTheme = theme;
    return;
  }
  console.error("Incorrect name of theme in settings.visibility.theme");
};
const get = (self, supportDarkTheme) => {
  if (!supportDarkTheme) {
    set(self, "light");
    return;
  }
  const theme = (e) => e.matches ? "dark" : "light";
  self.HTMLElement.dataset.calendarTheme = theme(supportDarkTheme);
  if (!haveListener) {
    supportDarkTheme.onchange = (e) => {
      if (self.settings.visibility.theme !== "system")
        return;
      self.HTMLElement.dataset.calendarTheme = theme(e);
    };
    haveListener = true;
  }
};
const track = (self, htmlEl, attr) => {
  const changes = (mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const record = mutationsList[i];
      if (record.attributeName === attr) {
        const activeTheme = getActiveTheme(htmlEl, attr);
        if (activeTheme)
          set(self, activeTheme);
        break;
      }
    }
  };
  const observer = new MutationObserver(changes);
  observer.observe(htmlEl, {
    attributes: true
  });
};
const detect = (self, supportDarkTheme) => {
  if (!self.HTMLElement)
    return;
  const detectedThemeEl = self.settings.visibility.themeDetect ? document.querySelector(self.settings.visibility.themeDetect) : false;
  if (!detectedThemeEl) {
    get(self, supportDarkTheme);
    return;
  }
  const attr = self.settings.visibility.themeDetect.replace(/^.*\[(.+)\]/g, (_, p1) => p1);
  const strValues = detectedThemeEl.hasAttribute(attr);
  if (!attr || !strValues) {
    get(self, supportDarkTheme);
    return;
  }
  const activeTheme = getActiveTheme(detectedThemeEl, attr);
  if (activeTheme) {
    set(self, activeTheme);
    track(self, detectedThemeEl, attr);
  } else {
    get(self, supportDarkTheme);
  }
};
const setTheme = (self) => {
  if (!self.HTMLElement)
    return;
  let supportDarkTheme;
  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    supportDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  }
  if (self.settings.visibility.theme === "system") {
    detect(self, supportDarkTheme);
  } else {
    set(self, self.settings.visibility.theme);
  }
};
const mainMethod = (self) => {
  const typeMapper = {
    default() {
      createWeek(self);
      createDays(self);
    },
    multiple() {
      createWeek(self);
      createDays(self);
    },
    month() {
      createMonths(self);
    },
    year() {
      createYears(self);
    }
  };
  setTheme(self);
  getLocale(self);
  createDOM(self);
  showMonth(self);
  showYear(self);
  controlArrows(self);
  createTime(self);
  typeMapper[self.currentType]();
};
const resetCalendar = (self) => {
  setVariablesDates(self);
  mainMethod(self);
};
const updateCalendar = (self) => {
  var _a;
  let tempSelectedDates = null;
  let tempSelectedMonth = null;
  let tempSelectedYear = null;
  if (!((_a = self.settings.selected.dates) == null ? void 0 : _a[0])) {
    tempSelectedDates = self.settings.selected.dates;
    self.settings.selected.dates = self.selectedDates;
  }
  if (!self.settings.selected.month) {
    tempSelectedMonth = self.settings.selected.month;
    self.settings.selected.month = self.selectedMonth;
  }
  if (!self.settings.selected.year) {
    tempSelectedYear = self.settings.selected.year;
    self.settings.selected.year = self.selectedYear;
  }
  setVariablesDates(self);
  mainMethod(self);
  self.settings.selected.dates = tempSelectedDates;
  self.settings.selected.month = tempSelectedMonth;
  self.settings.selected.year = tempSelectedYear;
};
let currentSelf$1 = null;
const documentClickEvent = (e) => {
  if (!currentSelf$1)
    return;
  if (e.target.closest(`.${currentSelf$1.CSSClasses.calendar}.${currentSelf$1.CSSClasses.calendarToInput}`))
    return;
  document.querySelectorAll(`.${currentSelf$1.CSSClasses.calendar}.${currentSelf$1.CSSClasses.calendarToInput}`).forEach((calendar) => {
    calendar.classList.add(currentSelf$1.CSSClasses.calendarHidden);
  });
  document.removeEventListener("click", documentClickEvent, { capture: true });
};
const handlerInput = (self) => {
  var _a;
  if (!self || !self.input)
    return;
  currentSelf$1 = self;
  (_a = self.HTMLInputElement) == null ? void 0 : _a.addEventListener("click", () => {
    var _a2;
    (_a2 = self.HTMLElement) == null ? void 0 : _a2.classList.remove(self.CSSClasses.calendarHidden);
    document.addEventListener("click", documentClickEvent, { capture: true });
  });
};
const changeMonth = (self, route) => {
  if (self.selectedMonth === void 0 || self.selectedYear === void 0)
    return;
  const jumpDate = /* @__PURE__ */ new Date(`${generateDate(new Date(self.selectedYear, self.selectedMonth, 1))}T00:00:00`);
  switch (route) {
    case "prev":
      jumpDate.setMonth(jumpDate.getMonth() - self.jumpMonths);
      break;
    case "next":
      jumpDate.setMonth(jumpDate.getMonth() + self.jumpMonths);
      break;
  }
  self.selectedMonth = jumpDate.getMonth();
  self.selectedYear = jumpDate.getFullYear();
  showMonth(self);
  showYear(self);
  controlArrows(self);
  createDays(self);
};
let currentSelf = null;
const removeHover = () => {
  var _a;
  if (!currentSelf)
    return;
  const daysEl = (_a = currentSelf.HTMLElement) == null ? void 0 : _a.querySelectorAll(`.${currentSelf.CSSClasses.dayBtnHover}`);
  if (daysEl)
    daysEl.forEach((d) => d.classList.remove(currentSelf.CSSClasses.dayBtnHover));
};
const addHover = (day) => {
  var _a;
  if (!currentSelf || !currentSelf.selectedDates)
    return;
  const date = generateDate(day);
  if (currentSelf.rangeDisabled && currentSelf.rangeDisabled.includes(date))
    return;
  const dayEls = (_a = currentSelf.HTMLElement) == null ? void 0 : _a.querySelectorAll(`[data-calendar-day="${date}"]`);
  dayEls == null ? void 0 : dayEls.forEach((dayEl) => {
    dayEl.classList.add(currentSelf.CSSClasses.dayBtnHover);
  });
};
const hoverDaysEvent = (e) => {
  if (!e.target || !currentSelf || !currentSelf.selectedDates)
    return;
  if (!e.target.closest(`.${currentSelf.CSSClasses.days}`)) {
    removeHover();
    return;
  }
  const date = e.target.dataset.calendarDay;
  if (!date)
    return;
  removeHover();
  const startDate = new Date(
    (/* @__PURE__ */ new Date(`${currentSelf.selectedDates[0]}T00:00:00`)).getFullYear(),
    (/* @__PURE__ */ new Date(`${currentSelf.selectedDates[0]}T00:00:00`)).getMonth(),
    (/* @__PURE__ */ new Date(`${currentSelf.selectedDates[0]}T00:00:00`)).getDate()
  );
  const endDate = new Date(
    (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getFullYear(),
    (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getMonth(),
    (/* @__PURE__ */ new Date(`${date}T00:00:00`)).getDate()
  );
  if (endDate > startDate) {
    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
      addHover(i);
    }
  } else {
    for (let i = startDate; i >= endDate; i.setDate(i.getDate() - 1)) {
      addHover(i);
    }
  }
};
const cancelSelectionDays = (e) => {
  if (!currentSelf || e.key !== "Escape")
    return;
  currentSelf.selectedDates = [];
  currentSelf.HTMLElement.removeEventListener("mousemove", hoverDaysEvent);
  document.removeEventListener("keydown", cancelSelectionDays);
  mainMethod(currentSelf);
};
const setDisabledDates = () => {
  var _a;
  if (!currentSelf || !((_a = currentSelf.selectedDates) == null ? void 0 : _a[0]) || !currentSelf.rangeDisabled || currentSelf.rangeDisabled.length < 2)
    return;
  const selectedDate = /* @__PURE__ */ new Date(`${currentSelf.selectedDates[0]}T00:00:00`);
  let startDate = null;
  let endDate = null;
  for (let index = 0; index < currentSelf.rangeDisabled.length; index++) {
    const disabledDate = /* @__PURE__ */ new Date(`${currentSelf.rangeDisabled[index]}T00:00:00`);
    if (selectedDate >= disabledDate) {
      startDate = disabledDate;
    } else {
      endDate = disabledDate;
      break;
    }
  }
  if (startDate) {
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
    currentSelf.rangeMin = generateDate(startDate);
  }
  if (endDate) {
    endDate = new Date(endDate.setDate(endDate.getDate() - 1));
    currentSelf.rangeMax = generateDate(endDate);
  }
};
const resetDisabledDates = () => {
  if (!currentSelf)
    return;
  currentSelf.rangeMin = currentSelf.settings.range.min;
  currentSelf.rangeMax = currentSelf.settings.range.max;
  if (currentSelf.settings.range.disablePast && /* @__PURE__ */ new Date(`${currentSelf.settings.range.min}T00:00:00`) < currentSelf.date.today) {
    currentSelf.rangeMin = generateDate(currentSelf.date.today);
  }
};
const handlerMultipleRanged = (self) => {
  if (!self || !self.selectedDates)
    return;
  currentSelf = self;
  if (self.selectedDates[0] && self.selectedDates.length <= 1) {
    self.HTMLElement.addEventListener("mousemove", hoverDaysEvent);
    document.addEventListener("keydown", cancelSelectionDays);
    if (self.settings.range.disableGaps)
      setDisabledDates();
  } else {
    self.HTMLElement.removeEventListener("mousemove", hoverDaysEvent);
    document.removeEventListener("keydown", cancelSelectionDays);
    if (self.settings.range.disableGaps)
      resetDisabledDates();
  }
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
const clickCalendar = (self) => {
  self.HTMLElement.addEventListener("click", (e) => {
    const element = e.target;
    const arrowEl = element.closest(`.${self.CSSClasses.arrow}`);
    const arrowPrevEl = element.closest(`.${self.CSSClasses.arrowPrev}`);
    const arrowNextEl = element.closest(`.${self.CSSClasses.arrowNext}`);
    const dayBtnEl = element.closest(`.${self.CSSClasses.dayBtn}`);
    const dayBtnPrevEl = element.closest(`.${self.CSSClasses.dayBtnPrev}`);
    const dayBtnNextEl = element.closest(`.${self.CSSClasses.dayBtnNext}`);
    const weekNumberEl = element.closest(`.${self.CSSClasses.weekNumber}`);
    const yearHeaderEl = element.closest(`.${self.CSSClasses.year}`);
    const yearItemEl = element.closest(`.${self.CSSClasses.yearsYear}`);
    const monthHeaderEl = element.closest(`.${self.CSSClasses.month}`);
    const monthItemEl = element.closest(`.${self.CSSClasses.monthsMonth}`);
    const gridEl = element.closest(`.${self.CSSClasses.grid}`);
    const columnEl = element.closest(`.${self.CSSClasses.column}`);
    const clickArrowMonth = () => {
      if (arrowEl && self.currentType !== "year" && self.currentType !== "month") {
        changeMonth(self, element.dataset.calendarArrow);
      }
      if (arrowEl) {
        if (self.actions.clickArrow)
          self.actions.clickArrow(e, Number(self.selectedYear), Number(self.selectedMonth));
      }
    };
    const clickDaySingle = () => {
      if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay)
        return;
      if (dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected)) {
        self.selectedDates.splice(self.selectedDates.indexOf(dayBtnEl.dataset.calendarDay), 1);
      } else {
        self.selectedDates = [];
        self.selectedDates.push(dayBtnEl.dataset.calendarDay);
      }
    };
    const clickDayMultiple = () => {
      if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay)
        return;
      if (dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected)) {
        self.selectedDates.splice(self.selectedDates.indexOf(dayBtnEl.dataset.calendarDay), 1);
      } else {
        self.selectedDates.push(dayBtnEl.dataset.calendarDay);
      }
    };
    const clickDayMultipleRanged = () => {
      if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay)
        return;
      if (self.selectedDates.length <= 1 && self.selectedDates[0] && self.selectedDates[0].includes(dayBtnEl.dataset.calendarDay)) {
        self.selectedDates = [];
      } else {
        if (self.selectedDates.length > 1)
          self.selectedDates = [];
        self.selectedDates.push(dayBtnEl.dataset.calendarDay);
      }
      if (self.selectedDates[1]) {
        const startDate = new Date(
          (/* @__PURE__ */ new Date(`${self.selectedDates[0]}T00:00:00`)).getFullYear(),
          (/* @__PURE__ */ new Date(`${self.selectedDates[0]}T00:00:00`)).getMonth(),
          (/* @__PURE__ */ new Date(`${self.selectedDates[0]}T00:00:00`)).getDate()
        );
        const endDate = new Date(
          (/* @__PURE__ */ new Date(`${self.selectedDates[1]}T00:00:00`)).getFullYear(),
          (/* @__PURE__ */ new Date(`${self.selectedDates[1]}T00:00:00`)).getMonth(),
          (/* @__PURE__ */ new Date(`${self.selectedDates[1]}T00:00:00`)).getDate()
        );
        const addSelectedDate = (day) => {
          if (!self.selectedDates)
            return;
          const date = generateDate(day);
          if (self.rangeDisabled && self.rangeDisabled.includes(date))
            return;
          self.selectedDates.push(date);
        };
        self.selectedDates = [];
        if (endDate > startDate) {
          for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
            addSelectedDate(i);
          }
        } else {
          for (let i = startDate; i >= endDate; i.setDate(i.getDate() - 1)) {
            addSelectedDate(i);
          }
        }
      }
      handlerMultipleRanged(self);
    };
    const clickDay = () => {
      if (self.settings.selection.day && ["single", "multiple", "multiple-ranged"].includes(self.settings.selection.day) && dayBtnEl) {
        switch (self.settings.selection.day) {
          case "single":
            clickDaySingle();
            break;
          case "multiple":
            clickDayMultiple();
            break;
          case "multiple-ranged":
            clickDayMultipleRanged();
            break;
        }
        if (self.actions.clickDay)
          self.actions.clickDay(e, self.selectedDates);
        if (self.input && self.HTMLInputElement && self.actions.changeToInput) {
          self.actions.changeToInput(e, self.HTMLInputElement, self.selectedDates, self.selectedTime, self.selectedHours, self.selectedMinutes, self.selectedKeeping);
        }
        if (dayBtnPrevEl) {
          changeMonth(self, "prev");
        } else if (dayBtnNextEl) {
          changeMonth(self, "next");
        } else {
          createDays(self);
        }
      }
    };
    const clickWeekNumber = () => {
      var _a;
      if (!self.settings.visibility.weekNumbers || !weekNumberEl || !self.actions.clickWeekNumber)
        return;
      const daysToWeeks = (_a = self.HTMLElement) == null ? void 0 : _a.querySelectorAll("[data-calendar-week-number]");
      if (!daysToWeeks)
        return;
      const weekNumberValue = Number(weekNumberEl.innerText);
      const yearWeek = Number(weekNumberEl.dataset.calendarYearWeek);
      const daysOfThisWeek = [...daysToWeeks].filter((day) => Number(day.dataset.calendarWeekNumber) === weekNumberValue);
      self.actions.clickWeekNumber(e, weekNumberValue, daysOfThisWeek, yearWeek);
    };
    const clickYear = () => {
      if (!self.settings.selection.year)
        return;
      if (arrowEl && self.currentType === "year") {
        if (self.viewYear === void 0)
          return;
        if (arrowNextEl) {
          self.viewYear += 15;
        } else if (arrowPrevEl) {
          self.viewYear -= 15;
        }
        createYears(self, e.target);
      } else if (self.currentType !== "year" && yearHeaderEl) {
        createYears(self, e.target);
      } else if (self.currentType === "year" && yearHeaderEl) {
        self.currentType = self.type;
        mainMethod(self);
      } else if (yearItemEl) {
        if (self.selectedMonth === void 0 || !self.dateMin || !self.dateMax)
          return;
        self.selectedYear = self.type === "multiple" ? getColumnID(self, self.CSSClasses.columnYear, self.CSSClasses.year, Number(yearItemEl.dataset.calendarYear), "data-calendar-selected-year") : Number(yearItemEl.dataset.calendarYear);
        self.currentType = self.type;
        if (self.selectedMonth < self.dateMin.getMonth() && self.selectedYear <= self.dateMin.getFullYear() || self.selectedYear < self.dateMin.getFullYear()) {
          self.selectedMonth = self.dateMin.getMonth();
          self.selectedYear = self.dateMin.getFullYear();
        }
        if (self.selectedMonth > self.dateMax.getMonth() && self.selectedYear >= self.dateMax.getFullYear() || self.selectedYear > self.dateMax.getFullYear()) {
          self.selectedMonth = self.dateMax.getMonth();
          self.selectedYear = self.dateMax.getFullYear();
        }
        if (self.actions.clickYear)
          self.actions.clickYear(e, self.selectedYear);
        mainMethod(self);
      } else if (self.type === "multiple" && self.currentType === "year" && gridEl && !columnEl) {
        self.currentType = self.type;
        mainMethod(self);
      }
    };
    const clickMonth = () => {
      if (!self.settings.selection.month)
        return;
      if (self.currentType !== "month" && monthHeaderEl) {
        createMonths(self, e.target);
      } else if (self.currentType === "month" && monthHeaderEl) {
        self.currentType = self.type;
        mainMethod(self);
      } else if (monthItemEl) {
        if (self.selectedMonth === void 0 || !self.dateMin || !self.dateMax)
          return;
        self.selectedMonth = self.type === "multiple" ? getColumnID(self, self.CSSClasses.columnMonth, self.CSSClasses.month, Number(monthItemEl.dataset.calendarMonth), "data-calendar-selected-month") : Number(monthItemEl.dataset.calendarMonth);
        if (self.type === "multiple") {
          const column = monthItemEl.closest(`.${self.CSSClasses.columnMonth}`);
          const year = column.querySelector(`.${self.CSSClasses.year}`);
          self.selectedYear = Number(year.dataset.calendarSelectedYear);
          if (self.selectedMonth < self.dateMin.getMonth() && self.selectedYear <= self.dateMin.getFullYear()) {
            self.selectedMonth = self.dateMin.getMonth();
          }
          if (self.selectedMonth > self.dateMax.getMonth() && self.selectedYear >= self.dateMax.getFullYear()) {
            self.selectedMonth = self.dateMax.getMonth();
          }
        }
        self.currentType = self.type;
        if (self.actions.clickMonth)
          self.actions.clickMonth(e, self.selectedMonth);
        mainMethod(self);
      } else if (self.type === "multiple" && self.currentType === "month" && gridEl && !columnEl) {
        self.currentType = self.type;
        mainMethod(self);
      }
    };
    clickArrowMonth();
    clickDay();
    clickWeekNumber();
    clickYear();
    clickMonth();
  });
};
const createCalendarToInput = (self) => {
  if (!self.input || !self.HTMLElement || !self.HTMLElement.parentNode)
    return;
  self.HTMLInputElement = self.HTMLElement;
  const wrapper = document.createElement("div");
  const calendar = document.createElement("div");
  wrapper.className = self.CSSClasses.calendarInputWrapper;
  calendar.className = `${self.CSSClasses.calendar} ${self.CSSClasses.calendarToInput} ${self.CSSClasses.calendarHidden}`;
  self.HTMLElement.parentNode.insertBefore(wrapper, self.HTMLInputElement);
  wrapper.append(self.HTMLInputElement);
  self.HTMLElement = calendar;
  wrapper.append(self.HTMLElement);
};
const initCalendar = (self) => {
  if (!self.HTMLElement)
    return;
  createCalendarToInput(self);
  resetCalendar(self);
  handlerInput(self);
  clickCalendar(self);
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
const classes = {
  calendar: "vanilla-calendar",
  calendarDefault: "vanilla-calendar_default",
  calendarMultiple: "vanilla-calendar_multiple",
  calendarMonth: "vanilla-calendar_month",
  calendarYear: "vanilla-calendar_year",
  calendarHidden: "vanilla-calendar_hidden",
  calendarToInput: "vanilla-calendar_to-input",
  calendarInputWrapper: "vanilla-calendar-input-wrapper",
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
  dayBtnHover: "vanilla-calendar-day__btn_hover",
  dayBtnDisabled: "vanilla-calendar-day__btn_disabled",
  dayBtnIntermediate: "vanilla-calendar-day__btn_intermediate",
  dayBtnWeekend: "vanilla-calendar-day__btn_weekend",
  dayBtnHoliday: "vanilla-calendar-day__btn_holiday",
  weekNumbers: "vanilla-calendar-week-numbers",
  weekNumbersTitle: "vanilla-calendar-week-numbers__title",
  weekNumbersContent: "vanilla-calendar-week-numbers__content",
  weekNumber: "vanilla-calendar-week-number",
  isFocus: "vanilla-calendar-is-focus"
};
class VanillaCalendar {
  constructor(selector, option) {
    __publicField(this, "HTMLElement");
    __publicField(this, "input");
    __publicField(this, "type");
    __publicField(this, "months");
    __publicField(this, "jumpMonths");
    __publicField(this, "date");
    __publicField(this, "settings");
    __publicField(this, "locale");
    __publicField(this, "actions");
    __publicField(this, "popups");
    __publicField(this, "CSSClasses");
    __publicField(this, "DOMTemplates");
    __publicField(this, "currentType");
    __publicField(this, "reset", () => resetCalendar(this));
    __publicField(this, "update", () => updateCalendar(this));
    __publicField(this, "init", () => initCalendar(this));
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb;
    this.HTMLElement = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (!this.HTMLElement)
      return;
    this.input = (_a = option == null ? void 0 : option.input) != null ? _a : false;
    this.type = (_b = option == null ? void 0 : option.type) != null ? _b : "default";
    this.months = (_c = option == null ? void 0 : option.months) != null ? _c : 2;
    this.jumpMonths = (_d = option == null ? void 0 : option.jumpMonths) != null ? _d : 1;
    this.date = {
      min: (_f = (_e = option == null ? void 0 : option.date) == null ? void 0 : _e.min) != null ? _f : "1970-01-01",
      max: (_h = (_g = option == null ? void 0 : option.date) == null ? void 0 : _g.max) != null ? _h : "2470-12-31",
      today: (_j = (_i = option == null ? void 0 : option.date) == null ? void 0 : _i.today) != null ? _j : /* @__PURE__ */ new Date()
    };
    this.settings = {
      lang: (_l = (_k = option == null ? void 0 : option.settings) == null ? void 0 : _k.lang) != null ? _l : "en",
      iso8601: (_n = (_m = option == null ? void 0 : option.settings) == null ? void 0 : _m.iso8601) != null ? _n : true,
      range: {
        min: (_q = (_p = (_o = option == null ? void 0 : option.settings) == null ? void 0 : _o.range) == null ? void 0 : _p.min) != null ? _q : this.date.min,
        max: (_t = (_s = (_r = option == null ? void 0 : option.settings) == null ? void 0 : _r.range) == null ? void 0 : _s.max) != null ? _t : this.date.max,
        disablePast: (_w = (_v = (_u = option == null ? void 0 : option.settings) == null ? void 0 : _u.range) == null ? void 0 : _v.disablePast) != null ? _w : false,
        disableGaps: (_z = (_y = (_x = option == null ? void 0 : option.settings) == null ? void 0 : _x.range) == null ? void 0 : _y.disableGaps) != null ? _z : false,
        disableAllDays: (_C = (_B = (_A = option == null ? void 0 : option.settings) == null ? void 0 : _A.range) == null ? void 0 : _B.disableAllDays) != null ? _C : false,
        disableWeekday: (_F = (_E = (_D = option == null ? void 0 : option.settings) == null ? void 0 : _D.range) == null ? void 0 : _E.disableWeekday) != null ? _F : null,
        disabled: (_I = (_H = (_G = option == null ? void 0 : option.settings) == null ? void 0 : _G.range) == null ? void 0 : _H.disabled) != null ? _I : null,
        enabled: (_L = (_K = (_J = option == null ? void 0 : option.settings) == null ? void 0 : _J.range) == null ? void 0 : _K.enabled) != null ? _L : null
      },
      selection: {
        day: (_O = (_N = (_M = option == null ? void 0 : option.settings) == null ? void 0 : _M.selection) == null ? void 0 : _N.day) != null ? _O : "single",
        month: (_R = (_Q = (_P = option == null ? void 0 : option.settings) == null ? void 0 : _P.selection) == null ? void 0 : _Q.month) != null ? _R : true,
        year: (_U = (_T = (_S = option == null ? void 0 : option.settings) == null ? void 0 : _S.selection) == null ? void 0 : _T.year) != null ? _U : true,
        time: (_X = (_W = (_V = option == null ? void 0 : option.settings) == null ? void 0 : _V.selection) == null ? void 0 : _W.time) != null ? _X : false,
        controlTime: (__ = (_Z = (_Y = option == null ? void 0 : option.settings) == null ? void 0 : _Y.selection) == null ? void 0 : _Z.controlTime) != null ? __ : "all",
        stepHours: (_ba = (_aa = (_$ = option == null ? void 0 : option.settings) == null ? void 0 : _$.selection) == null ? void 0 : _aa.stepHours) != null ? _ba : 1,
        stepMinutes: (_ea = (_da = (_ca = option == null ? void 0 : option.settings) == null ? void 0 : _ca.selection) == null ? void 0 : _da.stepMinutes) != null ? _ea : 1
      },
      selected: {
        dates: (_ha = (_ga = (_fa = option == null ? void 0 : option.settings) == null ? void 0 : _fa.selected) == null ? void 0 : _ga.dates) != null ? _ha : null,
        month: (_ka = (_ja = (_ia = option == null ? void 0 : option.settings) == null ? void 0 : _ia.selected) == null ? void 0 : _ja.month) != null ? _ka : null,
        year: (_na = (_ma = (_la = option == null ? void 0 : option.settings) == null ? void 0 : _la.selected) == null ? void 0 : _ma.year) != null ? _na : null,
        holidays: (_qa = (_pa = (_oa = option == null ? void 0 : option.settings) == null ? void 0 : _oa.selected) == null ? void 0 : _pa.holidays) != null ? _qa : null,
        time: (_ta = (_sa = (_ra = option == null ? void 0 : option.settings) == null ? void 0 : _ra.selected) == null ? void 0 : _sa.time) != null ? _ta : null
      },
      visibility: {
        theme: (_wa = (_va = (_ua = option == null ? void 0 : option.settings) == null ? void 0 : _ua.visibility) == null ? void 0 : _va.theme) != null ? _wa : "system",
        themeDetect: (_za = (_ya = (_xa = option == null ? void 0 : option.settings) == null ? void 0 : _xa.visibility) == null ? void 0 : _ya.themeDetect) != null ? _za : "html[data-theme]",
        monthShort: (_Ca = (_Ba = (_Aa = option == null ? void 0 : option.settings) == null ? void 0 : _Aa.visibility) == null ? void 0 : _Ba.monthShort) != null ? _Ca : true,
        weekNumbers: (_Fa = (_Ea = (_Da = option == null ? void 0 : option.settings) == null ? void 0 : _Da.visibility) == null ? void 0 : _Ea.weekNumbers) != null ? _Fa : false,
        weekend: (_Ia = (_Ha = (_Ga = option == null ? void 0 : option.settings) == null ? void 0 : _Ga.visibility) == null ? void 0 : _Ha.weekend) != null ? _Ia : true,
        today: (_La = (_Ka = (_Ja = option == null ? void 0 : option.settings) == null ? void 0 : _Ja.visibility) == null ? void 0 : _Ka.today) != null ? _La : true,
        disabled: (_Oa = (_Na = (_Ma = option == null ? void 0 : option.settings) == null ? void 0 : _Ma.visibility) == null ? void 0 : _Na.disabled) != null ? _Oa : false,
        daysOutside: (_Ra = (_Qa = (_Pa = option == null ? void 0 : option.settings) == null ? void 0 : _Pa.visibility) == null ? void 0 : _Qa.daysOutside) != null ? _Ra : true
      }
    };
    this.locale = {
      months: (_Ta = (_Sa = option == null ? void 0 : option.locale) == null ? void 0 : _Sa.months) != null ? _Ta : [],
      weekday: (_Va = (_Ua = option == null ? void 0 : option.locale) == null ? void 0 : _Ua.weekday) != null ? _Va : []
    };
    this.actions = {
      clickDay: (_Xa = (_Wa = option == null ? void 0 : option.actions) == null ? void 0 : _Wa.clickDay) != null ? _Xa : null,
      clickWeekNumber: (_Za = (_Ya = option == null ? void 0 : option.actions) == null ? void 0 : _Ya.clickWeekNumber) != null ? _Za : null,
      clickMonth: (_$a = (__a = option == null ? void 0 : option.actions) == null ? void 0 : __a.clickMonth) != null ? _$a : null,
      clickYear: (_bb = (_ab = option == null ? void 0 : option.actions) == null ? void 0 : _ab.clickYear) != null ? _bb : null,
      clickArrow: (_db = (_cb = option == null ? void 0 : option.actions) == null ? void 0 : _cb.clickArrow) != null ? _db : null,
      changeTime: (_fb = (_eb = option == null ? void 0 : option.actions) == null ? void 0 : _eb.changeTime) != null ? _fb : null,
      changeToInput: (_hb = (_gb = option == null ? void 0 : option.actions) == null ? void 0 : _gb.changeToInput) != null ? _hb : null,
      getDays: (_jb = (_ib = option == null ? void 0 : option.actions) == null ? void 0 : _ib.getDays) != null ? _jb : null
    };
    this.popups = (_kb = option == null ? void 0 : option.popups) != null ? _kb : null;
    this.CSSClasses = (() => {
      const classesObj = __spreadValues({}, classes);
      Object.keys(classes).forEach((className) => {
        var _a2;
        if ((_a2 = option == null ? void 0 : option.CSSClasses) == null ? void 0 : _a2[className]) {
          classesObj[className] = option.CSSClasses[className];
        } else {
          classesObj[className] = classes[className];
        }
      });
      return classesObj;
    })();
    this.DOMTemplates = {
      default: (_mb = (_lb = option == null ? void 0 : option.DOMTemplates) == null ? void 0 : _lb.default) != null ? _mb : DOMDefault(this.CSSClasses),
      multiple: (_ob = (_nb = option == null ? void 0 : option.DOMTemplates) == null ? void 0 : _nb.multiple) != null ? _ob : DOMMultiple(this.CSSClasses),
      month: (_qb = (_pb = option == null ? void 0 : option.DOMTemplates) == null ? void 0 : _pb.month) != null ? _qb : DOMMonths(this.CSSClasses),
      year: (_sb = (_rb = option == null ? void 0 : option.DOMTemplates) == null ? void 0 : _rb.year) != null ? _sb : DOMYears(this.CSSClasses)
    };
    this.currentType = this.type;
  }
}
export {
  VanillaCalendar as default
};
