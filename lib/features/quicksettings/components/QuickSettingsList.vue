<script setup lang="ts">
import QuickSettingsListItem from "./QuickSettingsListItem.vue";
import { ref, watch } from "vue";
import {
    blockShortsItem,
    blockYoutubeItem,
    hideCommentsItem,
    hideDrawerItem,
    hidePostsItem,
    hideRecommendationsItem,
    stopAutoplayItem,
    strictModeItem,
    useChannelListItem,
} from "@/lib/shared/services/storageService.js";
import {
    BanIcon,
    FilmIcon,
    ListIcon,
    MessageSquareOffIcon,
    PanelLeftIcon,
    PlayIcon,
    SparklesIcon,
    StickyNoteOffIcon,
} from "@lucide/vue";

const blockShorts = ref(false);
const blockYoutube = ref(false);
const removeHomeFeed = ref(false);
const hideComments = ref(false);
const stopAutoplay = ref(false);
const hideDrawer = ref(false);
const hidePosts = ref(false);
const useChannelList = ref(false);

const strictMode = ref(false);

onMounted(async () => {
    const [
        blockYoutubeVal,
        shortsVal,
        recommendationsVal,
        commentsVal,
        autoplayVal,
        postsVal,
        drawerVal,
        channelListVal,
        strictModeVal,
    ] = await Promise.all([
        blockYoutubeItem.getValue(),
        blockShortsItem.getValue(),
        hideRecommendationsItem.getValue(),
        hideCommentsItem.getValue(),
        stopAutoplayItem.getValue(),
        hidePostsItem.getValue(),
        hideDrawerItem.getValue(),
        useChannelListItem.getValue(),
        strictModeItem.getValue(),
    ]);

    blockYoutube.value = blockYoutubeVal;
    blockShorts.value = shortsVal;
    removeHomeFeed.value = recommendationsVal;
    hideComments.value = commentsVal;
    stopAutoplay.value = autoplayVal;
    hidePosts.value = postsVal;
    hideDrawer.value = drawerVal;
    useChannelList.value = channelListVal;
    strictMode.value = strictModeVal;
});

watch(blockYoutube, async (newValue, _) => {
    await blockYoutubeItem.setValue(newValue);
});

watch(blockShorts, async (newValue, _) => {
    await blockShortsItem.setValue(newValue);
});

watch(removeHomeFeed, async (newValue, _) => {
    await hideRecommendationsItem.setValue(newValue);
});

watch(hideComments, async (newValue, _) => {
    await hideCommentsItem.setValue(newValue);
});

watch(stopAutoplay, async (newValue, _) => {
    await stopAutoplayItem.setValue(newValue);
});

watch(hidePosts, async (newValue, _) => {
    await hidePostsItem.setValue(newValue);
});

watch(hideDrawer, async (newValue, _) => {
    await hideDrawerItem.setValue(newValue);
});

watch(useChannelList, async (newValue, _) => {
    await useChannelListItem.setValue(newValue);
});

strictModeItem.watch(async (newValue) => {
    strictMode.value = newValue;
});

const iconClass = "bg-neutral-800 h-6 w-6 p-1.5 rounded-md mr-2";

</script>

<template>
    <ul class="flex flex-col gap-4 w-full">
        <QuickSettingsListItem title="Block youtube" v-model="blockYoutube" :disabled="strictMode && blockYoutube">
            <BanIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Hide recommendations" v-model="removeHomeFeed"
            :disabled="strictMode && removeHomeFeed">
            <SparklesIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Hide shorts" v-model="blockShorts" :disabled="strictMode && blockShorts">
            <FilmIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Hide comments" v-model="hideComments" :disabled="strictMode && hideComments">
            <MessageSquareOffIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Hide posts" v-model="hidePosts" :disabled="strictMode && hidePosts">
            <StickyNoteOffIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Hide toolbar" v-model="hideDrawer" :disabled="strictMode && hideDrawer">
            <PanelLeftIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Stop autoplay" v-model="stopAutoplay" :disabled="strictMode && stopAutoplay">
            <PlayIcon :class="iconClass" />
        </QuickSettingsListItem>
        <QuickSettingsListItem title="Use whitelist" v-model="useChannelList" :disabled="strictMode && useChannelList">
            <ListIcon :class="iconClass" />
        </QuickSettingsListItem>
    </ul>
</template>
