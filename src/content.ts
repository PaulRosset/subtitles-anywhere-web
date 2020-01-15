import TextTrackRenderer, {
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
} from "rx-player/experimental/tools/TextTrackRenderer";

import { checkDomVideoChanges } from "./utils/domChanges.ts";
import { resizeObserver } from "./utils/resizeObserver.ts";
// import { timer } from "./utils/timer.ts";

TextTrackRenderer.addParsers([
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
]);

checkDomVideoChanges(() => {
  const videoElements = document.querySelectorAll("video");
  console.warn("CHECKKKK", videoElements);
  if (videoElements.length === 0 || videoElements.length > 1) {
    // For now, we only handle a single videoElement per page.
    return;
  }

  const isControlsPresent = document.querySelector(".subtitlesEverywhere");
  if (isControlsPresent !== null) {
    return;
  }
  document.documentElement.classList.add("subtitlesEverywhere");

  // Get informations about the videoElement
  const videoElement = videoElements[0];
  // const { bottom, width, top } = videoElement.getBoundingClientRect();

  // Set the UI to manage the textTrack rendering
  const containerTextTrackManager = document.createElement("div");
  const startRenderTextTrackBtn = document.createElement("button");
  const stopTextTrackBtn = document.createElement("button");
  startRenderTextTrackBtn.innerText = "Start";
  stopTextTrackBtn.innerText = "Stop";

  containerTextTrackManager.style.padding = "10px";
  containerTextTrackManager.style.zIndex = "10000";
  containerTextTrackManager.style.backgroundColor = "white";
  containerTextTrackManager.style.position = "absolute";
  // containerTextTrackManager.style.top = `${top}px`;

  // Set up the UI to display the text track in
  const textTrackDisplayer = document.createElement("div");
  textTrackDisplayer.style.position = "absolute";
  textTrackDisplayer.style.zIndex = "10000";
  // textTrackDisplayer.style.top = `${bottom}px`;
  // textTrackDisplayer.style.width = `${width}px`;

  resizeObserver(videoElement, (_: DOMRectReadOnly) => {
    console.warn(videoElement.getBoundingClientRect());
    const { bottom, width, top } = videoElement.getBoundingClientRect();
    containerTextTrackManager.style.top = `${top +
      containerTextTrackManager.clientHeight}px`;

    textTrackDisplayer.style.top = `${bottom}px`;
    textTrackDisplayer.style.width = `${width}px`;
  });

  const textTrackRenderer = new TextTrackRenderer({
    videoElement,
    textTrackElement: textTrackDisplayer,
  });
  // timer(
  //   () => {
  //     containerTextTrackManager.style.display = "block";
  //   },
  //   () => {
  //     containerTextTrackManager.style.display = "none";
  //   },
  // );
  startRenderTextTrackBtn.onclick = async () => {
    console.warn("START RENDER");
    chrome.storage.local.get(
      ["textTrack", "subtitleType", "textTrackPicker"],
      function(result) {
        console.log("Value currently is " + result);
        try {
          textTrackRenderer.setTextTrack({
            data: result.textTrack,
            type: result.subtitleType,
          });
        } catch (e) {
          console.warn(e);
        }
      },
    );
  };
  stopTextTrackBtn.onclick = () => {
    console.warn("STOP RENDER");
    textTrackRenderer.removeTextTrack();
  };
  containerTextTrackManager.append(startRenderTextTrackBtn, stopTextTrackBtn);
  document.body.append(containerTextTrackManager, textTrackDisplayer);
});
