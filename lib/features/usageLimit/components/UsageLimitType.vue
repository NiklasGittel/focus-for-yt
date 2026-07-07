<script setup lang="ts">

import { UsageLimitType } from "@/lib/features/usageLimit/usageLimit.types.js";
import OptionsSectionItem from "../OptionsSectionItem.vue";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usageLimitTypeItem, usageLimitItem } from "@/lib/shared/services/storageService.js";
import { onMounted, ref, watch } from "vue";

const limitType = ref<UsageLimitType>(UsageLimitType.TimeBased);
const useLimit = ref(false);

onMounted(async () => {
  limitType.value = await usageLimitTypeItem.getValue();
  useLimit.value = await usageLimitItem.getValue();
});

watch(limitType, (newValue) => {
  usageLimitTypeItem.setValue(newValue);
});

usageLimitItem.watch((newValue) => {
  useLimit.value = newValue;
});

</script>

<template>
  <OptionsSectionItem
    title="Limit type"
    subtitle="Select the type of usage limit to apply."
  >
  <Select v-model="limitType" :disabled="!useLimit" >
    <SelectTrigger>
      <SelectValue placeholder="Select limit type" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem :value="UsageLimitType.TimeBased">Time based</SelectItem>
      <SelectItem :value="UsageLimitType.VideoBased">Video based</SelectItem>
    </SelectContent>
  </Select>
  </OptionsSectionItem>
</template>
