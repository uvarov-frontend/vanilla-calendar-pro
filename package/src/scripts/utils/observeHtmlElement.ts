const trackChangesHTMLElement = (htmlEl: HTMLElement, attr: string, actions: () => void) => {
  const changes = (mutationsList: MutationRecord[]) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const record = mutationsList[i];
      if (record.attributeName === attr) {
        actions();
        break;
      }
    }
  };
  const observer = new MutationObserver(changes);
  observer.observe(htmlEl, { attributes: true });
};

export default trackChangesHTMLElement;
