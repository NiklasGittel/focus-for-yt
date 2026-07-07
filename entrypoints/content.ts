import { registerAutoplayStopper, stopAutoplayAsync } from "../lib/features/autoplay/autoplay.service";
import { checkIfAllowedChannelAsync } from "../lib/features/channelWhitelist/channelWhitelist.service";
import { checkAllAndRedirectAsync, isWatchUrlCurrent } from "../lib/features/navigation/navigation.service";
import { blockShortsItem, hideCommentsItem, hidePostsItem, hideDrawerItem, hideRecommendationsItem, stopAutoplayItem, useChannelListItem } from "../lib/shared/services/storageService";
import { checkUsageLimitAsync, increaseVideoCountAsync, registerPlaytimeTracker } from "@/lib/features/usageLimit/usageLimit.service";
import { YT_NAVIGATE_FINISH_EVENT, YT_NAVIGATE_START_EVENT } from "@/lib/shared/constants/events";
import { toggleAllCssAsync, toggleCommentsAsync, toggleDrawerAsync, togglePostsAsync, toggleRecommendationsAsync, toggleShortsAsync } from "@/lib/features/cssInjection/cssInjection.service";

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  async main() {
    await performInitialChecksAsync();
    registerStorageWatchers();
    registerEventListeners();
  },
});

async function performInitialChecksAsync() {
  await checkAllAndRedirectAsync(new Event('init'));
  await checkIfAllowedChannelAsync();
  await toggleAllCssAsync();
}

function registerStorageWatchers() {
  blockShortsItem.watch(async (_, __) => {
    await toggleShortsAsync();
  });

  hideRecommendationsItem.watch(async (_, __) => {
    await toggleRecommendationsAsync();
  });

  hideCommentsItem.watch(async (_, __) => {
    await toggleCommentsAsync();
  });

  stopAutoplayItem.watch(async (_, __) => {
    await stopAutoplayAsync();
  });

  hidePostsItem.watch(async (_, __) => {
    await togglePostsAsync();
  });

  hideDrawerItem.watch(async (_, __) => {
    await toggleDrawerAsync();
  });

  useChannelListItem.watch(async (_, __) => {
    await checkIfAllowedChannelAsync();
  });
}

function registerEventListeners() {
  registerVideoEventListeners();
  document.addEventListener(YT_NAVIGATE_START_EVENT, onYtNavigateStart);
  document.addEventListener(YT_NAVIGATE_FINISH_EVENT, onYtNavigateFinish);
}

async function onYtNavigateFinish(_: Event) {
  await checkIfAllowedChannelAsync();
  if (isWatchUrlCurrent()) {
    registerVideoEventListeners();
    await checkUsageLimitAsync();
  }
}

async function onYtNavigateStart(event: Event) {
  await checkAllAndRedirectAsync(event);
  if (isWatchUrlCurrent()) {
    await checkIfAllowedChannelAsync();
    await increaseVideoCountAsync();
    await checkUsageLimitAsync();
  }
}

async function registerVideoEventListeners() {
  registerPlaytimeTracker();
  registerAutoplayStopper();
}