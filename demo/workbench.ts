import logo from './assets/logo.svg?raw';

import { scenarios } from './scenarios';

const current =
  scenarios.find(({ slug }) => (slug ? location.pathname.startsWith(`/pages/${slug}/`) : !location.pathname.startsWith('/pages/'))) ?? scenarios[0];
const sourceKey = current.slug ? `./pages/${current.slug}/main.ts` : './main.ts';
const sourcePath = `demo/${sourceKey.slice(2)}`;
const sources = import.meta.glob<string>(['./main.ts', './pages/*/main.ts'], { query: '?raw', import: 'default' });
const icons = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
  code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18"/>',
  preview: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18m-12 0v11"/>',
  reset: '<path d="M3 10a9 9 0 1 1 2 8M3 4v6h6"/>',
  system: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  theme: '<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4"/>',
};
const icon = (name: keyof typeof icons) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const sidebar = document.querySelector<HTMLElement>('#dev-sidebar')!;
const backdrop = document.querySelector<HTMLButtonElement>('#dev-backdrop')!;
const groups = [...new Set(scenarios.map(({ group }) => group))];
sidebar.innerHTML = `
  <div class="dev-brand-row"><a class="dev-brand" href="/" aria-label="Vanilla Calendar Pro playground">${logo.replace('<svg ', '<svg aria-hidden="true" focusable="false" ')}</a><button id="dev-menu-close" class="dev-icon-button" type="button" aria-label="Close navigation">${icon('close')}</button></div>
  <div class="dev-search-wrap"><label class="dev-search">${icon('search')}<input id="dev-search" type="search" placeholder="Find a scenario…" aria-label="Search scenarios" autocomplete="off"/><kbd>/</kbd></label></div>
  <nav class="dev-nav" aria-label="Scenarios">${groups
    .map(
      (group) =>
        `<section class="dev-nav-group"><h2>${group}</h2>${scenarios
          .filter((scenario) => scenario.group === group)
          .map(
            (scenario) =>
              `<a class="dev-nav-link" href="${scenario.slug ? `/pages/${scenario.slug}/` : '/'}" data-scenario="${scenario.slug}" ${scenario === current ? 'aria-current="page"' : ''}>${scenario.title}</a>`,
          )
          .join('')}</section>`,
    )
    .join('')}<p class="dev-search-empty" hidden>No scenarios found.<br/>Try “input”, “range”, or “swipe”.</p></nav>
  <footer class="dev-sidebar-footer"><div><span>${scenarios.length} scenarios</span><a href="https://github.com/uvarov-frontend/vanilla-calendar-pro" target="_blank" rel="noopener noreferrer" aria-label="GitHub repository (opens in a new tab)">GitHub ↗</a></div></footer>`;

document.querySelector('#dev-topbar')!.innerHTML =
  `<div class="dev-breadcrumb"><button id="dev-menu" class="dev-icon-button" type="button" aria-label="Open navigation" aria-controls="dev-sidebar" aria-expanded="false">${icon('menu')}</button><span>Workbench</span><span class="dev-slash" aria-hidden="true">/</span><strong>${current.title}</strong></div><div class="dev-topbar-actions"><a href="https://vanilla-calendar.pro" target="_blank" rel="noopener noreferrer" class="dev-docs-link">Documentation <span aria-hidden="true">↗</span></a><span class="dev-toolbar-divider"></span><div class="dev-theme-switch" role="group" aria-label="Color theme"><button data-theme-mode="system" type="button" aria-label="System theme" aria-pressed="false" title="Use device theme">${icon('system')}<span>System</span></button><button data-theme-mode="light" type="button" aria-label="Light theme" aria-pressed="false" title="Light theme">${icon('light')}<span>Light</span></button><button data-theme-mode="dark" type="button" aria-label="Dark theme" aria-pressed="false" title="Dark theme">${icon('theme')}<span>Dark</span></button></div><button id="dev-reset" class="dev-button dev-reset" type="button" title="Reload this scenario with its original configuration">${icon('reset')}<span>Reset scenario</span></button></div>`;
const cases = [...document.querySelectorAll<HTMLElement>('.dev-case')];
document.querySelector('#dev-viewbar')!.innerHTML =
  `<div class="dev-tabs" role="tablist" aria-label="Scenario view"><button id="dev-preview-tab" type="button" role="tab" aria-selected="true" aria-controls="dev-preview">${icon('preview')}Live preview</button><button id="dev-source-tab" type="button" role="tab" aria-selected="false" aria-controls="dev-source" tabindex="-1">${icon('code')}Source code</button></div><div class="dev-view-meta">${cases.length > 1 ? `<label class="dev-jump-label" for="dev-jump">Jump to</label><select id="dev-jump" aria-label="Jump to a case"><option value="">${cases.length} cases on this page</option>${cases.map((element) => `<option value="${element.id}">${element.querySelector('h2')!.textContent}</option>`).join('')}</select>` : ''}</div>`;
