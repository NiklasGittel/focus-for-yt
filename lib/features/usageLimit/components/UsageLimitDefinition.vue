<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { onMounted, ref, computed, watch } from "vue";
import { UsageLimitType } from '@/lib/features/usageLimit/usageLimit.types.js';
import { usageLimitItem, usageLimitTypeItem, usageLimitValueItem } from '@/lib/shared/services/storageService.js';
import OptionsSectionItem from '@/entrypoints/options/components/OptionsSectionItem.vue';

const usageLimitValue = ref(1);
const usageLimitType = ref<UsageLimitType>(UsageLimitType.TimeBased);
const useLimit = ref(false);

onMounted(async () => {
  usageLimitType.value = await usageLimitTypeItem.getValue();
  useLimit.value = await usageLimitItem.getValue();

});

const subtitle = computed(() => usageLimitType.value === UsageLimitType.VideoBased ? "Number of allowed videos" : "Time limit (minutes)");

usageLimitTypeItem.watch((newValue) => {
  console.log("Usage limit type changed to", newValue);
  usageLimitType.value = newValue;
});

usageLimitItem.watch((newValue) => {
  useLimit.value = newValue;
});

watch(usageLimitValue, (newValue) => {
  usageLimitValueItem.setValue(newValue);
});
</script>

<template>
  <OptionsSectionItem label="Limit definition" :subtitle="subtitle">
    <NumberField v-model="usageLimitValue" class="w-24" :min="1" :max="99"
      :disabled="!useLimit" >
      <NumberFieldContent>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldContent>
    </NumberField>
  </OptionsSectionItem>
</template>
