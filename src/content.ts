import TextTrackRenderer, {
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
} from "rx-player/experimental/tools/TextTrackRenderer";

import { checkDomVideoChanges } from "./utils/domChanges.ts";

TextTrackRenderer.addParsers([
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
]);

document.onreadystatechange = () => {
  checkDomVideoChanges(() => {
    const isControlsPresent = document.querySelector(".subtitlesEverywhere");
    if (isControlsPresent !== null) {
      return;
    }
    document.body.className += "subtitlesEverywhere";

    const videoElements = document.querySelectorAll("video");
    if (videoElements.length === 0 || videoElements.length > 1) {
      // For now, we only handle a single videoElement per page.
      return;
    }
    const videoElement = videoElements[0];
    const containerTextTrackManager = document.createElement("div");
    const startRenderTextTrackBtn = document.createElement("button");
    const stopTextTrackBtn = document.createElement("button");
    startRenderTextTrackBtn.innerText = "Start";
    stopTextTrackBtn.innerText = "Stop";
    containerTextTrackManager.style.padding = "10px";
    containerTextTrackManager.style.zIndex = "100000";
    containerTextTrackManager.style.backgroundColor = "white";
    containerTextTrackManager.style.position = "absolute";

    const textTrackDisplayer = document.createElement("div");
    const textTrackRenderer = new TextTrackRenderer({
      videoElement: videoElement,
      textTrackElement: textTrackDisplayer,
    });
    // containerTextTrackManager.onmouseenter = () => {
    //   console.warn("ENTER");
    // };
    // containerTextTrackManager.onmouseleave = () => {
    //   console.warn("LEAVE");
    // };
    startRenderTextTrackBtn.onclick = async () => {
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
    console.warn("START RENDER");
    stopTextTrackBtn.onclick = () => {
      console.warn("STOP RENDER");
      textTrackRenderer.removeTextTrack();
    };
    // videoElement.parentElement!.onmouseenter = () => {
    //   console.warn("POLO");
    //   containerTextTrackManager.style.display = "block";
    // };&
    // videoElement.parentElement!.onmouseleave = (e: any) => {
    //   console.warn("HELLo", e);
    //   containerTextTrackManager.style.display = "none";
    // };
    containerTextTrackManager.append(startRenderTextTrackBtn, stopTextTrackBtn);
    videoElement.parentNode!.appendChild(containerTextTrackManager);
    videoElement.parentNode!.appendChild(textTrackDisplayer);
  });
};
