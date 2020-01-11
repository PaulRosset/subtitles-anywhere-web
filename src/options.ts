const urlTxtPicker = document.getElementById(
  "txtPicker-url",
) as HTMLInputElement;
const classicTxtPicker = document.getElementById(
  "txtPicker-classic",
) as HTMLInputElement;
const textArea = document.getElementById("text");
const urlInput = document.getElementById("url");

const formInfos = document.getElementById(
  "form-infos",
) as HTMLFormElement | null;
const subtitleTypeSelector = document.getElementById("subtitles-type");

if (textArea !== null && urlInput !== null && formInfos !== null) {
  chrome.storage.local.get(
    ["textTrack", "subtitleType", "textTrackPicker"],
    function(result) {
      console.log("Value currently is " + result);
      (textArea as HTMLTextAreaElement).value = result.textTrack || "";
      (subtitleTypeSelector as HTMLSelectElement).value =
        result.subtitleType || "srt";
      if (result.textTrackPicker === "URL") {
        urlTxtPicker.checked = true;
      } else {
        classicTxtPicker.checked = true;
      }
    },
  );
  classicTxtPicker.checked = true;
  urlInput.style.display = "none";
  urlTxtPicker.onclick = () => {
    if (classicTxtPicker.checked) {
      classicTxtPicker.checked = false;
      urlInput.style.display = "block";
      textArea.style.display = "none";
    }
  };
  classicTxtPicker.onclick = () => {
    if (urlTxtPicker.checked) {
      urlTxtPicker.checked = false;
      urlInput.style.display = "none";
      textArea.style.display = "block";
    }
  };
  formInfos.onclick = () => {
    chrome.storage.local.set(
      {
        textTrack: (textArea as HTMLTextAreaElement).value,
        subtitleType: (subtitleTypeSelector as HTMLSelectElement).value,
        textTrackPicker: urlTxtPicker.checked ? "URL" : "LOCAL",
      },
      () => {
        console.log("Value is set to ");
      },
    );
  };
}
