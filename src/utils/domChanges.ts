export function checkDomVideoChanges(cb: () => void) {
  window.addEventListener("DOMContentLoaded", () => {
    cb();
    if (MutationObserver) {
      // define a new observer
      const obs = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
          mutation.addedNodes.forEach(addedNode => {
            if (
              (addedNode as Element).tagName === "VIDEO" ||
              /player/i.test((addedNode as Element)?.className)
            ) {
              console.warn("pOLOOOO", addedNode);
              cb();
            }
          });
        });
      });
      // have the observer observe foo for changes in children
      obs.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  });
}
