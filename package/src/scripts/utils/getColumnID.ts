import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const getColumnID = (self: Calendar, type: string) => getExtensions(self).months?.column(self, type) ?? { currentValue: null, columnID: 0 };
export default getColumnID;
