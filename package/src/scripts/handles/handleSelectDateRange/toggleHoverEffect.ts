import state from '@scripts/handles/handleSelectDateRange/state';
import getDateString from '@scripts/utils/getDateString';

export const addHoverEffect = (date: Date, firstDateEls: NodeListOf<HTMLElement>, lastDateEls: NodeListOf<HTMLElement>) => {
  if (!state.self?.context?.selectedDates[0]) return;

  const formattedDate = getDateString(date);
  if (state.self.context.disableDates?.includes(formattedDate)) return;

  state.self.context.mainElement.querySelectorAll<HTMLElement>(`[data-vc-date="${formattedDate}"]`).forEach((d) => (d.dataset.vcDateHover = ''));
  firstDateEls.forEach((d) => (d.dataset.vcDateHover = 'first'));
  lastDateEls.forEach((d) => {
    if (d.dataset.vcDateHover === 'first') {
      d.dataset.vcDateHover = 'first-and-last';
    } else {
      d.dataset.vcDateHover = 'last';
    }
  });
};

export const removeHoverEffect = () => {
  if (!state.self?.context?.mainElement) return;
  const dateEls = state.self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc-date-hover]');
  dateEls.forEach((d) => d.removeAttribute('data-vc-date-hover'));
};
