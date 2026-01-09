const PREV_TABINDEX_ATTR = 'data-vc-prev-tabindex';

const isFocusable = (el: HTMLElement) => el.tabIndex >= 0 && !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true';

const storePrevTabIndex = (el: HTMLElement) => {
  if (el.hasAttribute(PREV_TABINDEX_ATTR)) return;
  const prev = el.getAttribute('tabindex');
  el.setAttribute(PREV_TABINDEX_ATTR, prev ?? '');
};

const restorePrevTabIndex = (el: HTMLElement) => {
  if (!el.hasAttribute(PREV_TABINDEX_ATTR)) return;
  const prev = el.getAttribute(PREV_TABINDEX_ATTR);
  if (prev === '' || prev === null) {
    el.removeAttribute('tabindex');
  } else {
    el.setAttribute('tabindex', prev);
  }
  el.removeAttribute(PREV_TABINDEX_ATTR);
};

export const disableTabbing = (root: HTMLElement) => {
  if (isFocusable(root)) {
    storePrevTabIndex(root);
    root.tabIndex = -1;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => (isFocusable(node as HTMLElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
  });

  while (walker.nextNode()) {
    const el = walker.currentNode as HTMLElement;
    storePrevTabIndex(el);
    el.tabIndex = -1;
  }
};

export const restoreTabbing = (root: HTMLElement) => {
  restorePrevTabIndex(root);
  root.querySelectorAll<HTMLElement>(`[${PREV_TABINDEX_ATTR}]`).forEach(restorePrevTabIndex);
};
