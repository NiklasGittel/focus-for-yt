<script setup lang="ts">
import OptionsSection from '@/entrypoints/options/components/OptionsSection.vue';
import StrictModeToggle from './StrictModeToggle.vue';
import StrictModeTimer from './StrictModeTimer.vue';
</script>

<template>
    <OptionsSection title="Strict mode" subtitle="Enabling strict mode will make it harder to turn off features.">
        <StrictModeToggle />
        <StrictModeTimer />
    </OptionsSection>
</template>