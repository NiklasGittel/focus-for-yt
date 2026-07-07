import { blockShortsItem, blockYoutubeItem, hidePostsItem, strictModeItem } from "@/lib/shared/services/storageService";
import { toggleRule } from "@/lib/features/dynamicBrowserRules/dynamicBrowserRules.service";
import { blockPostsRule, blockShortsRule, blockYoutubeRule } from "@/lib/features/dynamicBrowserRules/dynamicBrowserRules.constants";
import { PAUSE_STRICT_MODE_MESSAGE } from "@/lib/features/messaging/messaging.constants";
import { onMessage } from "@/lib/features/messaging/messaging.service";

export default defineBackground(() => {
  onMessage(PAUSE_STRICT_MODE_MESSAGE, (message) => pauseStrictMode(message.data));

  blockShortsItem.watch(async (blockShorts, __) => {
    console.log(`blockShorts changed to ${blockShorts}`);
    await toggleRule(blockShortsRule, blockShorts);
  });

  blockYoutubeItem.watch(async (blockYoutube, __) => {
    console.log(`blockYoutube changed to ${blockYoutube}`);
    await toggleRule(blockYoutubeRule, blockYoutube);
     
  });

  hidePostsItem.watch(async (hidePosts, __) => {
    console.log(`hidePosts changed to ${hidePosts}`);
    await toggleRule(blockPostsRule, hidePosts);
  });

  // usageLimitExceededItem.watch(async (isExceeded, __) => {
  //   console.log(`usageLimitExceeded changed to ${isExceeded}`);
  //   await toggleRule(blockYoutubeRule, isExceeded);
  // });
});

//TODO find a better place for this, maybe in a separate file for strict mode related functions
let pauseTimer: ReturnType<typeof setTimeout> | null = null;

export function pauseStrictMode(durationInMinutes: number) {
  strictModeItem.setValue(false);
  
  if (pauseTimer) clearTimeout(pauseTimer);
  
  pauseTimer = setTimeout(() => {
    strictModeItem.setValue(true);
  }, durationInMinutes * 60 * 1000);
}