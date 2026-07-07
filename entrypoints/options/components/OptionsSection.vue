<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import OptionsSectionHeading from './OptionsSectionHeading.vue';

defineProps<{
    title: string;
    subtitle?: string;
}>();

</script>

<template>
    <div class="w-full">
        <OptionsSectionHeading  :title="title" :subtitle="subtitle" />
        <Card class="mt-4 p-4">
            <slot />
        </Card>
    </div>
</template>