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
  containerTextTrackManager.style.right = "50%";

  const textTrackDisplayer = document.createElement("div");
  textTrackDisplayer.style.position = "absolute";
  textTrackDisplayer.style.zIndex = "100000";
  textTrackDisplayer.style.bottom = "20px";
  textTrackDisplayer.style.width = "100%";
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
  // videoElement.parentElement!.onmouseenter = () => {
  //   console.warn("POLO");
  //   containerTextTrackManager.style.display = "block";
  // };&
  // videoElement.parentElement!.onmouseleave = (e: any) => {
  //   console.warn("HELLo", e);
  //   containerTextTrackManager.style.display = "none";
  // };
  containerTextTrackManager.append(startRenderTextTrackBtn, stopTextTrackBtn);
  videoElement.parentNode!.append(
    containerTextTrackManager,
    textTrackDisplayer,
  );
  // videoElement.parentNode!.appendChild(textTrackDisplayer);
});
