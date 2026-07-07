<script setup lang="ts">
import Switch from '@/components/ui/switch/Switch.vue';
import { strictModeDeactivationTimeItem, strictModeItem } from '@/lib/shared/services/storageService.js';
import OptionsSectionItem from '@/entrypoints/options/components/OptionsSectionItem.vue';
import StrictModeDialog from './StrictModeDialog.vue';
import { sendMessage } from '../../messaging/messaging.service.js';
import { PAUSE_STRICT_MODE_MESSAGE } from '../../messaging/messaging.constants.js';

const strictMode = ref(false);
const deactivationTimer = ref(0);
const openDialog = ref(false);
const endTime = ref<number | null>(null);
onMounted(async () => {
    strictMode.value = await strictModeItem.getValue();
    deactivationTimer.value = await strictModeDeactivationTimeItem.getValue() ?? 0;
});

strictModeDeactivationTimeItem.watch(async (newValue) => {
    deactivationTimer.value = newValue ?? 0;
});

strictModeItem.watch(async (newValue, _) => {
    strictMode.value = newValue;
});

function onValueChanged(newValue: boolean) {
    if (!newValue && deactivationTimer.value > 0) {
        openDialog.value = true;
        return;
    }
    strictMode.value = newValue;
    strictModeItem.setValue(strictMode.value);
}

function onDeactivateButtonClick() {
    strictMode.value = false;
    strictModeItem.setValue(strictMode.value);
    openDialog.value = false;
    endTime.value = null;
}

function onCancel() {
    openDialog.value = false;
    endTime.value = null;
}

function onPause() {
    openDialog.value = false;
    sendMessage(PAUSE_STRICT_MODE_MESSAGE, 10);
}

</script>

<template>
    <StrictModeDialog v-model:openDialog="openDialog" v-model:deactivationTimer="deactivationTimer" @pause="onPause"
        @deactivate="onDeactivateButtonClick" @cancel="onCancel" />
    <OptionsSectionItem title="Activate strict mode"
        subtitle="Prevents features from being turned off without confirmation">
        <Switch :model-value="strictMode" @update:model-value="onValueChanged" />
    </OptionsSectionItem>
</template>