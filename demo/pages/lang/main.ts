// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import type { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';

const config: IOptions = {
  // weekStartDay: 0,
  type: 'multiple',
  settings: {
    lang: 'ru',
    visibility: {
      weekNumbers: true,
      positionToInput: 'auto',
    },
    selection: {
      day: 'multiple-ranged',
      time: true,
    },
    range: {
      min: '2024-05-01',
      max: '2024-07-30',
      // disablePast: true,
      // edgesOnly: false,
      disabled: [
        '2024-06-01',
        '2024-06-02',
        '2024-06-07',
        '2024-06-08',
        '2024-06-09',
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
    },
    selected: {
      month: 5,
      year: 2024,
    },
  },
  locale: {
    ariaLabels: {
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
    },
  },
  popups: {
    '2024-10-28': {
      modifier: 'bg-red',
      html: 'Собрание в 9:00',
    },
    '2024-10-13': {
      modifier: 'bg-orange text-bold',
      html: 'Собрание в 18:00',
    },
    '2024-10-17': {
      modifier: 'bg-orange',
      html: `<div>
        <u><b>13:00</b></u>
        <p style="margin: 5px 0 0;">Самолет в Москву</p>
      </div>`,
    },
  },
  actions: {
    changeToInput(e, self) {
      if (!self.selectedDates || !self.HTMLInputElement) return;
      if (self.selectedDates[0]) {
        self.HTMLInputElement.innerHTML = self.selectedDates[0];
      } else {
        self.HTMLInputElement.textContent = '';
      }
      self.hide();
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const calendar = new VanillaCalendar('#calendar', config);
  calendar.init();
  console.log(calendar);
});
