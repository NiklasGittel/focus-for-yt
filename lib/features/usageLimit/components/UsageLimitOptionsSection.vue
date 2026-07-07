<script setup lang="ts">
import UsageLimitToggle from './UsageLimitToggle.vue';
import UsageLimitDefinition from './UsageLimitDefinition.vue';
import OptionsSection from '@/entrypoints/options/components/OptionsSection.vue';
</script>

<template>
    <OptionsSection title="Usage Limit"
        subtitle="Enabling usage limit will block access to YouTube after exceeding the defined daily limit.">
        <UsageLimitToggle />
        <!-- <UsageLimitType /> -->
        <UsageLimitDefinition />
    </OptionsSection>
</template>