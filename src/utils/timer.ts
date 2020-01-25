import TextTrackRenderer from "rx-player/experimental/tools/TextTrackRenderer";

export const onMouseMove = (
  textTrackRenderer: TextTrackRenderer,
  onEnterActive: () => void,
  onEnterInactive: () => void,
): (() => void) => {
  let timeoutID: number | undefined = undefined;
  let isActive = true;
  function setup() {
    document.addEventListener("mousemove", resetTimer, true);

    startTimer();
  }
  setup();

  function startTimer() {
    // wait 2 seconds before calling goInactive
    timeoutID = window.setTimeout(goInactive, 2000);
  }

  function resetTimer() {
    window.clearTimeout(timeoutID);

    goActive();
  }

  function goInactive() {
    // do something
    if (isActive) {
      onEnterInactive();
      isActive = false;
    }
  }

  function goActive() {
    // do something
    if (!isActive) {
      onEnterActive();
      isActive = true;
    }

    startTimer();
  }

  return () => {
    textTrackRenderer.dispose();
    window.clearTimeout(timeoutID);
    document.removeEventListener("mousemove", resetTimer, true);
  };
};
