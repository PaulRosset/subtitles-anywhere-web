export function checkDomVideoChanges(refreshInterval = 5000) {
  let id: number | null = null;
  let videoElement: HTMLVideoElement | null | undefined = null;

  return {
    checkVideoChanges(
      cb: (videoElement: HTMLVideoElement | null | undefined) => void
    ) {
      window.addEventListener("DOMContentLoaded", () => {
        if (videoElement === null) {
          const videoElementsAtFirstRender = Array.from(
            document.querySelectorAll("video")
          );
          const video = videoElementsAtFirstRender.find(
            video => video.readyState >= 3
          );
          cb(video);
          videoElement = video;
        }

        id = window.setInterval(() => {
          const videos = Array.from(document.querySelectorAll("video"));
          const readyVideo = Array.from(videos).find(
            video => video.readyState >= 3
          );
          if (videoElement !== readyVideo) {
            cb(readyVideo);
            videoElement = readyVideo;
          }
        }, refreshInterval);
      });
    },
    clear() {
      if (id !== null) {
        clearInterval(id);
      }
      videoElement = null;
    }
  };
}
