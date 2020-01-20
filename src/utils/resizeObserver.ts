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

export function determineBestPositionForTextTrack(
  videoElement: HTMLVideoElement,
  textTrackDisplayer: HTMLDivElement,
) {
  const {
    bottom: videoElementViewPortBottom,
  } = videoElement.getBoundingClientRect();
  const videoElementHeight = videoElement.videoHeight;
  const { scrollTop } = document.documentElement;
  if (videoElementViewPortBottom > videoElementHeight) {
    const diff = (videoElementViewPortBottom - videoElementHeight) / 2;
    textTrackDisplayer.style.top = `${videoElementViewPortBottom -
      diff +
      scrollTop}px`;
    return;
  }
  textTrackDisplayer.style.top = `${videoElementViewPortBottom + scrollTop}px`;
  return;
}
