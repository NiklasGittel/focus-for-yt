<script setup lang="ts">
import Switch from "@/components/ui/switch/Switch.vue";
import OptionsSectionItem from "@/entrypoints/options/components/OptionsSectionItem.vue";
import {
  strictModeItem,
  usageLimitItem,
} from "@/lib/shared/services/storageService.js";

const useLimit = ref(false);
const strictMode = ref(false);

onMounted(async () => {
  useLimit.value = await usageLimitItem.getValue();
  strictMode.value = await strictModeItem.getValue();
});

watch(useLimit, (newValue) => {
  usageLimitItem.setValue(newValue);
});

strictModeItem.watch((newValue) => {
  strictMode.value = newValue;
});

</script>

<template>
  <OptionsSectionItem
    title="Activate usage limit"
    subtitle="Blocks access to YouTube after exceeding the defined limit">
    <Switch v-model="useLimit" :disabled="strictMode"/>
  </OptionsSectionItem>
</template>
