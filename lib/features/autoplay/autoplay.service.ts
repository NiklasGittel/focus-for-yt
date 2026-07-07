import { ENDED_EVENT } from "../../shared/constants/events";
import { stopAutoplayItem } from "../../shared/services/storageService";

let trackedVideoElement: HTMLVideoElement | null = null;

export async function stopAutoplayAsync() {
  console.log("Attempting to stop autoplay suggestions");

  const observer = new MutationObserver((_, obs) => {
    const cancelButton = getAutoplayCancelButton();
    if (cancelButton) {
      cancelButton.click();
      obs.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Stop observing after 5 seconds to save resources
  setTimeout(() => observer.disconnect(), 5000);
}

function cleanupAutoplayStopper() {
  if (trackedVideoElement) {
    trackedVideoElement.removeEventListener(ENDED_EVENT, stopAutoplayAsync);
    delete trackedVideoElement.dataset.wxtAutoplayListener;
    trackedVideoElement = null;
  }
}

export async function registerAutoplayStopper() {
  const videoElement = document.querySelector('video');
  const stopAutoplayEnabled = await stopAutoplayItem.getValue();

  if (!stopAutoplayEnabled) return;

  if (videoElement && !videoElement.dataset.wxtAutoplayListener) {
    cleanupAutoplayStopper(); // just in case clean up

    trackedVideoElement = videoElement;
    videoElement.dataset.wxtAutoplayListener = 'true';
    videoElement.addEventListener(ENDED_EVENT, stopAutoplayAsync);
  }
}

export function getAutoplayCancelButton(): HTMLButtonElement | undefined {
    console.log("Attempting to find autoplay cancel button...");
    return document.querySelector('button.ytp-autonav-endscreen-upnext-cancel-button[aria-label="Cancel autoplay"]') as HTMLButtonElement ?? undefined;
}