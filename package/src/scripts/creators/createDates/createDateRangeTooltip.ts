import type { VanillaCalendarPro } from '@src/index';

const hideDateRangeTooltip = (tooltipEl: HTMLElement) => {
  tooltipEl.innerHTML = '';
  tooltipEl.dataset.vcDateRangeTooltip = 'hidden';
};

const showDateRangeTooltip = (self: VanillaCalendarPro, tooltipEl: HTMLElement, dateEl: HTMLElement, elementElBCR: DOMRect, tooltipElBCR: DOMRect) => {
  const dateElBCR = dateEl.getBoundingClientRect();
  const tooltipElTop = dateElBCR.top - elementElBCR.top - tooltipElBCR.height - dateElBCR.height / 2;
  const tooltipElLeft = dateElBCR.left - elementElBCR.left - tooltipElBCR.width / 2 - dateElBCR.width / 2;

  tooltipEl.style.left = `${tooltipElLeft}px`;
  tooltipEl.style.top = `${tooltipElTop}px`;

  tooltipEl.innerHTML = self.onCreateDateRangeTooltip(self, dateEl, dateElBCR, elementElBCR, tooltipElBCR);
  tooltipEl.dataset.vcDateRangeTooltip = 'visible';
};

const createDateRangeTooltip = (
  self: VanillaCalendarPro,
  tooltipEl: HTMLElement | null,
  dateEl: HTMLElement | null,
  elementElBCR: DOMRect | null,
  tooltipElBCR: DOMRect | null,
) => {
  if (!tooltipEl) return;
  if (!dateEl || !elementElBCR || !tooltipElBCR) return hideDateRangeTooltip(tooltipEl);
  showDateRangeTooltip(self, tooltipEl, dateEl, elementElBCR, tooltipElBCR);
};

export default createDateRangeTooltip;
