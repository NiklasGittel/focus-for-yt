<template>
    <li class="flex flex-row w-full items-center">
        <slot></slot>
        <span>{{ title }}</span>
        <Switch class="ml-auto" v-model="model" :disabled="disabled" />
    </li>
</template>

<script setup lang="ts">
import Switch from '@/components/ui/switch/Switch.vue';

const model = defineModel<boolean>({ required: true })

defineProps<{
    title: string,
    disabled?: boolean
}>()
</script>
