import state from '@scripts/handles/handleSelectDateRange/state';
import getDateString from '@scripts/utils/getDateString';

export const addHoverEffect = (date: Date, firstDateEl: HTMLElement | null, lastDateEl: HTMLElement | null) => {
  if (!state.self?.private?.selectedDates[0]) return;

  const formattedDate = getDateString(date);
  if (state.self.private.disableDates?.includes(formattedDate)) return;

  state.self.private.mainElement.querySelectorAll<HTMLElement>(`[data-vc-date="${formattedDate}"]`).forEach((d) => (d.dataset.vcDateHover = ''));
  if (firstDateEl) firstDateEl.dataset.vcDateHoverFirst = '';
  if (lastDateEl) lastDateEl.dataset.vcDateHoverLast = '';
};

export const removeHoverEffect = () => {
  if (!state.self?.private?.mainElement) return;
  const dateEls = state.self.private.mainElement.querySelectorAll<HTMLElement>('[data-vc-date-hover], [data-vc-date-hover-first], [data-vc-date-hover-last]');
  dateEls.forEach((d) => {
    d.removeAttribute('data-vc-date-hover');
    d.removeAttribute('data-vc-date-hover-first');
    d.removeAttribute('data-vc-date-hover-last');
  });
};
