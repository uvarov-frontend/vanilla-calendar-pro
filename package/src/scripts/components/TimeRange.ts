const TimeRange = (name: string, CSSClass: string, labels: { [key: string]: string }, min: number, max: number, step: number, value: string) => `
  <div class="${CSSClass}" data-vc-time-range="${name}">
    <input type="range" min="${min}" max="${max}" step="${step}" aria-label="${labels[`range${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}">
  </div>
`;

export default TimeRange;
