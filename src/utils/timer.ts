export const timer = (
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
    window.clearTimeout(timeoutID);
    document.removeEventListener("mousemove", resetTimer, true);
  };
};
