// Skips an inert subtree (the grid motion animates out) and an arrow outside dateMin/dateMax, which is only hidden: it
// keeps its tabindex but cannot take the focus.
const getTabbables = (root: HTMLElement) => {
  const tabbables: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const el = node as HTMLElement;
      if (el.hasAttribute('inert')) return NodeFilter.FILTER_REJECT;
      return el.tabIndex >= 0 && !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true' && el.style.visibility !== 'hidden'
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_SKIP;
    },
  });
  while (walker.nextNode()) tabbables.push(walker.currentNode as HTMLElement);
  return tabbables;
};

export default getTabbables;
