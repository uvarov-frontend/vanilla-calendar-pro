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
			},
			selection: {
				day: option?.settings?.selection?.day ?? 'single',
				month: option?.settings?.selection?.month ?? true,
				year: option?.settings?.selection?.year ?? true,
			},
			selected: {
				dates: option?.settings?.selected?.dates ?? null,
				month: option?.settings?.selected?.month ?? null,
				year: option?.settings?.selected?.year ?? null,
				holidays: option?.settings?.selected?.holidays ?? null,
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
		};
		this.popups = option?.popups ?? null;

		this.currentType = this.type;
	}

	generateDate(date) {
		const year = date.getUTCFullYear();
		let month = date.getUTCMonth() + 1;
		let day = date.getUTCDate();

		month = month < 10 ? `0${month}` : month;
		day = day < 10 ? `0${day}` : day;

		return `${year}-${month}-${day}`;
	}

	setVariablesDates() {
		this.selectedDates = [];
		this.selectedMonth = this.date.today.getUTCMonth();
		this.selectedYear = this.date.today.getUTCFullYear();

		if (this.settings.selected.dates !== null) {
			this.selectedDates = this.settings.selected.dates;
		}

		if (this.settings.selected.month !== null && this.settings.selected.month >= 0 && this.settings.selected.month < 12) {
			this.selectedMonth = this.settings.selected.month;
		}

		if (this.settings.selected.year !== null && this.settings.selected.year >= 0 && this.settings.selected.year <= 9999) {
			this.selectedYear = this.settings.selected.year;
		}

		this.viewYear = this.selectedYear;
		this.dateMin = this.settings.visibility.disabled ? new Date(this.date.min) : new Date(this.settings.range.min);
		this.dateMax = this.settings.visibility.disabled ? new Date(this.date.max) : new Date(this.settings.range.max);
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
					title="prev">
				</button>
				<div class="vanilla-calendar-header__content"></div>
				<button type="button"
					class="vanilla-calendar-arrow vanilla-calendar-arrow_next"
					title="next">
				</button>
			</div>
			${this.settings.visibility.weekNumbers ? `
			<div class="vanilla-calendar-column">
				<div class="vanilla-calendar-column__title">#</div>
				<div class="vanilla-calendar-column__content vanilla-calendar-week-numbers"></div>
			</div>
			` : ''}
			<div class="vanilla-calendar-content">
				<div class="vanilla-calendar-week"></div>
				<div class="vanilla-calendar-days"></div>
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

		const month = `<b class="vanilla-calendar-month${monthDisabled}">${this.locale.months[this.selectedMonth]}</b>`;
		const year = `<b class="vanilla-calendar-year${yearDisabled}">${this.selectedYear}</b>`;

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
			const isSelectedMinYear = this.selectedYear === this.dateMin.getUTCFullYear();
			const isSelectedMaxYear = this.selectedYear === this.dateMax.getUTCFullYear();

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
		const templateWeekDayEl = document.createElement('span');
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
		const daysEl = this.HTMLElement.querySelectorAll('.vanilla-calendar-day');
		const countWeek = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);
		const templateWeekNumberEl = document.createElement('span');
		templateWeekNumberEl.className = 'vanilla-calendar-week-number';

		weekNumbersEl.innerHTML = '';

		for (let i = 0; i < countWeek; i++) {
			const weekNumber = this.getWeekNumber(daysEl[i * 7].dataset.calendarDay);
			const weekNumberEl = templateWeekNumberEl.cloneNode(true);
			weekNumberEl.innerText = `${weekNumber.week}`;
			weekNumberEl.dataset.calendarYear = `${weekNumber.year}`;
			weekNumbersEl.append(weekNumberEl);
		}
	}

	createPopup(daysEl) {
		if (!this.popups) return;

		// eslint-disable-next-line no-restricted-syntax
		for (const day in this.popups) {
			if (Object.hasOwnProperty.call(this.popups, day)) {
				const dayEl = daysEl.querySelector(`[data-calendar-day="${day}"]`);
				if (!dayEl) return;

				const dayInfo = this.popups[day];
				dayEl.classList.add(dayInfo.modifier);
				dayEl.innerHTML += `<div class="vanilla-calendar-day__popup">${dayInfo.html}</div`;
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
		templateDayEl.className = 'vanilla-calendar-day';

		if (['single', 'multiple', 'multiple-ranged'].includes(this.settings.selection.day)) {
			daysEl.classList.add('vanilla-calendar-days_selecting');
		}

		daysEl.innerHTML = '';

		const setDayModifier = (dayEl, dayID, date) => {
			// if weekend
			if (this.settings.visibility.weekend && (dayID === 0 || dayID === 6)) {
				dayEl.classList.add('vanilla-calendar-day_weekend');
			}

			// if holidays
			if (Array.isArray(this.settings.selected.holidays)) {
				this.settings.selected.holidays.forEach((holiday) => {
					if (holiday === date) {
						dayEl.classList.add('vanilla-calendar-day_holiday');
					}
				});
			}

			// if today
			let thisToday = this.date.today.getUTCDate();
			let thisMonth = this.date.today.getUTCMonth() + 1;
			thisToday = thisToday < 10 ? `0${thisToday}` : thisToday;
			thisMonth = thisMonth < 10 ? `0${thisMonth}` : thisMonth;

			const thisDay = `${this.date.today.getUTCFullYear()}-${thisMonth}-${thisToday}`;

			if (this.settings.visibility.today && dayEl.dataset.calendarDay === thisDay) {
				dayEl.classList.add('vanilla-calendar-day_today');
			}

			// if selected day
			if (this.selectedDates.find((selectedDate) => selectedDate === date)) {
				dayEl.classList.add('vanilla-calendar-day_selected');
			}

			// if range min/max
			if (this.settings.range.min > date || this.settings.range.max < date) {
				dayEl.classList.add('vanilla-calendar-day_disabled');
			}

			// if range values
			if (Array.isArray(this.settings.range.disabled)) {
				this.settings.range.disabled.forEach((dateDisabled) => {
					if (dateDisabled === date) {
						dayEl.classList.add('vanilla-calendar-day_disabled');
					}
				});
			}
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

				const dayEl = templateDayEl.cloneNode(true);
				dayEl.classList.add('vanilla-calendar-day_prev');
				dayEl.innerText = `${day}`;
				dayEl.dataset.calendarDay = date;

				setDayModifier(dayEl, dayID, date);
				daysEl.append(dayEl);
			}
		};

		const selectedMonth = () => {
			for (let i = 1; i <= daysSelectedMonth; i++) {
				const day = new Date(Date.UTC(this.selectedYear, this.selectedMonth, i));

				const date = this.generateDate(day);
				const dayID = day.getUTCDay();

				const dayEl = templateDayEl.cloneNode(true);
				dayEl.innerText = `${i}`;
				dayEl.dataset.calendarDay = date;

				setDayModifier(dayEl, dayID, date);
				daysEl.append(dayEl);
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

				const dayEl = templateDayEl.cloneNode(true);
				dayEl.classList.add('vanilla-calendar-day_next');
				dayEl.innerText = `${i}`;
				dayEl.dataset.calendarDay = date;

				setDayModifier(dayEl, dayID, date);
				daysEl.append(dayEl);
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
		const templateYearEl = document.createElement('span');
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

		const templateMonthEl = document.createElement('span');
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
			const dayEl = e.target.closest('.vanilla-calendar-day');
			const dayPrevEl = e.target.closest('.vanilla-calendar-day_prev');
			const dayNextEl = e.target.closest('.vanilla-calendar-day_next');
			const yearHeaderEl = e.target.closest('.vanilla-calendar-year');
			const yearItemEl = e.target.closest('.vanilla-calendar-years__year');
			const monthHeaderEl = e.target.closest('.vanilla-calendar-month');
			const monthItemEl = e.target.closest('.vanilla-calendar-months__month');

			const clickDaySingle = () => {
				if (dayEl.classList.contains('vanilla-calendar-day_selected')) {
					this.selectedDates.splice(this.selectedDates.indexOf(dayEl.dataset.calendarDay), 1);
				} else {
					this.selectedDates = [];
					this.selectedDates.push(dayEl.dataset.calendarDay);
				}
			};

			const clickDayMultiple = () => {
				if (dayEl.classList.contains('vanilla-calendar-day_selected')) {
					this.selectedDates.splice(this.selectedDates.indexOf(dayEl.dataset.calendarDay), 1);
				} else {
					this.selectedDates.push(dayEl.dataset.calendarDay);
				}
			};

			const clickDayMultipleRanged = () => {
				if (this.selectedDates.length > 1) this.selectedDates = [];
				this.selectedDates.push(dayEl.dataset.calendarDay);

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
				if (['single', 'multiple', 'multiple-ranged'].includes(this.settings.selection.day) && dayEl) {
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

					if (this.actions.clickDay) this.actions.clickDay(e);
					this.settings.selected.dates = this.selectedDates;

					if (dayPrevEl) {
						this.changeMonth('prev');
					} else if (dayNextEl) {
						this.changeMonth('next');
					} else {
						this.createDays();
					}
				} else if (arrowEl && this.currentType !== 'year' && this.currentType !== 'month') {
					this.changeMonth(e.target.title);
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
					const year = Number(yearItemEl.dataset.calendarYear);
					this.currentType = this.type;
					if (this.selectedMonth < this.dateMin.getUTCMonth() && year === this.dateMin.getUTCFullYear()) {
						this.settings.selected.month = this.dateMin.getUTCMonth();
					}
					if (this.selectedMonth > this.dateMax.getUTCMonth() && year === this.dateMax.getUTCFullYear()) {
						this.settings.selected.month = this.dateMax.getUTCMonth();
					}
					this.settings.selected.year = year;
					if (this.actions.clickYear) this.actions.clickYear(e);
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
					const month = Number(monthItemEl.dataset.calendarMonth);
					this.currentType = this.type;
					this.settings.selected.month = month;
					if (this.actions.clickMonth) this.actions.clickMonth(e);
					this.update();
				}
			};

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

window.VanillaCalendar = VanillaCalendar;
