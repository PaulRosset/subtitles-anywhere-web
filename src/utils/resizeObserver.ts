export function resizeObserver(
  elem: HTMLElement,
  cb: (entries: DOMRectReadOnly) => void,
) {
  const resizeObserver = new ResizeObserver(entries => {
    console.warn(entries);
    entries.forEach(elemUpdated => {
      if (elemUpdated.target.tagName === "VIDEO") {
        cb(elemUpdated.contentRect);
      }
    });
  });

  resizeObserver.observe(elem);
}
