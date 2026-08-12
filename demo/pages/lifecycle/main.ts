import { Calendar, type Options } from '@src/index';

import '@src/styles/index.css';

document.addEventListener('DOMContentLoaded', () => {
  let calendar: Calendar | undefined;
  const logEl = document.getElementById('log') as HTMLPreElement;

  const log = (message: string) => {
    logEl.textContent += `${message}\n`;
    logEl.dataset.vcLastMessage = message;
  };

  const options: Options = {};

  document.getElementById('btn-init')?.addEventListener('click', () => {
    if (!calendar) calendar = new Calendar('#calendar', options);
    try {
      calendar.init();
      log('init() OK');
    } catch (e) {
      log(`init() threw: ${(e as Error).message}`);
    }
  });

  document.getElementById('btn-destroy')?.addEventListener('click', () => {
    if (!calendar) {
      log('destroy() skipped: no instance yet');
      return;
    }
    try {
      calendar.destroy();
      log('destroy() OK');
    } catch (e) {
      log(`destroy() threw: ${(e as Error).message}`);
    }
  });
});
