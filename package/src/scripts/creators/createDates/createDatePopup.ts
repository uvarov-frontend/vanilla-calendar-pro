import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import getAvailablePosition from '@scripts/utils/positions/getAvailablePosition';
import type { Calendar, FormatDateString, Popup } from '@src/index';

type Pending = { frame: number; elements: Array<{ dateEl: HTMLElement; popup: HTMLElement }> };
const pending = new WeakMap<Calendar, Pending>();

export const cleanupDatePopups = (self: Calendar) => {
  const task = pending.get(self);
  if (task) cancelAnimationFrame(task.frame);
  pending.delete(self);
};

const positionPopup = (self: Calendar, dateEl: HTMLElement, popup: HTMLElement) => {
  let task = pending.get(self);
  if (!task) {
    task = { frame: 0, elements: [] };
    pending.set(self, task);
    const elements = task.elements;
    task.frame = requestAnimationFrame(() => {
      pending.delete(self);
      // Measure every popup before writing styles, including across months.
      const positions = elements
        .filter(({ dateEl, popup }) => !self.context.isDestroyed && popup.isConnected && self.context.mainElement.contains(dateEl))
        .map(({ dateEl, popup }) => {
          const { canShow } = getAvailablePosition(dateEl, popup);
          return {
            popup,
            top: canShow.bottom ? dateEl.offsetHeight : -popup.offsetHeight,
            left: canShow.left && !canShow.right ? dateEl.offsetWidth - popup.offsetWidth / 2 : !canShow.left && canShow.right ? popup.offsetWidth / 2 : 0,
          };
        });
      positions.forEach(({ popup, left, top }) => Object.assign(popup.style, { left: `${left}px`, top: `${top}px` }));
    });
  }
  task.elements.push({ dateEl, popup });
};

const handleDay = (self: Calendar, dateEl: HTMLElement | undefined, dateInfo: Popup) => {
  const dateBtnEl = dateEl?.querySelector<HTMLButtonElement>('[data-vc-date-btn]');
  if (!dateEl || !dateBtnEl) return;
  if (dateInfo?.modifier) dateBtnEl.classList.add(...dateInfo.modifier.trim().split(' '));
  if (!dateInfo?.html) return;

  const popup = document.createElement('div');
  popup.className = self.styles.datePopup;
  popup.dataset.vcDatePopup = '';
  popup.innerHTML = self.sanitizerHTML(dateInfo.html);
  dateBtnEl.ariaLabel = `${dateBtnEl.ariaLabel}, ${popup.textContent?.replace(/^\s+|\s+(?=\s)|\s+$/g, '').replace(/&nbsp;/g, ' ')}`;
  dateEl.appendChild(popup);
  positionPopup(self, dateEl, popup);
};

const createDatePopup = (self: Calendar, datesEl: HTMLElement) => {
  const popups = self.popups && Object.entries(self.popups);
  if (!popups?.length) return;
  const visible = new Map<FormatDateString, HTMLElement>();
  datesEl.querySelectorAll<HTMLElement>('[data-vc-date]').forEach((el) => {
    const date = el.dataset.vcDate as FormatDateString;
    if (!visible.has(date)) visible.set(date, el);
  });
  const times = Array.from(visible.keys(), (date) => +getDate(date)).filter(Number.isFinite);
  if (!times.length) return;
  const within = { start: new Date(Math.min(...times)), end: new Date(Math.max(...times)) };
  popups.forEach(([dateKey, dateInfo]) => {
    parseDates([dateKey], within).forEach((date) => handleDay(self, visible.get(date), dateInfo));
  });
};

export default createDatePopup;