const preview = document.querySelector<HTMLElement>('#dev-preview')!;
const sourcePanel = document.querySelector<HTMLElement>('#dev-source')!;
preview.setAttribute('role', 'tabpanel');
preview.setAttribute('aria-labelledby', 'dev-preview-tab');
sourcePanel.setAttribute('role', 'tabpanel');
sourcePanel.setAttribute('aria-labelledby', 'dev-source-tab');
sourcePanel.innerHTML = `<header class="dev-source-header"><div><code>${sourcePath}</code></div><button id="dev-copy" class="dev-button" type="button" disabled>${icon('copy')}Copy code</button></header><pre tabindex="0" aria-label="TypeScript source"><code id="dev-source-code">Loading source…</code></pre>`;
const sourceCode = document.querySelector<HTMLElement>('#dev-source-code')!;
const copy = document.querySelector<HTMLButtonElement>('#dev-copy')!;
const announce = (message: string) => {
  document.querySelector('#dev-announcement')!.textContent = message;
};
let source: string | undefined;
let loading: Promise<void> | undefined;
const loadSource = () => {
  if (source !== undefined || loading) return;
  loading = sources[sourceKey]()
    .then(async (text) => {
      source = text;
      sourceCode.textContent = text;
      copy.disabled = false;
      try {
        const { highlightTypeScript } = await import('./highlight');
        sourceCode.innerHTML = highlightTypeScript(text);
      } catch {
        announce('Source is available, but syntax highlighting could not be loaded.');
      }
    })
    .catch(() => {
      sourceCode.textContent = 'Source could not be loaded. Return to the preview and try again.';
      announce('Source could not be loaded.');
    })
    .finally(() => {
      loading = undefined;
    });
};
const tabs = [...document.querySelectorAll<HTMLButtonElement>('.dev-tabs [role="tab"]')];
const showView = (view: 'preview' | 'source') => {
  preview.hidden = view !== 'preview';
  sourcePanel.hidden = view !== 'source';
  tabs.forEach((tab) => {
    const active = tab.id === `dev-${view}-tab`;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  if (view === 'source') loadSource();
};
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showView(index === 0 ? 'preview' : 'source'));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - index;
    showView(next === 0 ? 'preview' : 'source');
    tabs[next].focus();
  });
});
copy.addEventListener('click', async () => {
  if (source === undefined) return;
  try {
    await navigator.clipboard.writeText(source);
    copy.innerHTML = `${icon('copy')}Copied`;
    announce('Source copied to clipboard.');
    setTimeout(() => {
      copy.innerHTML = `${icon('copy')}Copy code`;
    }, 1800);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(sourceCode);
    selection?.removeAllRanges();
    selection?.addRange(range);
    announce('Use your browser’s copy command to copy the selected source.');
  }
});
document.querySelector('#dev-reset')!.addEventListener('click', () => location.reload());
document.querySelector<HTMLSelectElement>('#dev-jump')?.addEventListener('change', (event) => {
  const id = (event.target as HTMLSelectElement).value;
  if (!id) return;
  showView('preview');
  location.hash = id;
});
window.addEventListener('hashchange', () => {
  if (cases.some(({ id }) => location.hash === `#${id}`)) showView('preview');
});

const themeButtons = [...document.querySelectorAll<HTMLButtonElement>('.dev-theme-switch button')];
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
const applyTheme = (mode: string) => {
  const dark = mode === 'dark' || (mode === 'system' && systemTheme.matches);
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', dark);
  themeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.themeMode === mode)));
};
applyTheme(document.documentElement.dataset.themeMode ?? 'system');
systemTheme.addEventListener('change', () => {
  if (document.documentElement.dataset.themeMode === 'system') applyTheme('system');
});
themeButtons.forEach((button) =>
  button.addEventListener('click', () => {
    const mode = button.dataset.themeMode!;
    applyTheme(mode);
    try {
      localStorage.setItem('vcp-workbench-theme', mode);
    } catch {
      /* The current page still switches theme. */
    }
  }),
);

const search = document.querySelector<HTMLInputElement>('#dev-search')!;
const mobile = matchMedia('(max-width: 760px)');
const menu = document.querySelector<HTMLButtonElement>('#dev-menu')!;
const workspace = document.querySelector<HTMLElement>('.dev-workspace')!;
const setNavigation = (open: boolean, restoreFocus = false) => {
  sidebar.hidden = mobile.matches && !open;
  backdrop.hidden = !mobile.matches || !open;
  document.body.classList.toggle('dev-nav-open', mobile.matches && open);
  workspace.inert = mobile.matches && open;
  menu.setAttribute('aria-expanded', String(mobile.matches && open));
  if (!sidebar.hidden) sidebar.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest' });
  if (restoreFocus) menu.focus();
};
setNavigation(false);
mobile.addEventListener('change', () => setNavigation(false));
menu.addEventListener('click', () => {
  const open = Boolean(sidebar.hidden);
  setNavigation(open);
  if (open) search.focus();
});
backdrop.addEventListener('click', () => setNavigation(false, true));
document.querySelector('#dev-menu-close')!.addEventListener('click', () => setNavigation(false, true));
search.addEventListener('input', () => {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  sidebar.querySelectorAll<HTMLAnchorElement>('[data-scenario]').forEach((link) => {
    const scenario = scenarios.find(({ slug }) => slug === link.dataset.scenario)!;
    const visible = `${scenario.title} ${scenario.group} ${scenario.keywords}`.toLowerCase().includes(query);
    link.hidden = !visible;
    if (visible) count += 1;
  });
  sidebar.querySelectorAll<HTMLElement>('.dev-nav-group').forEach((group) => {
    group.hidden = !group.querySelector('[data-scenario]:not([hidden])');
  });
  sidebar.querySelector<HTMLElement>('.dev-search-empty')!.hidden = count > 0;
  announce(`${count} scenarios found.`);
});
search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sidebar.querySelector<HTMLAnchorElement>('[data-scenario]:not([hidden])')?.click();
});
document.addEventListener('keydown', (event) => {
  const target = event.target as HTMLElement;
  const editing = target.matches('input, textarea, select') || target.isContentEditable;
  if ((!editing && event.key === '/') || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
    event.preventDefault();
    setNavigation(true);
    search.focus();
  }
  if (event.key === 'Escape' && mobile.matches && !sidebar.hidden) setNavigation(false, true);
  if (event.key === 'Tab' && mobile.matches && !sidebar.hidden) {
    const focusable = [...sidebar.querySelectorAll<HTMLElement>('a, input, button')].filter((element) => element.getClientRects().length);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
