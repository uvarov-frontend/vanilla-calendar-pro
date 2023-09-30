import { IVanillaCalendar } from '../../types';

const getColumnID = (self: IVanillaCalendar, columnClass: string, personalClass: string, id: number, dataAttr: string) => {
	const columnEls = (self.HTMLElement as HTMLElement).querySelectorAll(`.${self.CSSClasses.column}`) as NodeListOf<HTMLElement>;
	const firstColumnID = Number((columnEls[0].querySelector(`.${personalClass}`) as HTMLElement).getAttribute(dataAttr));
	const lastColumnID = Number((columnEls[columnEls.length - 1].querySelector(`.${personalClass}`) as HTMLElement).getAttribute(dataAttr));
	const indexColumn = [...columnEls].findIndex((column) => column.classList.contains(columnClass));

	if (firstColumnID === lastColumnID || indexColumn < 0) {
		return id;
	}

	if (firstColumnID < lastColumnID || (self.currentType !== 'year' && firstColumnID > lastColumnID)) {
		return id - indexColumn;
	}

	return id;
};

export default getColumnID;
