const getRootNode = (el: HTMLElement): Document | ShadowRoot => (el.getRootNode ? el.getRootNode() : document) as Document | ShadowRoot;

export default getRootNode;
