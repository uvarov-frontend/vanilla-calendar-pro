import type { Calendar } from '@src/index';

const createDateRangeTooltip = (self: Calendar, tooltipEl: HTMLElement | null, dateEl: HTMLElement | null) => {
  if (!tooltipEl) return;

  if (!dateEl) {
    tooltipEl.dataset.vcDateRangeTooltip = 'hidden';
    tooltipEl.textContent = '';
    return;
  }

  const mainBCR = self.context.mainElement.getBoundingClientRect();
  const dateElBCR = dateEl.getBoundingClientRect();

  tooltipEl.style.left = `${dateElBCR.left - mainBCR.left + dateElBCR.width / 2}px`;
  tooltipEl.style.top = `${dateElBCR.bottom - mainBCR.top - dateElBCR.height}px`;
  tooltipEl.dataset.vcDateRangeTooltip = 'visible';
  tooltipEl.innerHTML = self.sanitizerHTML(self.onCreateDateRangeTooltip(self, dateEl, tooltipEl, dateElBCR, mainBCR));
};

export default createDateRangeTooltip;
