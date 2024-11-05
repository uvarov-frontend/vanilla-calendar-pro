import type { VanillaCalendarPro } from '@src/index';

const hideDateRangeTooltip = (tooltipEl: HTMLElement) => {
  tooltipEl.dataset.vcDateRangeTooltip = 'hidden';
  tooltipEl.textContent = null;
};

const showDateRangeTooltip = (self: VanillaCalendarPro, tooltipEl: HTMLElement, dateEl: HTMLElement, elementElBCR: DOMRect) => {
  const dateElBCR = dateEl.getBoundingClientRect();
  const tooltipElTop = dateElBCR.bottom - elementElBCR.top - dateElBCR.height;
  const tooltipElLeft = dateElBCR.left - elementElBCR.left + dateElBCR.width / 2;

  tooltipEl.style.left = `${tooltipElLeft}px`;
  tooltipEl.style.top = `${tooltipElTop}px`;

  tooltipEl.innerHTML = self.sanitizerHTML(self.onCreateDateRangeTooltip(self, dateEl, tooltipEl, dateElBCR, elementElBCR));
  tooltipEl.dataset.vcDateRangeTooltip = 'visible';
};

const createDateRangeTooltip = (self: VanillaCalendarPro, tooltipEl: HTMLElement | null, dateEl: HTMLElement | null, elementElBCR: DOMRect | null) => {
  if (!tooltipEl) return;
  if (!dateEl || !elementElBCR) return hideDateRangeTooltip(tooltipEl);
  showDateRangeTooltip(self, tooltipEl, dateEl, elementElBCR);
};

export default createDateRangeTooltip;
