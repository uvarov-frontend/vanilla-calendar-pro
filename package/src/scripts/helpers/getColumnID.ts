import { IVanillaCalendar } from '../../types';

const getColumnID = (self: IVanillaCalendar, columnClass: string, personalClass: string, id: number, dataAttr: string) => {
	const columnEls = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.column}`) as NodeListOf<HTMLElement>;
	const indexColumn = [...columnEls].findIndex((column) => column.classList.contains(columnClass));
	const currentValue = Number((columnEls[indexColumn].querySelector(`.${personalClass}`) as HTMLElement).getAttribute(dataAttr));

	if (self.currentType === 'month' && indexColumn >= 0) return id - indexColumn;
	if (self.currentType === 'year' && self.selectedYear !== currentValue) return id - 1;

	return id;
};

export default getColumnID;
