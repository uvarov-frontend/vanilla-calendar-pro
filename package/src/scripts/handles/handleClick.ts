import VanillaCalendar from '@scripts/vanilla-calendar';
import handleClickArrow from '@scripts/handles/handleClickArrow';
import handleClickWeekNumber from '@scripts/handles/handleClickWeekNumber';
import handleClickDay from '@scripts/handles/handleClickDay';
import handleClickMonthOrYear from '@scripts/handles/handleClickMonthOrYear';

const handleClick = (self: VanillaCalendar) => {
	self.HTMLElement.addEventListener('click', (e) => {
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
