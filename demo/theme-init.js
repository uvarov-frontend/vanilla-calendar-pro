// Inlined into the head by devSiteThemePlugin, before stylesheets and module scripts.
(() => {
  let mode = 'system';
  try {
    const saved = localStorage.getItem('vcp-workbench-theme');
    if (saved === 'dark' || saved === 'light') mode = saved;
  } catch {
    // System preference still works when storage is unavailable.
  }
  const root = document.documentElement;
  const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.themeMode = mode;
  root.dataset.theme = dark ? 'dark' : 'light';
  root.classList.toggle('dark', dark);
})();
