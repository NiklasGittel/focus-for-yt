import { DailyVideoCount } from "../../models/dailyVideoCount";
import { DailyWatchtime } from "../../models/dailyWatchtime";
import { UsageLimitType } from "../../features/usageLimit/usageLimit.types";
import { getDateTimestamp } from "../utils/dateTimestamp";

export const channelsItem = storage.defineItem<string[]>("local:channels", {
    fallback: [],
});

export const useChannelListItem = storage.defineItem<boolean>("local:useChannelList", {
    fallback: false,
});

export const blockShortsItem = storage.defineItem<boolean>("local:blockShorts", {
    fallback: false,
});

export const hideRecommendationsItem = storage.defineItem<boolean>("local:hideRecommendations", {
    fallback: false,
});

export const hideSidebarItem = storage.defineItem<boolean>("local:hideSidebar", {
    fallback: false,
});

export const hideCommentsItem = storage.defineItem<boolean>("local:hideComments", {
    fallback: false,
});

export const strictModeItem = storage.defineItem<boolean>("local:strictMode", {
    fallback: false,
});

export const usageLimitItem = storage.defineItem<boolean>("local:useLimit", {
    fallback: false,
});

export const usageLimitExceededItem = storage.defineItem<boolean>('local:usageLimitExceeded', {
    fallback: false,
});

export const usageLimitTypeItem = storage.defineItem<UsageLimitType>('local:limitType', {
    fallback: UsageLimitType.VideoBased,
});

export const usageLimitValueItem = storage.defineItem<number>('local:limitValue', {
    fallback: 1,
});

export const stopAutoplayItem = storage.defineItem<boolean>('local:stopAutoplay', {
    fallback: false,
});

export const hidePostsItem = storage.defineItem<boolean>('local:hidePosts', {
    fallback: false,
});

export const hideDrawerItem = storage.defineItem<boolean>('local:hideDrawer', {
    fallback: false,
});

export const strictModeDeactivationTimeItem = storage.defineItem<number>('local:strictModeDeactivationTime', {
    fallback: 0,
});

export const useScheduleItem = storage.defineItem<boolean>('local:useSchedule', {
    fallback: false,
});

export const scheduleDaysItem = storage.defineItem<number[]>('local:scheduleDays', {
    fallback: [],
});

export const blockYoutubeItem = storage.defineItem<boolean>('local:blockYoutube', {
    fallback: false,
});

export const dailyWatchtimeItem = storage.defineItem<DailyWatchtime>('local:dailyWatchtime', {
    fallback: {
        date: getDateTimestamp(),
        watchTimeInMs: 0,
    },
}); 

export const dailyVideoCountItem = storage.defineItem<DailyVideoCount>('local:dailyVideoCount', {
    fallback: {
        date: getDateTimestamp(),
        count: 0,
        videoIds: [],
    },
}); 

export const totalWatchtimeItem = storage.defineItem<number>('local:totalWatchtime', {
    fallback: 0
}); 
