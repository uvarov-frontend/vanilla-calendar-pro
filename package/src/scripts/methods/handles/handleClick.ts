import { IVanillaCalendar } from '@src/types';
import handleClickArrow from '@methods/handles/handleClickArrow';
import handleClickWeekNumber from '@methods/handles/handleClickWeekNumber';
import handleClickDay from '@methods/handles/handleClickDay';
import handleClickMonthOrYear from '@methods/handles/handleClickMonthOrYear';

const handleClick = (self: IVanillaCalendar) => {
	(self.HTMLElement as HTMLElement).addEventListener('click', (e) => {
		handleClickArrow(self, e);
		handleClickWeekNumber(self, e);
		handleClickDay(self, e);
		handleClickMonthOrYear(self, e, 'month', {
			header: self.CSSClasses.month,
			item: self.CSSClasses.monthsMonth,
			column: self.CSSClasses.columnMonth,
		});
		handleClickMonthOrYear(self, e, 'year', {
			header: self.CSSClasses.year,
			item: self.CSSClasses.yearsYear,
			column: self.CSSClasses.columnYear,
		});
	});
};

export default handleClick;
