import { type Options, VanillaCalendarPro } from '@src/index';

import '@src/styles/vanilla-calendar-pro.css';

// const options: Options = {
//   viewType: 'multiple',
//   selectionDatesMode: 'multiple-ranged',
//   selectionTimeMode: 12,
//   selectedMonth: 5,
//   selectedYear: 2024,
//   timeMinHour: 2,
//   timeMaxHour: 20,
//   timeMinMinute: 10,
//   timeMaxMinute: 20,
//   locale: 'ru',
//   labels: {
//     application: 'Календарь',
//     navigation: 'Навигация календаря',
//     arrowNext: {
//       month: 'Следующий месяц',
//       year: 'Следующий список лет',
//     },
//     arrowPrev: {
//       month: 'Предыдущий месяц',
//       year: 'Предыдущий список лет',
//     },
//     month: 'Выбор месяца, текущий выбранный месяц:',
//     months: 'Список месяцев',
//     year: 'Выбор года, текущий выбранный год:',
//     years: 'Список лет',
//     week: 'Дни недели',
//     weekNumber: 'Номера недель в году',
//     dates: 'Даты текущего месяца',
//     selectingTime: 'Выбора времени',
//     inputHour: 'Часы',
//     inputMinute: 'Минуты',
//     rangeHour: 'Ползунок для выбора часов',
//     rangeMinute: 'Ползунок для выбора минут',
//     btnKeeping: 'Переключить AM/PM, текущее положение:',
//   },
// };
const options: Options = {
  locale: 'ru',
  selectionTimeMode: 24,
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendarPro('#calendar');
  calendar.init();

  const btnSetEl = document.querySelector('#set-options');
  btnSetEl?.addEventListener('click', () => {
    calendar.set(options, { dates: false });
    console.log(calendar);
  });
});
