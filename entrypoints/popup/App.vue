<script setup lang="ts">
  import ChannelWhitelistSection from "@/lib/features/channelWhitelist/components/ChannelWhitelistSection.vue";
  import QuickSettingsSection from "@/lib/features/quicksettings/components/QuickSettingsSection.vue";
  import PopupFooter from "./components/PopupFooter.vue";
</script>

<template>
  <div class="flex flex-col justify-start items-center h-full w-sm">
    <QuickSettingsSection />
    <ChannelWhitelistSection />
    <Footer />
    <PopupFooter />
  </div>
</template>
