<script setup lang="ts">
import { SettingsIcon } from '@lucide/vue'
import { Button } from '@/components/ui/button'

const onButtonClick = () => {
  browser.runtime.openOptionsPage();
}

</script>

<template>
  <Button variant="ghost" size="sm" @click="onButtonClick" class="text-muted-foreground">
    <SettingsIcon />
  </Button>
</template>
