import { IVanillaCalendar } from '@src/types';

const visibilityTitle = (self: IVanillaCalendar, selector: string, selectedKey: 'month' | 'year') => {
	const elements: NodeListOf<HTMLElement> | undefined = self.HTMLElement?.querySelectorAll(selector);
	const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

	if (!elements?.[0]) return;

	elements.forEach((element, index: number) => {
		const month = new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth();
		const year = new Date(initDate.setFullYear((self.selectedYear as number), (self.selectedMonth as number) + index)).getFullYear();
		const isSelectionDisabled = self.settings.selection[selectedKey] === false || self.settings.selection[selectedKey] === 'only-arrows';

		element.tabIndex = isSelectionDisabled ? -1 : 0;
		element.classList.toggle(self.CSSClasses[`${selectedKey}Disabled`], isSelectionDisabled);
		element.setAttribute(`data-calendar-selected-${selectedKey}`, String(selectedKey === 'month' ? month : year));
		element.innerText = selectedKey === 'month' ? self.locale.months[month] : String(year);
	});
};

export default visibilityTitle;
