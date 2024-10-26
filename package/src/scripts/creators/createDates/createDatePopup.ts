import type { IPopup } from '@package/types';
import getAvailablePosition from '@scripts/helpers/positions/getAvailablePosition';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleDay = (self: VanillaCalendar, date: string, dateInfo: IPopup, datesEl: HTMLElement) => {
  const dateEl = datesEl.querySelector<HTMLElement>(`[data-vc-date="${date}"]`);
  if (!dateEl) return;

  const dateBtnEl = dateEl.querySelector<HTMLButtonElement>(`[data-vc-date-btn]`) as HTMLButtonElement;
  if (dateInfo?.modifier) dateBtnEl.classList.add(...dateInfo.modifier.trim().split(' '));
  if (dateInfo?.html) {
    const datePopup = document.createElement('div');
    datePopup.className = self.CSSClasses.datePopup;
    datePopup.dataset.vcDatePopup = '';
    datePopup.innerHTML = self.sanitizer(dateInfo.html);
    datePopup.ariaLabel = `${datePopup?.textContent?.replace(/^\s+|\s+(?=\s)|\s+$/g, '').replace(/&nbsp;/g, ' ')}`;
    datePopup.role = 'tooltip';
    datePopup.tabIndex = -1;
    dateBtnEl.ariaExpanded = 'true';
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

  const handleFocusBlur = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const datePopup = target.closest('[data-vc-date]')?.querySelector<HTMLElement>('[data-vc-date-popup]');

    if (datePopup && (target.matches('[data-vc-date-btn]') || target.matches('[data-vc-date-popup]'))) {
      datePopup.tabIndex = event.type === 'focus' ? 0 : -1;
    }
  };

  datesEl.addEventListener('focus', handleFocusBlur, true);
  datesEl.addEventListener('blur', handleFocusBlur, true);

  Object.entries(self.popups)?.forEach(([date, dateInfo]) => handleDay(self, date, dateInfo, datesEl));

  return () => {
    datesEl.removeEventListener('focus', handleFocusBlur, true);
    datesEl.removeEventListener('blur', handleFocusBlur, true);
  };
};

export default createDatePopup;
