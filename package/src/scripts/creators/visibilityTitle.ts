import type VanillaCalendar from '@src/vanilla-calendar';

const visibilityHandler = (self: VanillaCalendar, el: HTMLButtonElement, index: number, initDate: Date, type: 'month' | 'year') => {
  const yearID = new Date(initDate.setFullYear(self.selectedYear as number, (self.selectedMonth as number) + index)).getFullYear();
  const monthID = new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth();
  const monthLabel = self.locale.months[monthID];

  const value = {
    month: { id: monthID, label: monthLabel },
    year: { id: yearID, label: yearID },
  };

  el.innerText = String(value[type].label);
  el.dataset[`vc${type.charAt(0).toUpperCase() + type.slice(1)}`] = String(value[type].id);

  const isDisabled = self.settings.selection[type] === false || self.settings.selection[type] === 'only-arrows';
  if (isDisabled) el.tabIndex = -1;
  el.disabled = isDisabled;
};

const visibilityTitle = (self: VanillaCalendar) => {
  const monthEls = self.HTMLElement.querySelectorAll<HTMLButtonElement>('[data-vc="month"]');
  const yearEls = self.HTMLElement.querySelectorAll<HTMLButtonElement>('[data-vc="year"]');
  const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

  [monthEls, yearEls].forEach((els) => els?.forEach((el, index) => visibilityHandler(self, el, index, initDate, el.dataset.vc as 'month' | 'year')));
};

export default visibilityTitle;
