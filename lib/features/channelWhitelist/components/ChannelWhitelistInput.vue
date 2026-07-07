<template>
  <Input placeholder="Enter channel name" class="text-sm mb-2" v-model="newChannel" @keyup.enter="onEnter"
    :disabled="strictMode" />
</template>


<script setup lang="ts">
import { EMPTY_STRING } from "@/lib/shared/constants/misc.js";
import { ref, onMounted } from "vue";
import Input from "@/components/ui/input/Input.vue";
import { channelsItem, strictModeItem } from "@/lib/shared/services/storageService.js";

const newChannel = ref(EMPTY_STRING);
const strictMode = ref(false);

onMounted(async () => {
  strictMode.value = await strictModeItem.getValue();
});

strictModeItem.watch(async (newValue) => {
  strictMode.value = newValue;
});


const addChannel = async (channel: string) => {
  channel = channel.trim();
  const currentChannels = await channelsItem.getValue() || [];
  if (currentChannels.map(c => c.toLowerCase()).includes(channel.toLowerCase())) {
    return;
  }
  const updatedChannels = [...currentChannels, channel];
  await channelsItem.setValue(updatedChannels);
};

const onEnter = () => {
  if (newChannel.value.trim() !== EMPTY_STRING) {
    addChannel(newChannel.value.trim());
    newChannel.value = EMPTY_STRING;
  }
};
</script>