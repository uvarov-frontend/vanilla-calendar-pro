import type { VanillaCalendarPro } from '@src/index';

const createDateRangeTooltip = (self: VanillaCalendarPro, dateEl: HTMLElement | null) => {
  const tooltipEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc="date-range-tooltip"]');
  if (!tooltipEl) return;

  if (!dateEl) {
    tooltipEl.innerHTML = '';
    tooltipEl.style.opacity = '0';
    return;
  }

  // tooltipEl.innerHTML = `<div style="display: flex;flex-direction: column;align-items: flex-start;"><div>Start: <b>${dateEl.dataset.vcDate}</b>,</div><div>End: <b>${dateEl.dataset.vcDate}</b></div></div>`;
  tooltipEl.style.opacity = '100%';
  tooltipEl.innerHTML = `<div>9 days</div>`;

  const elementBCR = self.private.mainElement.getBoundingClientRect();
  const tooltipBCR = tooltipEl.getBoundingClientRect();
  const dateBCR = dateEl.getBoundingClientRect();
  let top = dateBCR.top;
  let left = dateBCR.left;
  top -= elementBCR.top;
  left -= elementBCR.left;
  top -= tooltipBCR.height;
  left -= tooltipBCR.width / 2;
  left += dateBCR.width / 2;

  console.log('elementBCR: ', elementBCR);
  console.log('tooltipBCR: ', tooltipBCR);
  console.log('dateBCR: ', dateBCR);

  tooltipEl.style.top = `${top}px`;
  tooltipEl.style.left = `${left}px`;
};

export default createDateRangeTooltip;
