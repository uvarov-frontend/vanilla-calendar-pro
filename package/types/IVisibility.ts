export interface IVisibility {
  theme: 'light' | 'dark' | 'system' | string;
  themeDetect: string | false;
  weekNumbers: boolean;
  today: boolean;
  disabled: boolean;
  daysOutside: boolean;
  positionToInput: 'auto' | 'center' | 'left' | 'right' | ['bottom' | 'top', 'center' | 'left' | 'right'];
}
