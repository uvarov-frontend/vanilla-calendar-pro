export default class VanillaCalendar {
	constructor(selector, option) {
		this.HTMLElement = typeof selector === 'object' ? selector : document.querySelector(selector);
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
				min: option?.settings?.range?.min ?? this.date.min,
				max: option?.settings?.range?.max ?? this.date.max,
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

		this.currentType = this.type;
		this.selectedKeeping = null;
		this.userTime = false;
	}

	generateDate(date) {
		const year = date.getUTCFullYear();
		let month = date.getUTCMonth() + 1;
		let day = date.getUTCDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	}

	transformTime12(hour) {
		const oldHour = Number(hour);
		let newHour = oldHour;

		if (oldHour === 0) {
			newHour = '12';
		} else if (oldHour === 13) {
			newHour = '01';
		} else if (oldHour === 14) {
			newHour = '02';
		} else if (oldHour === 15) {
			newHour = '03';
		} else if (oldHour === 16) {
			newHour = '04';
		} else if (oldHour === 17) {
			newHour = '05';
		} else if (oldHour === 18) {
			newHour = '06';
		} else if (oldHour === 19) {
			newHour = '07';
		} else if (oldHour === 20) {
			newHour = '08';
		} else if (oldHour === 21) {
			newHour = '09';
		} else if (oldHour === 22) {
			newHour = '10';
		} else if (oldHour === 23) {
			newHour = '11';
		}
		return newHour;
	}

	transformTime24(hour, keeping) {
		const oldHour = Number(hour);
		let newHour = oldHour;

		if (keeping === 'AM') {
			if (oldHour === 12) {
				newHour = '00';
			}
		} else if (keeping === 'PM') {
			if (oldHour === 1) {
				newHour = '13';
			} else if (oldHour === 2) {
				newHour = '14';
			} else if (oldHour === 3) {
				newHour = '15';
			} else if (oldHour === 4) {
				newHour = '16';
			} else if (oldHour === 5) {
				newHour = '17';
			} else if (oldHour === 6) {
				newHour = '18';
			} else if (oldHour === 7) {
				newHour = '19';
			} else if (oldHour === 8) {
				newHour = '20';
			} else if (oldHour === 9) {
				newHour = '21';
			} else if (oldHour === 10) {
				newHour = '22';
			} else if (oldHour === 11) {
				newHour = '23';
			}
		}
		return newHour;
	}

	setVariablesDates() {
		if (this.settings.selected.dates !== null) {
			this.selectedDates = this.settings.selected.dates;
		} else {
			this.selectedDates = [];
		}

		if (this.settings.selected.month !== null && this.settings.selected.month >= 0 && this.settings.selected.month < 12) {
			this.selectedMonth = this.settings.selected.month;
		} else {
			this.selectedMonth = this.date.today.getUTCMonth();
		}

		if (this.settings.selected.year !== null && this.settings.selected.year >= 0 && this.settings.selected.year <= 9999) {
			this.selectedYear = this.settings.selected.year;
		} else {
			this.selectedYear = this.date.today.getUTCFullYear();
		}

		this.viewYear = this.selectedYear;
		this.dateMin = this.settings.visibility.disabled ? new Date(this.date.min) : new Date(this.settings.range.min);
		this.dateMax = this.settings.visibility.disabled ? new Date(this.date.max) : new Date(this.settings.range.max);

		const time12 = this.settings.selection.time === true || this.settings.selection.time === 12;
		if (time12 || this.settings.selection.time === 24) {
			if (typeof this.settings.selected.time === 'string') {
				const regExr = time12 ? /^([0-9]|0[1-9]|1[0-2]):([0-5][0-9])|(AM|PM)/g
					: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])/g;

				this.settings.selected.time.replace(regExr, (m, p1, p2, p3) => {
					if (p1 && p2) {
						this.userTime = true;
						this.selectedHours = p1;
						this.selectedMinutes = p2;
					}
					if (p3 && time12) {
						this.selectedKeeping = p3;
					} else if (time12) {
						this.selectedKeeping = 'AM';
					}
				});
			}

			if (!this.userTime && (time12)) {
				this.selectedHours = this.transformTime12(this.date.today.getHours());
				this.selectedMinutes = this.date.today.getMinutes();
				this.selectedKeeping = Number(this.date.today.getHours()) > 12 ? 'PM' : 'AM';
			} else if (!this.userTime) {
				this.selectedHours = this.date.today.getHours();
				this.selectedMinutes = this.date.today.getMinutes();
			}

			this.selectedHours = Number(this.selectedHours) < 10 ? `0${Number(this.selectedHours)}` : `${this.selectedHours}`;
			this.selectedMinutes = Number(this.selectedMinutes) < 10 ? `0${Number(this.selectedMinutes)}` : `${this.selectedMinutes}`;
			this.selectedTime = `${this.selectedHours}:${this.selectedMinutes}${this.selectedKeeping ? ` ${this.selectedKeeping}` : ''}`;
		} else if (this.settings.selection.time) {
			this.settings.selection.time = null;
			// eslint-disable-next-line no-console
			console.error('The value of the time property can be: false, true, 12 or 24.');
		}
	}

	createDOM() {
		if (this.currentType === 'default') {
			this.HTMLElement.classList.add('vanilla-calendar_default');
			this.HTMLElement.classList.remove('vanilla-calendar_month');
			this.HTMLElement.classList.remove('vanilla-calendar_year');
			this.HTMLElement.innerHTML = `
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
			${this.settings.visibility.weekNumbers ? `
			<div class="vanilla-calendar-column">
				<b class="vanilla-calendar-column__title">#</b>
				<div class="vanilla-calendar-column__content vanilla-calendar-week-numbers"></div>
			</div>
			` : ''}
			<div class="vanilla-calendar-content">
				<div class="vanilla-calendar-week"></div>
				<div class="vanilla-calendar-days"></div>
				${this.settings.selection.time ? `
				<div class="vanilla-calendar-time"></div>
				` : ''}
			</div>
		`;
		} else if (this.currentType === 'month') {
			this.HTMLElement.classList.remove('vanilla-calendar_default');
			this.HTMLElement.classList.add('vanilla-calendar_month');
			this.HTMLElement.classList.remove('vanilla-calendar_year');
			this.HTMLElement.innerHTML = `
			<div class="vanilla-calendar-header">
				<div class="vanilla-calendar-header__content"></div>
			</div>
			<div class="vanilla-calendar-content">
				<div class="vanilla-calendar-months"></div>
			</div>`;
		} else if (this.currentType === 'year') {
			this.HTMLElement.classList.remove('vanilla-calendar_default');
			this.HTMLElement.classList.remove('vanilla-calendar_month');
			this.HTMLElement.classList.add('vanilla-calendar_year');
			this.HTMLElement.innerHTML = `
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
	}

	createHeader() {
		const headerContent = this.HTMLElement.querySelector('.vanilla-calendar-header__content');
		const monthDisabled = !this.settings.selection.month ? ' vanilla-calendar-month_disabled' : '';
		const yearDisabled = !this.settings.selection.year ? ' vanilla-calendar-year_disabled' : '';

		const month = `
		<button type="button"
			class="vanilla-calendar-month${monthDisabled}"
			data-calendar-selected-month="${this.selectedMonth}">
			${this.locale.months[this.selectedMonth]}
		</button>`.replace(/[\n\t]/g, '');
		const year = `
		<button type="button"
			class="vanilla-calendar-year${yearDisabled}"
			data-calendar-selected-year="${this.selectedYear}">
			${this.selectedYear}
		</button>`.replace(/[\n\t]/g, '');

		let templateHeader = this.settings.visibility.templateHeader.replace('%M', month);
		templateHeader = templateHeader.replace('%Y', year);

		headerContent.innerHTML = templateHeader;
	}

	controlArrows() {
		if (!['default', 'year'].includes(this.currentType)) return;

		const arrowPrev = this.HTMLElement.querySelector('.vanilla-calendar-arrow_prev');
		const arrowNext = this.HTMLElement.querySelector('.vanilla-calendar-arrow_next');

		const defaultControl = () => {
			if (this.currentType !== 'default') return;

			const isSelectedMinMount = this.selectedMonth === this.dateMin.getUTCMonth();
			const isSelectedMaxMount = this.selectedMonth === this.dateMax.getUTCMonth();
			const isSelectedMinYear = !this.settings.selection.year ? true : this.selectedYear === this.dateMin.getUTCFullYear();
			const isSelectedMaxYear = !this.settings.selection.year ? true : this.selectedYear === this.dateMax.getUTCFullYear();

			if ((isSelectedMinMount && isSelectedMinYear) || !this.settings.selection.month) {
				arrowPrev.style.visibility = 'hidden';
			} else {
				arrowPrev.style.visibility = null;
			}
			if ((isSelectedMaxMount && isSelectedMaxYear) || !this.settings.selection.month) {
				arrowNext.style.visibility = 'hidden';
			} else {
				arrowNext.style.visibility = null;
			}
		};

		const yearControl = () => {
			if (this.currentType !== 'year') return;

			if (this.dateMin.getUTCFullYear() && (this.viewYear - 7) <= this.dateMin.getUTCFullYear()) {
				arrowPrev.style.visibility = 'hidden';
			} else {
				arrowPrev.style.visibility = null;
			}

			if (this.dateMax.getUTCFullYear() && (this.viewYear + 7) >= this.dateMax.getUTCFullYear()) {
				arrowNext.style.visibility = 'hidden';
			} else {
				arrowNext.style.visibility = null;
			}
		};

		defaultControl();
		yearControl();
	}

	createWeek() {
		const weekEl = this.HTMLElement.querySelector('.vanilla-calendar-week');
		const templateWeekDayEl = document.createElement('b');
		templateWeekDayEl.className = 'vanilla-calendar-week__day';

		const weekday = [...this.locale.weekday];
		if (this.settings.iso8601) weekday.push(weekday.shift());

		weekEl.innerHTML = '';

		for (let i = 0; i < weekday.length; i++) {
			const weekDayName = weekday[i];
			const weekDayEl = templateWeekDayEl.cloneNode(true);

			if (this.settings.visibility.weekend && this.settings.iso8601) {
				if (i === 5 || i === 6) {
					weekDayEl.classList.add('vanilla-calendar-week__day_weekend');
				}
			} else if (this.settings.visibility.weekend && !this.settings.iso8601) {
				if (i === 0 || i === 6) {
					weekDayEl.classList.add('vanilla-calendar-week__day_weekend');
				}
			}

			weekDayEl.innerText = `${weekDayName}`;
			weekEl.append(weekDayEl);
		}
	}

	getWeekNumber(date) {
		const day = new Date(date).getUTCDate();
		const month = new Date(date).getUTCMonth();
		const year = new Date(date).getUTCFullYear();
		const correctDate = new Date(year, month, day);
		const yearStart = new Date(Date.UTC(correctDate.getUTCFullYear(), 0, 1));
		const weekNumber = Math.ceil((((correctDate - yearStart) / 86400000) + 1) / 7);
		return {
			year: correctDate.getUTCFullYear(),
			week: weekNumber,
		};
	}

	createWeekNumbers(firstDayWeek, daysSelectedMonth) {
		if (!this.settings.visibility.weekNumbers) return;
		const weekNumbersEl = this.HTMLElement.querySelector('.vanilla-calendar-week-numbers');
		const daysBtnEl = this.HTMLElement.querySelectorAll('.vanilla-calendar-day__btn');
		const countWeek = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);
		const templateWeekNumberEl = document.createElement('span');
		templateWeekNumberEl.className = 'vanilla-calendar-week-number';

		weekNumbersEl.innerHTML = '';

		for (let i = 0; i < countWeek; i++) {
			const weekNumber = this.getWeekNumber(daysBtnEl[i * 7].dataset.calendarDay);
			const weekNumberEl = templateWeekNumberEl.cloneNode(true);
			weekNumberEl.innerText = `${weekNumber.week}`;
			weekNumberEl.dataset.calendarYearWeek = `${weekNumber.year}`;
			weekNumbersEl.append(weekNumberEl);
		}
	}

	createPopup(daysEl) {
		if (!this.popups) return;

		// eslint-disable-next-line no-restricted-syntax
		for (const day in this.popups) {
			if (Object.hasOwnProperty.call(this.popups, day)) {
				const dayBtnEl = daysEl.querySelector(`[data-calendar-day="${day}"]`);

				if (dayBtnEl) {
					const dayInfo = this.popups[day];
					dayBtnEl.classList.add(dayInfo.modifier);
					dayBtnEl.parentNode.innerHTML += `<div class="vanilla-calendar-day__popup">${dayInfo.html}</div>`;
				}
			}
		}
	}

	createDays() {
		const firstDay = new Date(Date.UTC(this.selectedYear, this.selectedMonth, 1));
		const daysSelectedMonth = new Date(Date.UTC(this.selectedYear, this.selectedMonth + 1, 0)).getUTCDate();

		let firstDayWeek = Number(firstDay.getUTCDay());
		if (this.settings.iso8601) firstDayWeek = Number((firstDay.getUTCDay() !== 0 ? firstDay.getUTCDay() : 7) - 1);

		const daysEl = this.HTMLElement.querySelector('.vanilla-calendar-days');
		const templateDayEl = document.createElement('div');
		const templateDayBtnEl = document.createElement('button');
		templateDayEl.className = 'vanilla-calendar-day';
		templateDayBtnEl.className = 'vanilla-calendar-day__btn';
		templateDayBtnEl.type = 'button';

		if (['single', 'multiple', 'multiple-ranged'].includes(this.settings.selection.day)) {
			daysEl.classList.add('vanilla-calendar-days_selecting');
		}

		daysEl.innerHTML = '';

		const setDayModifier = (dayBtnEl, dayID, date, currentMonth) => {
			// if weekend
			if (this.settings.visibility.weekend && (dayID === 0 || dayID === 6)) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_weekend');
			}

			// if holidays
			if (Array.isArray(this.settings.selected.holidays)) {
				this.settings.selected.holidays.forEach((holiday) => {
					if (holiday === date) {
						dayBtnEl.classList.add('vanilla-calendar-day__btn_holiday');
					}
				});
			}

			// if today
			let thisToday = this.date.today.getUTCDate();
			let thisMonth = this.date.today.getUTCMonth() + 1;
			thisToday = thisToday < 10 ? `0${thisToday}` : thisToday;
			thisMonth = thisMonth < 10 ? `0${thisMonth}` : thisMonth;

			const thisDay = `${this.date.today.getUTCFullYear()}-${thisMonth}-${thisToday}`;

			if (this.settings.visibility.today && dayBtnEl.dataset.calendarDay === thisDay) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_today');
			}

			// if selected day
			if (this.selectedDates.indexOf(date) === 0) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_selected');
			} else if (this.selectedDates[0] && (this.selectedDates.indexOf(date) === this.selectedDates.length - 1)) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_selected');
			} else if (this.settings.selection.day === 'multiple-ranged' && this.selectedDates.indexOf(date) > 0) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_selected');
				dayBtnEl.classList.add('vanilla-calendar-day__btn_intermediate');
			} else if (this.selectedDates.indexOf(date) > 0) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_selected');
			}

			// if range min/max
			if (this.settings.range.min > date || this.settings.range.max < date) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_disabled');
			}

			// if disabled selected
			if (!this.settings.selection.month && !currentMonth) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_disabled');
			}
			if (!this.settings.selection.year && new Date(date).getFullYear() !== this.selectedYear) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_disabled');
			}

			// if range values
			if (Array.isArray(this.settings.range.disabled)) {
				this.settings.range.disabled.forEach((dateDisabled) => {
					if (dateDisabled === date) {
						dayBtnEl.classList.add('vanilla-calendar-day__btn_disabled');
					}
				});
			} else if (Array.isArray(this.settings.range.enabled)) {
				dayBtnEl.classList.add('vanilla-calendar-day__btn_disabled');
				this.settings.range.enabled.forEach((dateEnabled) => {
					if (dateEnabled === date) {
						dayBtnEl.classList.remove('vanilla-calendar-day__btn_disabled');
					}
				});
			}
		};

		const createDay = (dayText, dayID, date, currentMonth, modifier) => {
			const dayEl = templateDayEl.cloneNode(true);
			const dayBtnEl = templateDayBtnEl.cloneNode(true);
			if (modifier) dayBtnEl.classList.add(modifier);
			dayBtnEl.innerText = dayText;
			dayBtnEl.dataset.calendarDay = date;

			setDayModifier(dayBtnEl, dayID, date, currentMonth);
			dayEl.append(dayBtnEl);
			daysEl.append(dayEl);
		};

		const prevMonth = () => {
			const prevMonthDays = new Date(Date.UTC(this.selectedYear, this.selectedMonth, 0)).getUTCDate();
			let day = prevMonthDays - firstDayWeek;
			let year = this.selectedYear;
			let month = this.selectedMonth;

			if (this.selectedMonth === 0) {
				month = this.locale.months.length;
				year = this.selectedYear - 1;
			} else if (this.selectedMonth < 10) {
				month = `0${this.selectedMonth}`;
			}

			for (let i = 0; i < firstDayWeek; i++) {
				day += 1;

				const date = `${year}-${month}-${day}`;
				const dayIDCurrent = new Date(Date.UTC(this.selectedYear, this.selectedMonth, day - 1));
				const prevMonthID = dayIDCurrent.getUTCMonth() - 1;
				const dayID = new Date(Date.UTC(this.selectedYear, prevMonthID, day)).getUTCDay();

				createDay(day, dayID, date, false, 'vanilla-calendar-day__btn_prev');
			}
		};

		const selectedMonth = () => {
			for (let i = 1; i <= daysSelectedMonth; i++) {
				const day = new Date(Date.UTC(this.selectedYear, this.selectedMonth, i));
				const date = this.generateDate(day);
				const dayID = day.getUTCDay();

				createDay(i, dayID, date, true);
			}
		};

		const nextMonth = () => {
			const total = firstDayWeek + daysSelectedMonth;
			const rows = Math.ceil(total / this.locale.weekday.length);
			const nextDays = (this.locale.weekday.length * rows) - total;

			let year = this.selectedYear;
			let month = this.selectedMonth + 2;

			if ((this.selectedMonth + 1) === this.locale.months.length) {
				month = '01';
				year = this.selectedYear + 1;
			} else if ((this.selectedMonth + 2) < 10) {
				month = `0${this.selectedMonth + 2}`;
			}

			for (let i = 1; i <= nextDays; i++) {
				const day = i < 10 ? `0${i}` : i;
				const date = `${year}-${month}-${day}`;
				const dayIDCurrent = new Date(Date.UTC(this.selectedYear, this.selectedMonth, i));
				const nextMonthID = dayIDCurrent.getUTCMonth() + 1;
				const dayID = new Date(Date.UTC(this.selectedYear, nextMonthID, i)).getUTCDay();

				createDay(i, dayID, date, false, 'vanilla-calendar-day__btn_next');
			}
		};

		prevMonth();
		selectedMonth();
		nextMonth();
		this.createPopup(daysEl);
		this.createWeekNumbers(firstDayWeek, daysSelectedMonth);
	}

	changeMonth(route) {
		const lastMonth = this.locale.months.length - 1;

		switch (route) {
			case 'prev':
				if (this.selectedMonth !== 0) {
					this.selectedMonth -= 1;
				} else if (this.settings.selection.year) {
					this.selectedYear -= 1;
					this.selectedMonth = lastMonth;
				}
				break;
			case 'next':
				if (this.selectedMonth !== lastMonth) {
					this.selectedMonth += 1;
				} else if (this.settings.selection.year) {
					this.selectedYear += 1;
					this.selectedMonth = 0;
				}
				break;
			// no default
		}

		this.settings.selected.month = this.selectedMonth;
		this.settings.selected.year = this.selectedYear;

		this.createHeader();
		this.controlArrows();
		this.createDays();
	}

	createYears() {
		this.currentType = 'year';
		this.createDOM();
		this.createHeader();
		this.controlArrows();

		const yearsEl = this.HTMLElement.querySelector('.vanilla-calendar-years');
		if (this.settings.selection.year) yearsEl.classList.add('vanilla-calendar-years_selecting');
		const templateYearEl = document.createElement('button');
		templateYearEl.type = 'button';
		templateYearEl.className = 'vanilla-calendar-years__year';

		for (let i = this.viewYear - 7; i < this.viewYear + 8; i++) {
			const year = i;
			const yearEl = templateYearEl.cloneNode(true);

			if (year === this.selectedYear) {
				yearEl.classList.add('vanilla-calendar-years__year_selected');
			}
			if (year < this.dateMin.getUTCFullYear()) {
				yearEl.classList.add('vanilla-calendar-years__year_disabled');
			}
			if (year > this.dateMax.getUTCFullYear()) {
				yearEl.classList.add('vanilla-calendar-years__year_disabled');
			}

			yearEl.dataset.calendarYear = year;
			yearEl.innerText = `${year}`;
			yearsEl.append(yearEl);
		}
	}

	createMonths() {
		this.currentType = 'month';
		this.createDOM();
		this.createHeader();

		const monthsEl = this.HTMLElement.querySelector('.vanilla-calendar-months');
		if (this.settings.selection.month) monthsEl.classList.add('vanilla-calendar-months_selecting');

		const templateMonthEl = document.createElement('button');
		templateMonthEl.type = 'button';
		templateMonthEl.className = 'vanilla-calendar-months__month';

		for (let i = 0; i < this.locale.months.length; i++) {
			const month = this.locale.months[i];
			const monthEl = templateMonthEl.cloneNode(true);

			if (i === this.selectedMonth) {
				monthEl.classList.add('vanilla-calendar-months__month_selected');
			}
			if (i < this.dateMin.getUTCMonth() && this.selectedYear === this.dateMin.getUTCFullYear()) {
				monthEl.classList.add('vanilla-calendar-months__month_disabled');
			}
			if (i > this.dateMax.getUTCMonth() && this.selectedYear === this.dateMax.getUTCFullYear()) {
				monthEl.classList.add('vanilla-calendar-months__month_disabled');
			}

			monthEl.dataset.calendarMonth = i;

			monthEl.title = `${month}`;
			monthEl.innerText = `${this.settings.visibility.monthShort ? month.substring(0, 3) : month}`;
			monthsEl.append(monthEl);
		}
	}

	controlTime(keepingTime) {
		const rangeHours = this.HTMLElement.querySelector('.vanilla-calendar-time__range input[name="hours"]');
		const rangeMinutes = this.HTMLElement.querySelector('.vanilla-calendar-time__range input[name="minutes"]');
		const inputHours = this.HTMLElement.querySelector('.vanilla-calendar-time__hours input[name="hours"]');
		const inputMinutes = this.HTMLElement.querySelector('.vanilla-calendar-time__minutes input[name="minutes"]');
		const btnKeepingTime = this.HTMLElement.querySelector('.vanilla-calendar-time__keeping');

		const mouseoverRange = (range, input) => {
			range.addEventListener('mouseover', () => input.classList.add('is-focus'));
		};

		const mouseoutRange = (range, input) => {
			range.addEventListener('mouseout', () => input.classList.remove('is-focus'));
		};

		const setTime = (e, value, type) => {
			if (type === 'hours') {
				this.selectedHours = `${value}`;
			} else if (type === 'minutes') {
				this.selectedMinutes = `${value}`;
			}
			this.selectedTime = `${this.selectedHours}:${this.selectedMinutes}${this.selectedKeeping ? ` ${this.selectedKeeping}` : ''}`;
			this.settings.selected.time = this.selectedTime;

			if (this.actions.changeTime) {
				this.actions.changeTime(e, this.selectedTime, this.selectedHours, this.selectedMinutes, this.selectedKeeping);
			}
		};

		const changeRange = (range, input, type, max) => {
			range.addEventListener('input', (e) => {
				let value = Number(e.target.value);
				value = value < 10 ? `0${value}` : `${value}`;

				if (type === 'hours' && max === 12) {
					if (Number(e.target.value) < max && Number(e.target.value) > 0) {
						input.value = value;
						this.selectedKeeping = 'AM';
						btnKeepingTime.innerText = this.selectedKeeping;
						setTime(e, value, type);
					} else {
						if (Number(e.target.value) === 0) {
							this.selectedKeeping = 'AM';
							btnKeepingTime.innerText = 'AM';
						} else {
							this.selectedKeeping = 'PM';
							btnKeepingTime.innerText = 'PM';
						}
						input.value = this.transformTime12(e.target.value);
						setTime(e, this.transformTime12(e.target.value), type);
					}
				} else {
					input.value = value;
					setTime(e, value, type);
				}
			});
		};

		const changeInput = (range, input, type, max) => {
			input.addEventListener('change', (e) => {
				let value = Number(e.target.value);
				value = value < 10 ? `0${value}` : `${value}`;

				if (type === 'hours' && max === 12) {
					if (e.target.value && Number(e.target.value) <= max && Number(e.target.value) > 0) {
						e.target.value = value;
						range.value = this.transformTime24(value, this.selectedKeeping);
						setTime(e, value, type);
					} else if (e.target.value && Number(e.target.value) < 24 && (Number(e.target.value) > max || Number(e.target.value) === 0)) {
						if (Number(e.target.value) === 0) {
							this.selectedKeeping = 'AM';
							btnKeepingTime.innerText = 'AM';
						} else {
							this.selectedKeeping = 'PM';
							btnKeepingTime.innerText = 'PM';
						}
						e.target.value = this.transformTime12(e.target.value);
						range.value = value;
						setTime(e, this.transformTime12(e.target.value), type);
					} else {
						e.target.value = this.selectedHours;
					}
				} else if (e.target.value && Number(e.target.value) <= max && Number(e.target.value) >= 0) {
					e.target.value = value;
					range.value = value;
					setTime(e, value, type);
				} else if (type === 'hours') {
					e.target.value = this.selectedHours;
				} else if (type === 'minutes') {
					e.target.value = this.selectedMinutes;
				}
			});
		};

		mouseoverRange(rangeHours, inputHours);
		mouseoverRange(rangeMinutes, inputMinutes);
		mouseoutRange(rangeHours, inputHours);
		mouseoutRange(rangeMinutes, inputMinutes);
		changeRange(rangeHours, inputHours, 'hours', keepingTime === 24 ? 23 : keepingTime);
		changeRange(rangeMinutes, inputMinutes, 'minutes');
		changeInput(rangeHours, inputHours, 'hours', keepingTime === 24 ? 23 : keepingTime);
		changeInput(rangeMinutes, inputMinutes, 'minutes', 59);

		if (!btnKeepingTime) return;
		btnKeepingTime.addEventListener('click', (e) => {
			if (btnKeepingTime.innerText.includes('AM')) {
				this.selectedKeeping = 'PM';
			} else {
				this.selectedKeeping = 'AM';
			}
			rangeHours.value = this.transformTime24(this.selectedHours, this.selectedKeeping);
			setTime(e, this.selectedHours, 'hours');
			btnKeepingTime.innerText = this.selectedKeeping;
		});
	}

	createTime() {
		const timeEl = this.HTMLElement.querySelector('.vanilla-calendar-time');
		if (!timeEl) return;
		const keepingTime = this.settings.selection.time === true ? 12 : this.settings.selection.time;
		const range = this.settings.selection.controlTime === 'range';

		timeEl.innerHTML = `
		<div class="vanilla-calendar-time__content">
			<label class="vanilla-calendar-time__hours">
				<input type="text"
					name="hours"
					maxlength="2"
					value="${this.selectedHours}"
					${range ? 'disabled' : ''}>
			</label>
			<label class="vanilla-calendar-time__minutes">
				<input type="text"
					name="minutes"
					maxlength="2"
					value="${this.selectedMinutes}"
					${range ? 'disabled' : ''}>
			</label>
			${keepingTime === 12 ? `
			<button type="button"
				class="vanilla-calendar-time__keeping"
				${range ? 'disabled' : ''}>${this.selectedKeeping}</button>
			` : ''}
		</div>
		<div class="vanilla-calendar-time__ranges">
			<label class="vanilla-calendar-time__range">
				<input type="range"
					name="hours"
					min="0"
					max="23"
					step="${this.settings.selection.stepHours}"
					value="${this.selectedKeeping ? this.transformTime24(this.selectedHours, this.selectedKeeping) : this.selectedHours}">
			</label>
			<label class="vanilla-calendar-time__range">
				<input type="range"
					name="minutes"
					min="0"
					max="59"
					step="${this.settings.selection.stepMinutes}"
					value="${this.selectedMinutes}">
			</label>
		</div>`;

		this.controlTime(keepingTime);
	}

	getLocale() {
		if (this.settings.lang === 'define') return;

		this.locale.weekday = [];
		for (let i = 0; i < 7; i++) {
			let weekday = new Date(0, 0, i).toLocaleString(this.settings.lang, { weekday: 'short' });
			weekday = `${weekday.charAt(0).toUpperCase()}${weekday.substring(1, weekday.length)}`;
			weekday = weekday.replace(/\./, '');
			this.locale.weekday.push(weekday);
		}

		this.locale.months = [];
		for (let i = 0; i < 12; i++) {
			let month = new Date(0, i).toLocaleString(this.settings.lang, { month: 'long' });
			month = `${month.charAt(0).toUpperCase()}${month.substring(1, month.length)}`;
			month = month.replace(/\./, '');
			this.locale.months.push(month);
		}
	}

	update() {
		this.setVariablesDates();
		this.getLocale();
		this.createDOM();
		this.createHeader();
		this.controlArrows();
		this.createTime();

		if (this.currentType === 'default') {
			this.createWeek();
			this.createDays();
		} else if (this.currentType === 'month') {
			this.createMonths();
		} else if (this.currentType === 'year') {
			this.createYears();
		}
	}

	click() {
		this.HTMLElement.addEventListener('click', (e) => {
			const arrowEl = e.target.closest('.vanilla-calendar-arrow');
			const arrowPrevEl = e.target.closest('.vanilla-calendar-arrow_prev');
			const arrowNextEl = e.target.closest('.vanilla-calendar-arrow_next');
			const dayBtnEl = e.target.closest('.vanilla-calendar-day__btn');
			const dayBtnPrevEl = e.target.closest('.vanilla-calendar-day__btn_prev');
			const dayBtnNextEl = e.target.closest('.vanilla-calendar-day__btn_next');
			const yearHeaderEl = e.target.closest('.vanilla-calendar-year');
			const yearItemEl = e.target.closest('.vanilla-calendar-years__year');
			const monthHeaderEl = e.target.closest('.vanilla-calendar-month');
			const monthItemEl = e.target.closest('.vanilla-calendar-months__month');

			const clickArrowMonth = () => {
				if (arrowEl && this.currentType !== 'year' && this.currentType !== 'month') {
					this.changeMonth(e.target.dataset.calendarArrow);
				}
			};

			const clickDaySingle = () => {
				if (dayBtnEl.classList.contains('vanilla-calendar-day__btn_selected')) {
					this.selectedDates.splice(this.selectedDates.indexOf(dayBtnEl.dataset.calendarDay), 1);
				} else {
					this.selectedDates = [];
					this.selectedDates.push(dayBtnEl.dataset.calendarDay);
				}
			};

			const clickDayMultiple = () => {
				if (dayBtnEl.classList.contains('vanilla-calendar-day__btn_selected')) {
					this.selectedDates.splice(this.selectedDates.indexOf(dayBtnEl.dataset.calendarDay), 1);
				} else {
					this.selectedDates.push(dayBtnEl.dataset.calendarDay);
				}
			};

			const clickDayMultipleRanged = () => {
				if (this.selectedDates.length > 1) this.selectedDates = [];
				this.selectedDates.push(dayBtnEl.dataset.calendarDay);

				if (!this.selectedDates[1]) return;

				const startDate = new Date(Date.UTC(
					new Date(this.selectedDates[0]).getUTCFullYear(),
					new Date(this.selectedDates[0]).getUTCMonth(),
					new Date(this.selectedDates[0]).getUTCDate(),
				));

				const endDate = new Date(Date.UTC(
					new Date(this.selectedDates[1]).getUTCFullYear(),
					new Date(this.selectedDates[1]).getUTCMonth(),
					new Date(this.selectedDates[1]).getUTCDate(),
				));

				const addSelectedDate = (day) => {
					const date = this.generateDate(day);
					if (this.settings.range.disabled && this.settings.range.disabled.includes(date)) return;
					this.selectedDates.push(date);
				};

				this.selectedDates = [];

				if (endDate > startDate) {
					for (let i = startDate; i <= endDate; i.setUTCDate(i.getUTCDate() + 1)) {
						addSelectedDate(i);
					}
				} else {
					for (let i = startDate; i >= endDate; i.setUTCDate(i.getUTCDate() - 1)) {
						addSelectedDate(i);
					}
				}
			};

			const clickDay = () => {
				if (['single', 'multiple', 'multiple-ranged'].includes(this.settings.selection.day) && dayBtnEl) {
					switch (this.settings.selection.day) {
						case 'single':
							clickDaySingle();
							break;
						case 'multiple':
							clickDayMultiple();
							break;
						case 'multiple-ranged':
							clickDayMultipleRanged();
							break;
						// no default
					}

					if (this.actions.clickDay) this.actions.clickDay(e, this.selectedDates);
					this.settings.selected.dates = this.selectedDates;

					if (dayBtnPrevEl) {
						this.changeMonth('prev');
					} else if (dayBtnNextEl) {
						this.changeMonth('next');
					} else {
						this.createDays();
					}
				}
			};

			const clickYear = () => {
				if (!this.settings.selection.year) return;
				if (arrowEl && this.currentType === 'year') {
					if (arrowNextEl) {
						this.viewYear += 15;
					} else if (arrowPrevEl) {
						this.viewYear -= 15;
					}
					this.createYears();
				} else if (this.currentType !== 'year' && yearHeaderEl) {
					this.createYears();
				} else if (this.currentType === 'year' && yearHeaderEl) {
					this.currentType = this.type;
					this.update();
				} else if (yearItemEl) {
					this.selectedYear = Number(yearItemEl.dataset.calendarYear);
					this.currentType = this.type;
					if (this.selectedMonth < this.dateMin.getUTCMonth() && this.selectedYear === this.dateMin.getUTCFullYear()) {
						this.settings.selected.month = this.dateMin.getUTCMonth();
					}
					if (this.selectedMonth > this.dateMax.getUTCMonth() && this.selectedYear === this.dateMax.getUTCFullYear()) {
						this.settings.selected.month = this.dateMax.getUTCMonth();
					}
					if (this.actions.clickYear) this.actions.clickYear(e, this.selectedYear);
					this.settings.selected.year = this.selectedYear;
					this.update();
				}
			};

			const clickMonth = () => {
				if (!this.settings.selection.month) return;
				if (this.currentType !== 'month' && monthHeaderEl) {
					this.createMonths();
				} else if (this.currentType === 'month' && monthHeaderEl) {
					this.currentType = this.type;
					this.update();
				} else if (monthItemEl) {
					this.selectedMonth = Number(monthItemEl.dataset.calendarMonth);
					this.currentType = this.type;
					if (this.actions.clickMonth) this.actions.clickMonth(e, this.selectedMonth);
					this.settings.selected.month = this.selectedMonth;
					this.update();
				}
			};

			clickArrowMonth();
			clickDay();
			clickYear();
			clickMonth();
		});
	}

	init() {
		if (!this.HTMLElement) return;
		this.update();
		this.click();
	}
}
