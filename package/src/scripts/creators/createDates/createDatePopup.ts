import type { IPopup } from '@package/types';
import getAvailablePosition from '@scripts/utils/positions/getAvailablePosition';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleDay = (self: VanillaCalendar, date: string, dateInfo: IPopup, datesEl: HTMLElement) => {
  const dateEl = datesEl.querySelector<HTMLElement>(`[data-vc-date="${date}"]`);
  if (!dateEl) return;

  const dateBtnEl = dateEl.querySelector<HTMLButtonElement>(`[data-vc-date-btn]`) as HTMLButtonElement;
  if (dateInfo?.modifier) dateBtnEl.classList.add(...dateInfo.modifier.trim().split(' '));
  if (dateInfo?.html) {
    const datePopup = document.createElement('div');
    datePopup.className = self.styles.datePopup;
    datePopup.dataset.vcDatePopup = '';
    datePopup.innerHTML = self.sanitizerHTML(dateInfo.html);
    dateBtnEl.ariaExpanded = 'true';
    dateBtnEl.ariaLabel = `${dateBtnEl.ariaLabel}, ${datePopup?.textContent?.replace(/^\s+|\s+(?=\s)|\s+$/g, '').replace(/&nbsp;/g, ' ')}`;
    dateEl.appendChild(datePopup);

    // wait for the element to be rendered in DOM before calculating its position
    setTimeout(() => {
      if (datePopup) {
        const { canShow } = getAvailablePosition(dateEl, datePopup);
        const extraTopPadding = 5;
        let top = dateEl.offsetHeight;
        let left = 0;
        if (!canShow.bottom) {
          top = -datePopup.offsetHeight - extraTopPadding;
        }
        if (canShow.left && !canShow.right) {
          left = dateEl.offsetWidth - datePopup.offsetWidth / 2;
        }
        if (!canShow.left && canShow.right) {
          left = datePopup.offsetWidth / 2;
        }

        Object.assign(datePopup.style, { left: `${left}px`, top: `${top}px` });
      }
    });
  }
};

const createDatePopup = (self: VanillaCalendar, datesEl: HTMLElement) => {
  if (!self.popups) return;
  Object.entries(self.popups)?.forEach(([date, dateInfo]) => handleDay(self, date, dateInfo, datesEl));
};

export default createDatePopup;
