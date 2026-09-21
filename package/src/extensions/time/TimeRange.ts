import escapeHTML from '@scripts/utils/escapeHTML';

const TimeRange = (name: string, CSSClass: string, labels: { [key: string]: string }, min: number, max: number, step: number, value: string) => `
  <div class="${escapeHTML(CSSClass)}" data-vc-time-range="${name}">
    <input type="range" min="${escapeHTML(min)}" max="${escapeHTML(max)}" step="${escapeHTML(step)}" aria-label="${escapeHTML(labels[`range${name.charAt(0).toUpperCase() + name.slice(1)}`])}" value="${escapeHTML(value)}">
  </div>
`;

export default TimeRange;
