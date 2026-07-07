<script setup lang="ts">
defineProps<{
    title?: string;
    subtitle?: string;
}>();

</script>

<template>
    <div class="flex flex-row w-full justify-between items-center">
        <div class="flex flex-col justify-start items-start">
            <span v-if="title" class="font-medium">{{ title }}</span>
            <p v-if="subtitle" class="text-xs text-muted-foreground">{{ subtitle }}</p>
        </div>
        <slot />
    </div>
</template>