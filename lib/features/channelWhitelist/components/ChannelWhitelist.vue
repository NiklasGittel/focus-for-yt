<template>
  <ul class="w-full">
    <ChannelWhitelistItem v-for="channel in channels" :key="channel" :channel="channel" :strict-mode="strictMode" />
    <ChannelWhitelistEmptyState v-if="channels.length === 0" />
  </ul>
</template>

<script setup lang="ts">

import { channelsItem, strictModeItem } from "@/lib/shared/services/storageService.js";
import ChannelWhitelistItem from "./ChannelWhitelistItem.vue";
import ChannelWhitelistEmptyState from "./ChannelWhitelistEmptyState.vue";


const channels = ref<string[]>([]);
const strictMode = ref(false);

onMounted(async () => {
  channels.value = await channelsItem.getValue() || [];
  strictMode.value = await strictModeItem.getValue();
});

channelsItem.watch(async (newValue) => {
  channels.value = newValue;
});

</script>
