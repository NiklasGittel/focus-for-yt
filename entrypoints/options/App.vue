<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "vue-sonner";

import StrictModeOptionsSection from "@/lib/features/strictMode/components/StrictModeOptionsSection.vue";
import UsageLimitOptionsSection from "@/lib/features/usageLimit/components/UsageLimitOptionsSection.vue";
import OptionsHeader from "./components/OptionsHeader.vue";
</script>

<template>
  <OptionsHeader />
  <div class="p-4 flex flex-col gap-6 max-w-3xl mx-auto">
    <StrictModeOptionsSection />
    <UsageLimitOptionsSection />

    <Toaster />
  </div>
</template>
