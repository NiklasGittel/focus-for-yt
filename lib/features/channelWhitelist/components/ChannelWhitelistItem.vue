<template>
  <li class="group flex items-center justify-between py-1 mb-[5px] text-white min-w-52">
    <div class="flex justify start items-center gap-2">
      <Avatar class="w-6 h-6">
        <AvatarFallback>{{ channel.charAt(0).toUpperCase() }}</AvatarFallback>
      </Avatar>
      <span class="leading-none">{{ channel }}</span>
    </div>
    <TrashIcon
      class="invisible group-hover:visible hover:text-red-500 cursor-pointer w-4 h-4"
      @click="onRemoveChannel(channel)"
    />
  </li>
</template>

<script setup lang="ts">
import { AvatarFallback } from "@/components/ui/avatar";
import Avatar from "@/components/ui/avatar/Avatar.vue";
import { channelsItem } from "@/lib/shared/services/storageService";
import { TrashIcon } from "@lucide/vue";

defineProps<{
  channel: string;
  strictMode?: boolean;
}>();

const onRemoveChannel = async (channelToRemove: string) => {
  const currentChannels = await channelsItem.getValue(); 
  const updatedChannels = currentChannels.filter(
    (channel) => channel !== channelToRemove
  );
  await channelsItem.setValue(updatedChannels);
};

</script>
