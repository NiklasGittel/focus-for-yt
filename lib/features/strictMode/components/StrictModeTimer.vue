<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import OptionsSectionItem from '@/entrypoints/options/components/OptionsSectionItem.vue';
import {  strictModeDeactivationTimeItem, strictModeItem } from '@/lib/shared/services/storageService.js';
import { toast } from 'vue-sonner';

const deactivationTimer = ref<number>(0);
const strictMode = ref(false);

onMounted(async () => {
    deactivationTimer.value = await strictModeDeactivationTimeItem.getValue();
    strictMode.value = await strictModeItem.getValue();
});

strictModeItem.watch(async (newValue) => {
    strictMode.value = newValue;
});

strictModeDeactivationTimeItem.watch(async (newValue) => {
    deactivationTimer.value = newValue;
});

async function onValueChanged(newValue: any) {
    if (!(typeof newValue === 'number')) console.log('Unexpected value type for deactivation timer:', newValue);

    if (await strictModeItem.getValue() && deactivationTimer.value > newValue) {
        toast('Deactivation timer can only be increased while strict mode is active.');
        return;
    }
    await strictModeDeactivationTimeItem.setValue(newValue);
}
</script>

<template>
    <OptionsSectionItem title="Deactivation timer"
        subtitle="Add a timer to prevent instant deactivation of strict mode">
        <Select :model-value="deactivationTimer" @update:model-value="onValueChanged">
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <!-- Tooltip would be required. Until then toast notification is shown when trying to select a lower value while strict mode is active. -->
                <SelectItem :value="0" :disabled="false && deactivationTimer > 0 && strictMode">
                    Off
                </SelectItem>
                <SelectItem :value="1" :disabled="false && deactivationTimer > 1 && strictMode">
                    1 min
                </SelectItem>
                <SelectItem :value="5" :disabled="false && deactivationTimer > 5 && strictMode">
                    5 min
                </SelectItem>
                <SelectItem :value="10" :disabled="false && deactivationTimer > 10 && strictMode">
                    10 min
                </SelectItem>
            </SelectContent>
        </Select>
    </OptionsSectionItem>
</template>