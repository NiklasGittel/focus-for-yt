<script setup lang="ts">
import { strictModeItem } from '@/lib/shared/services/storageService';

const isStrictMode = ref(false);
onMounted(async () => {
    isStrictMode.value = await strictModeItem.getValue();
});

strictModeItem.watch(async (newValue, _) => {
    isStrictMode.value = newValue;
});

</script>

<template>
    <span class="text-xs text-muted-foreground">Strict mode: {{ isStrictMode ? 'on' : 'off' }}</span>
</template>