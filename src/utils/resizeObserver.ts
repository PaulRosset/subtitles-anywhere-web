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
    width,
  } = videoElement.getBoundingClientRect();
  const videoElementHeight = videoElement.videoHeight;
  textTrackDisplayer.style.width = `${width}px`;
  if (videoElementViewPortBottom > videoElementHeight) {
    const diff = (videoElementViewPortBottom - videoElementHeight) / 2;
    textTrackDisplayer.style.top = `${videoElementViewPortBottom - diff}px`;
    return;
  }
  textTrackDisplayer.style.top = `${videoElementViewPortBottom}px`;
  return;
}
