import {
  getInfosFromLocalStorage,
  setInfosOnLocalStorage
} from "./utils/storage";
import { IOptionsTextTrackManager } from "./utils/types";

// Get the subtitle type
const subtitleType = document.getElementById(
  "subtitlesType"
) as HTMLSelectElement;

// Get the url picker
const urlPicker = document.getElementById("pickerUrl") as HTMLInputElement;
const urlInput = document.getElementById("url") as HTMLInputElement;

// Get the text picker
const txtPicker = document.getElementById("pickerTxt") as HTMLInputElement;
const textArea = document.getElementById("text") as HTMLTextAreaElement;

// Get timeoffset
const timeoffsetInput = document.getElementById(
  "timeoffset"
) as HTMLInputElement;

// Get subtitle size in px
const subSizepxl = document.getElementById("sizeSub") as HTMLInputElement;

// Button to save changes
const saverBtn = document.getElementById("saver") as HTMLButtonElement;

// Notification div
const notification = document.getElementById("notification");

getInfosFromLocalStorage([
  "textTrack",
  "urlTextTrack",
  "subtitleType",
  "textTrackPicker",
  "timeoffset",
  "sizeSub"
]).then((res: IOptionsTextTrackManager) => {
  textArea.value = res.textTrack || "";
  subtitleType.value = res.subtitleType || "srt";
  timeoffsetInput.value = res.timeoffset || "0";
  subSizepxl.value = res.sizeSub || "28";
  urlInput.value = res.urlTextTrack || "";
  if (res.textTrackPicker === "URL") {
    urlPicker.checked = true;
    txtPicker.checked = false;
    textArea.style.display = "none";
    urlInput.style.display = "block";
  } else {
    txtPicker.checked = true;
    urlPicker.checked = false;
    urlInput.style.display = "none";
    textArea.style.display = "block";
  }
});
urlPicker.onclick = () => {
  if (txtPicker.checked) {
    txtPicker.checked = false;
    urlInput.style.display = "block";
    textArea.style.display = "none";
  }
};
txtPicker.onclick = () => {
  if (urlPicker.checked) {
    urlPicker.checked = false;
    urlInput.style.display = "none";
    textArea.style.display = "block";
  }
};
saverBtn.onclick = () => {
  setInfosOnLocalStorage({
    subtitleType: subtitleType.value,
    textTrack: !urlPicker.checked ? textArea.value : "",
    urlTextTrack: urlPicker.checked ? urlInput.value : "",
    textTrackPicker: urlPicker.checked ? "URL" : "LOCAL",
    timeoffset: timeoffsetInput.value,
    sizeSub: subSizepxl.value || "28"
  }).then(() => {
    if (notification === null) {
      return;
    }
    notification.innerText = "Saved!";
    notification.style.color = "#21ba45";
    setTimeout(() => {
      notification.innerText = "";
    }, 3000);
  });
};
