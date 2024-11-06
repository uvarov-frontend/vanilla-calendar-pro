import type { Calendar } from '@src/index';

const Month = (self: Calendar) => `<button type="button" class="${self.styles.month}" data-vc="month"></button>`;

export default Month;
