<template>
  <div class="flex items-center justify-between p-1 pl-4 w-full">
    <span class="text-xs text-muted-foreground">v0.1.0</span>
    <StrictModeIndicator />
    <PopupSettingsButton />
  </div>
</template>

<script setup lang="ts">

import StrictModeIndicator from '@/lib/features/strictMode/components/StrictModeIndicator.vue';
import PopupSettingsButton from './PopupSettingsButton.vue';
</script>
