<template>
    <div class="w-full my-1 mb-3 text-xs text-muted-foreground font-bold flex flex-row items-center justify-between">
        <span>{{ title.toUpperCase() }}</span>
        <slot />
    </div>
</template>

<script setup lang="ts">

defineProps<{
    title: string
}>()

</script>