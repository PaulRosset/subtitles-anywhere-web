export function checkDomVideoChanges(cb: (node: Node) => void) {
  if (MutationObserver) {
    // define a new observer
    const obs = new MutationObserver(function(mutations) {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(addedNode => {
          if ((addedNode as Element).tagName === "VIDEO") {
            cb(addedNode);
          }
        });
      });
    });
    // have the observer observe foo for changes in children
    obs.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}
