export default class DefaultPrivateOptionsCalendar {
  private = {
    isInit: false,
    isInputInit: false,
    currentType: null,

    locale: {
      months: {
        short: [],
        long: [],
      },
      weekdays: {
        short: [],
        long: [],
      },
    },

    mainElement: null,
    originalElement: null,
    inputElement: null,

    dateMin: null,
    dateMax: null,

    displayYear: null,
    displayDateMin: null,
    displayDateMax: null,

    disableDates: null,
    enableDates: null,

    selectedDates: null,
    selectedMonth: null,
    selectedYear: null,
    selectedHours: null,
    selectedMinutes: null,
    selectedKeeping: null,
    selectedTime: null,
  };
}
