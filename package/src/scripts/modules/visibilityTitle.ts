import type VanillaCalendar from '@src/vanilla-calendar';

const visibilityHandler = (self: VanillaCalendar, el: HTMLButtonElement, index: number, initDate: Date, type: 'month' | 'year') => {
  const isDisabled = self.settings.selection[type] === false || self.settings.selection[type] === 'only-arrows';
  const value = {
    month: self.locale.months[new Date(initDate.setMonth((self.selectedMonth as number) + index)).getMonth()],
    year: new Date(initDate.setFullYear(self.selectedYear as number, (self.selectedMonth as number) + index)).getFullYear(),
  };
  if (isDisabled) el.tabIndex = -1;
  el.disabled = isDisabled;
  el.innerText = String(value[type]);
};

const visibilityTitle = (self: VanillaCalendar) => {
  const monthEls = self.HTMLElement?.querySelectorAll<HTMLButtonElement>('[data-vc="month"]');
  const yearEls = self.HTMLElement?.querySelectorAll<HTMLButtonElement>('[data-vc="year"]');
  const initDate = new Date(self.selectedYear as number, self.selectedMonth as number, 1);

  [monthEls, yearEls].forEach((els) => els?.forEach((el, index) => visibilityHandler(self, el, index, initDate, el.dataset.vc as 'month' | 'year')));
};

export default visibilityTitle;
