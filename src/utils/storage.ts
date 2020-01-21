import { IOptionsTextTrackManager } from "./types";

export function getInfosFromLocalStorage(
  infosToGet: string[],
): Promise<IOptionsTextTrackManager> {
  return new Promise(resolve => {
    chrome.storage.local.get(infosToGet, res => {
      return resolve(res as IOptionsTextTrackManager);
    });
  });
}

export function setInfosOnLocalStorage(infosToStore: IOptionsTextTrackManager) {
  return new Promise(resolve => {
    chrome.storage.local.set(infosToStore, () => {
      return resolve();
    });
  });
}
