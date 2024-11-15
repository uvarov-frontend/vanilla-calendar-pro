import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  locale: {
    months: {
      short: ['Vör', 'Thors', 'Skadi', 'Freya', 'Baldur', 'Njord', 'Tyr', 'Frigg', 'Odin', 'Loki', 'Hel', 'Idunn'],
      long: [
        'Vörmánuðr',
        'Thorsmánuðr',
        'Skadimánuðr',
        'Freymánuðr',
        'Baldurmánuðr',
        'Njordmánuðr',
        'Tyrmánuðr',
        'Friggmánuðr',
        'Odinmánuðr',
        'Lokimánuðr',
        'Helmánuðr',
        'Idunnmánuðr',
      ],
    },
    weekdays: {
      short: ['Sunna', 'Mani', 'Tiw', 'Woden', 'Thor', 'Frigg', 'Saturn'],
      long: ['Sunnandæg', 'Manadæg', 'Tiwesdæg', 'Wodensdæg', 'Thorsdæg', 'Friggsdæg', 'Saturnsdag'],
    },
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();
