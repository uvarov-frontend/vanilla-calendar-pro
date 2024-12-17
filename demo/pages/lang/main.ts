import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

const options: Options = {
  type: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  disableDatesGaps: true,
  disableDatesPast: true,
  dateMin: '2021-02-01',
  dateMax: '2025-11-30',
  displayDatesOutside: false,
  selectionTimeMode: 12,
  selectedMonth: 9,
  selectedYear: 2025,
  timeMinHour: 2,
  timeMaxHour: 20,
  timeMinMinute: 10,
  timeMaxMinute: 20,
  locale: 'ru',
  disableWeekdays: [],
  disableDates: [
    '2024-06-01',
    '2024-06-02',
    '2024-06-05',
    '2024-06-06',
    '2024-06-07',
    '2024-06-10',
    '2024-06-14',
    '2024-06-15',
    '2024-06-16',
    '2024-06-20',
    '2024-06-21',
    '2024-06-22',
    '2024-06-23',
    '2024-06-28',
    '2024-06-29',
    '2024-06-30',
  ],
  labels: {
    application: 'Календарь',
    navigation: 'Навигация календаря',
    arrowNext: {
      month: 'Следующий месяц',
      year: 'Следующий список лет',
    },
    arrowPrev: {
      month: 'Предыдущий месяц',
      year: 'Предыдущий список лет',
    },
    month: 'Выбор месяца, текущий выбранный месяц:',
    months: 'Список месяцев',
    year: 'Выбор года, текущий выбранный год:',
    years: 'Список лет',
    week: 'Дни недели',
    weekNumber: 'Номера недель в году',
    dates: 'Даты текущего месяца',
    selectingTime: 'Выбора времени',
    inputHour: 'Часы',
    inputMinute: 'Минуты',
    rangeHour: 'Ползунок для выбора часов',
    rangeMinute: 'Ползунок для выбора минут',
    btnKeeping: 'Переключить AM/PM, текущее положение:',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new Calendar('#calendar');
  calendar.init();

  const btnSetEl = document.querySelector('#set-options');
  btnSetEl?.addEventListener('click', () => {
    calendar.set(options, { dates: false });
  });
});
