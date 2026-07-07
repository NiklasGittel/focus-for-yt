import { isWatchUrl, redirectToHomepage } from "../navigation/navigation.service";
import { channelsItem, useChannelListItem } from "../../shared/services/storageService";

function allowVideo() {
  console.log("Channel Whitelisted. Revealing player.");
  const style = document.createElement('style');
  style.innerHTML = 'ytd-watch-flexy #movie_player { opacity: 1 !important; pointer-events: auto !important; }';
  document.head.appendChild(style);
}

function blockVideo(channelName: string) {
  console.log(`Blocked: ${channelName} is not on the whitelist.`);

  // Pause the video
  const videoElements = document.querySelectorAll('video');
  videoElements.forEach(vid => vid.pause());

  redirectToHomepage();
}

function getChannelName(): string | null {
  const videoOwnerLink = document.querySelector(
    'ytd-video-owner-renderer ytd-channel-name #text-container a.yt-formatted-string'
  );
  if (videoOwnerLink && videoOwnerLink.textContent) {
    return videoOwnerLink.textContent.trim();
  }

  const videoOwnerWrapper = document.querySelector(
    'ytd-video-owner-renderer ytd-channel-name yt-formatted-string#text'
  );
  if (videoOwnerWrapper) {
    const titleAttr = videoOwnerWrapper.getAttribute('title');
    if (titleAttr) {
      return titleAttr.trim();
    }
  }

  const tooltipElement = document.querySelector(
    'ytd-video-owner-renderer ytd-channel-name tp-yt-paper-tooltip #tooltip'
  );
  if (tooltipElement && tooltipElement.textContent) {
    const cleanedTooltip = tooltipElement.textContent.trim();
    if (cleanedTooltip.length > 0) {
      return cleanedTooltip.trim();
    }
  }

  const genericLink = document.querySelector('ytd-channel-name a.yt-formatted-string');
  if (genericLink && genericLink.textContent) {
    return genericLink.textContent.trim();
  }

  return null;
}

export async function checkIfAllowedChannelAsync() {
  const currentUrl = window.location.href;

  if (!isWatchUrl(currentUrl)) {
    console.log("Not on a watch page, skipping channel verification.");
    return;
  }

  if (!(await useChannelListItem.getValue())) {
    console.log("Channel list usage is disabled, skipping channel verification.");
    return;
  }

  const whitelist = await channelsItem.getValue() ?? [];
  let counter = 0;

  // YouTube's DOM can take a bit to populate
  const checkInterval = setInterval(async () => {
    console.log("Checking for channel name element...");

    const currentChannelName = getChannelName()?.trim().toLowerCase() || null;

    if (currentChannelName) {
      clearInterval(checkInterval);

      if (whitelist.map(channel => channel.toLowerCase()).includes(currentChannelName)) {
        allowVideo();
      } else {
        blockVideo(currentChannelName);
      }
    }

    counter++;
    if (counter >= 30) {
      clearInterval(checkInterval);
      console.log("Channel name element not found after multiple attempts. Stopping checks.");
    }
  }, 200);
}



