export function resizeObserver(
  elem: HTMLElement,
  cb: (entries: DOMRectReadOnly) => void,
) {
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(elemUpdated => {
      if (elemUpdated.target.tagName === "VIDEO") {
        cb(elemUpdated.contentRect);
      }
    });
  });

  resizeObserver.observe(elem);
}

export function determineBestPositionForTextTrack(
  videoElement: HTMLVideoElement,
  textTrackDisplayer: HTMLDivElement,
) {
  const {
    bottom: videoElementViewPortBottom,
  } = videoElement.getBoundingClientRect();
  const { scrollTop, scrollHeight } = document.documentElement;
  if (videoElementViewPortBottom > scrollHeight) {
    textTrackDisplayer.style.top = `${scrollHeight -
      (scrollHeight / 100) * 10 +
      scrollTop}px`;
    return;
  }
  textTrackDisplayer.style.top = `${((90/100 * videoElementViewPortBottom) + scrollTop)}px`;
  return;
}
