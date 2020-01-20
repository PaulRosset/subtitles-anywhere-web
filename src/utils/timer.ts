export const timer = (
  onEnterActive: () => void,
  onEnterInactive: () => void,
) => {
  let timeoutID: number | undefined = undefined;
  let isActive = true;
  function setup() {
    window.addEventListener("mousemove", resetTimer, false);

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
};
