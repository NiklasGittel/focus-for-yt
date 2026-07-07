import { BLOCKED_URL, HOME_PAGE_URL } from "../navigation/navigation.constants";
import { DynamicRule } from "./dynamicBrowserRules.types";

const BLOCK_ACTION: DynamicRule["action"] = {
    type: "block",
};

const REDIRECT_AWAY_ACTION: DynamicRule["action"] = {
    type: "redirect",
    redirect: {
        url: BLOCKED_URL
    }
};

const REDIRECT_TO_YT_HOME_ACTION: DynamicRule["action"] = {
    type: "redirect",
    redirect: {
        url: HOME_PAGE_URL
    }
};

export const blockYoutubeRule: DynamicRule =
{
    id: 1,
    priority: 1,
    action: REDIRECT_AWAY_ACTION,
    condition: {
        urlFilter: "*://*.youtube.com/*",
        resourceTypes: ["main_frame"]
    }
};

export const blockShortsRule: DynamicRule = {
    id: 2,
    priority: 1,
    action: REDIRECT_TO_YT_HOME_ACTION,
    condition: {
        urlFilter: "*://*.youtube.com/shorts*",
        resourceTypes: ["main_frame"]
    }
};

export const blockWatchRule: DynamicRule = {
    id: 3,
    priority: 1,
    action: REDIRECT_TO_YT_HOME_ACTION,
    condition: {
        urlFilter: "*://*.youtube.com/watch*",
        resourceTypes: ["main_frame"]
    }
};

export const blockPostsRule: DynamicRule = {
    id: 4,
    priority: 1,
    action: REDIRECT_TO_YT_HOME_ACTION,
    condition: {
        urlFilter: "*://*.youtube.com/post*",
        resourceTypes: ["main_frame"]
    }
};
