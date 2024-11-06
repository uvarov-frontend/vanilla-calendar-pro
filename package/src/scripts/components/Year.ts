import type { Calendar } from '@src/index';

const Year = (self: Calendar) => `<button type="button" class="${self.styles.year}" data-vc="year"></button>`;

export default Year;
