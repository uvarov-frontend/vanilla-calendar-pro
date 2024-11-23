import getAvailablePosition from '@scripts/utils/positions/getAvailablePosition';
import type { Calendar, Popup } from '@src/index';

const handleDay = (self: Calendar, date: string, dateInfo: Popup, datesEl: HTMLElement) => {
  const dateEl = datesEl.querySelector<HTMLElement>(`[data-vc-date="${date}"]`);
  const dateBtnEl = dateEl?.querySelector<HTMLButtonElement>(`[data-vc-date-btn]`);
  if (!dateEl || !dateBtnEl) return;

  if (dateInfo?.modifier) dateBtnEl.classList.add(...dateInfo.modifier.trim().split(' '));
  if (!dateInfo?.html) return;

  const datePopup = document.createElement('div');
  datePopup.className = self.styles.datePopup;
  datePopup.dataset.vcDatePopup = '';
  datePopup.innerHTML = self.sanitizerHTML(dateInfo.html);
  dateBtnEl.ariaExpanded = 'true';
  dateBtnEl.ariaLabel = `${dateBtnEl.ariaLabel}, ${datePopup?.textContent?.replace(/^\s+|\s+(?=\s)|\s+$/g, '').replace(/&nbsp;/g, ' ')}`;
  dateEl.appendChild(datePopup);

  // Use requestAnimationFrame to wait until the next repaint to calculate position
  requestAnimationFrame(() => {
    if (!datePopup) return;
    const { canShow } = getAvailablePosition(dateEl, datePopup);
    const top = canShow.bottom ? dateEl.offsetHeight : -datePopup.offsetHeight;
    const left =
      canShow.left && !canShow.right ? dateEl.offsetWidth - datePopup.offsetWidth / 2 : !canShow.left && canShow.right ? datePopup.offsetWidth / 2 : 0;
    Object.assign(datePopup.style, { left: `${left}px`, top: `${top}px` });
  });
};

const createDatePopup = (self: Calendar, datesEl: HTMLElement) => {
  if (!self.popups) return;
  Object.entries(self.popups)?.forEach(([date, dateInfo]) => handleDay(self, date, dateInfo, datesEl));
};

export default createDatePopup;
