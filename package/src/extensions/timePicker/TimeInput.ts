const TimeInput = (name: string, CSSClass: string, labels: { [key: string]: string }, value: string, range: boolean) => `
  <div class="${CSSClass}" data-vc-time-input="${name}">
    <input type="text" name="${name}" maxlength="2" aria-label="${labels[`input${name.charAt(0).toUpperCase() + name.slice(1)}`]}" value="${value}" ${range ? 'disabled' : ''}>
  </div>
`;

export default TimeInput;
