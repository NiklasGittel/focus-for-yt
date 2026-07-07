<template>
    <span>{{ count }}</span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { channelsItem } from "@/lib/shared/services/storageService.js";

const channels = ref<string[]>([]);
const count = computed(() => channels.value.length);

onMounted(async () => {
  channels.value = await channelsItem.getValue() || [];
});

channelsItem.watch(async (newValue) => {
  channels.value = newValue;
});
</script>