import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

const options: Options = {
  styles: {
    arrowPrev: 'arrow-smile',
  },
};

const calendar = new Calendar('#calendar', options);
calendar.init();

// Add to your css and uncomment:
// button.arrow-smile::before {
//   background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewport='0 0 24 24' style='fill:black;font-size:24px;'><text y='90%' x='0'>😊</text></svg>");
//   transform: rotate(0);
//   transition: transform 0.2s;
// }

// button.arrow-smile:hover::before {
//   transform: rotate(180deg);
// }
