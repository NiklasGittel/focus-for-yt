<template>
  <PopupSectionContainer v-if="showChannelList">
    <PopupSectionHeader title="Whitelisted Channels">
      <ChannelWhitelistCounter />
    </PopupSectionHeader>
    <ChannelWhitelistInput />
    <ChannelWhitelist />
  </PopupSectionContainer>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  useChannelListItem,
} from "@/lib/shared/services/storageService.js";
import PopupSectionContainer from "../../../../entrypoints/popup/components/PopupSectionContainer.vue";
import PopupSectionHeader from "../../../../entrypoints/popup/components/PopupSectionHeader.vue";
import ChannelWhitelistCounter from "./ChannelWhitelistCounter.vue";
import ChannelWhitelistInput from "./ChannelWhitelistInput.vue";
import ChannelWhitelist from "./ChannelWhitelist.vue";


let showChannelList = ref(false);

onBeforeMount(async () => {
  const useChannelList = await useChannelListItem.getValue();
  if (!useChannelList) {
    return;
  }
  showChannelList.value = true;
});

useChannelListItem.watch(async (newValue, _) => {
  showChannelList.value = newValue;
});
</script>
