// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import type { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';

const config: IOptions = {
  // weekStartDay: 0,
  // type: 'multiple',
  selectionDatesMode: 'multiple-ranged',
  selectionTimeMode: 12,
  selectedMonth: 5,
  selectedYear: 2024,
  timeMinHour: 2,
  timeMaxHour: 20,
  timeMinMinute: 10,
  timeMaxMinute: 20,
  locale: 'ru',
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
  popups: {
    // '2024-10-28': {
    //   modifier: 'bg-red',
    //   html: 'Собрание в 9:00',
    // },
    // '2024-10-13': {
    //   modifier: 'bg-orange text-bold',
    //   html: 'Собрание в 18:00',
    // },
    // '2024-10-17': {
    //   modifier: 'bg-orange',
    //   html: `<div>
    //     <u><b>13:00</b></u>
    //     <p style="margin: 5px 0 0;">Самолет в Москву</p>
    //   </div>`,
    // },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendar('#calendar', config);
  calendar.init();
  console.log(calendar);
});
