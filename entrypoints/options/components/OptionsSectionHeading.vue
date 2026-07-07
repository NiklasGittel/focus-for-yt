<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<template>
    <div class="w-full">
        <h2 class="font-bold text-lg">{{ title }}</h2>
        <slot />
    </div>
    <div v-if="subtitle" class="w-full text-muted-foreground text-xs">
        {{ subtitle }}
    </div>
</template>