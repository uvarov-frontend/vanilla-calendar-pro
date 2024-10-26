// import { IOptions } from '@package/types';
// import VanillaCalendar from '@/package/build/vanilla-calendar.min';
// import '@/package/build/vanilla-calendar.min.css';

import type { IOptions } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

import '@src/styles/vanilla-calendar.css';

const config: IOptions = {
  weekStartDay: 1,
  settings: {
    lang: 'ru',
    visibility: {
      weekNumbers: true,
      positionToInput: 'auto',
    },
    selected: {
      weekend: [],
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
});
