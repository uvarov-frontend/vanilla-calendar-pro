import type { Calendar } from '@src/index';

// Share the button template across all weekday headers in this render.
const weekday = (self: Calendar) => {
  if (!self.onClickWeekDay) return;
  const template = document.createElement('button');
  template.type = 'button';
  template.className = self.styles.weekDayBtn;
  template.dataset.vcWeekDayBtn = '';
  return (cell: HTMLElement, title: string, label: string) => {
    const button = template.cloneNode(false) as HTMLButtonElement;
    button.innerText = title;
    button.ariaLabel = label;
    cell.appendChild(button);
  };
};
export default weekday;
