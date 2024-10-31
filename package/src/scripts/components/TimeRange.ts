const TimeRange = (name: string, CSSClass: string, labels: { [key: string]: string }, min: number, max: number, step: number, value: string) => `
  <label class="${CSSClass}" data-vc-time-range="${name}">
    <input type="range" name="${name}" min="${min}" max="${max}" step="${step}" aria-label="${labels[`range${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}">
  </label>
`;

export default TimeRange;
