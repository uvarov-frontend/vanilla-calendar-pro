import setMonthOrYearModifier from '@scripts/creators/setMonthOrYearModifier';
import type { Calendar } from '@src/index';

const createPickerCell = (
  self: Calendar,
  type: 'month' | 'year',
  template: HTMLButtonElement,
  selected: number,
  disabled: boolean,
  id: number,
  title: string,
  label: string,
) => {
  const group = type === 'month' ? 'months' : 'years';
  const wrapper = document.createElement('div');
  wrapper.className = self.styles[`${group}Cell`];
  wrapper.setAttribute(`data-vc-${group}`, 'cell');
  wrapper.role = 'gridcell';
  const button = template.cloneNode(false) as HTMLButtonElement;
  button.className = self.styles[type === 'month' ? 'monthsMonth' : 'yearsYear'];
  button.innerText = title;
  button.ariaLabel = label;
  button.setAttribute(`data-vc-${group}-${type}`, String(id));
  if (disabled) button.ariaDisabled = 'true';
  if (disabled) button.tabIndex = -1;
  button.disabled = disabled;
  wrapper.appendChild(button);
  setMonthOrYearModifier(self, button, type, selected === id, false);
  return wrapper;
};
export default createPickerCell;
