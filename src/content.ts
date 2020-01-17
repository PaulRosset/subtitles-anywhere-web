import TextTrackRenderer, {
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
} from "rx-player/experimental/tools/TextTrackRenderer";

import { checkDomVideoChanges } from "./utils/domChanges";
import {
  resizeObserver,
  determineBestPositionForTextTrack,
} from "./utils/resizeObserver";
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
    document.querySelector(".SA-textTrackManager")?.remove();
    document.querySelector(".SA-textTrackDisplayer")?.remove();
    if (document.querySelector(".subtitlesEverywhere") !== null) {
      document.documentElement.classList.remove("subtitlesEverywhere");
    }
    return;
  }

  const isControlsPresent = document.querySelector(".subtitlesEverywhere");
  if (isControlsPresent !== null) {
    return;
  }
  document.documentElement.classList.add("subtitlesEverywhere");

  // Get informations about the videoElement
  const videoElement = videoElements[0];

  // Set the UI to manage the textTrack rendering
  const containerTextTrackManager = document.createElement("div");
  const startIcon = document.createElement("img");
  const stopIcon = document.createElement("img");

  startIcon.src = "https://i.ibb.co/hmRJxf8/play.png";
  startIcon.style.height = "2.5rem";
  startIcon.style.margin = "0 3.5px";

  stopIcon.src = "https://i.ibb.co/C9LMqRp/stop.png";
  stopIcon.style.height = "2.5rem";
  stopIcon.style.margin = "0 3.5px";

  containerTextTrackManager.append(startIcon, stopIcon);

  containerTextTrackManager.className = "SA-textTrackManager";
  containerTextTrackManager.style.padding = "5px 10px";
  containerTextTrackManager.style.zIndex = "10000";
  containerTextTrackManager.style.backgroundColor = "white";
  containerTextTrackManager.style.position = "absolute";
  containerTextTrackManager.style.borderRadius = "2.5rem";
  containerTextTrackManager.style.backgroundColor = "#1b1e22";

  // Set up the UI to display the text track in
  const textTrackDisplayer = document.createElement("div");
  textTrackDisplayer.className = "SA-textTrackDisplayer";
  textTrackDisplayer.style.position = "absolute";
  textTrackDisplayer.style.zIndex = "10000";

  resizeObserver(videoElement, (_: DOMRectReadOnly) => {
    console.warn(videoElement.getBoundingClientRect());
    const { bottom } = videoElement.getBoundingClientRect();
    containerTextTrackManager.style.top = `${bottom / 3}px`;

    determineBestPositionForTextTrack(videoElement, textTrackDisplayer);
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
  startIcon.onclick = async () => {
    console.warn("START RENDER");
    determineBestPositionForTextTrack(videoElement, textTrackDisplayer);
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
  stopIcon.onclick = () => {
    console.warn("STOP RENDER");
    textTrackRenderer.removeTextTrack();
  };
  containerTextTrackManager.append(startIcon, stopIcon);
  document.body.append(containerTextTrackManager, textTrackDisplayer);
});
