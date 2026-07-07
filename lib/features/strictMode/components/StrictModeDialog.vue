<script setup lang="ts">
import Switch from "@/components/ui/switch/Switch.vue";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button/Button.vue";
import Progress from "@/components/ui/progress/Progress.vue";

const open = defineModel<boolean>("openDialog", { required: true });
const deactivationTimer = defineModel<number>("deactivationTimer", { required: true });
const pauseDialogOpen = ref(false);

defineProps<{
  onCancel: () => void;
  onDeactivate: () => void;
  onPause: () => void;
}>();

let frameId: number;

const endTime = ref<number | null>(null);
const now = ref(Date.now());

const isDialogButtonDisabled = computed(() => secondsRemaining.value > 0);

const secondsRemaining = computed(() => {
  if (!endTime.value) return 0;
  return (endTime.value - now.value) / 1000;
});

const progressPercentage = computed(() => {
  if (!endTime.value) return 100;
  const total = deactivationTimer.value * 60 * 1000;
  const elapsed = Math.max(0, endTime.value - now.value);
  const percentage = 100 - Math.min(100, Math.max(0, ((total - elapsed) / total) * 100));
  return percentage === null ? 0 : percentage;
});

function startTimer() {
  endTime.value = Date.now() + deactivationTimer.value * 60 * 1000;
  function update() {
    now.value = Date.now();
    if (now.value < endTime.value!) {
      frameId = requestAnimationFrame(update);
    }
  }
  frameId = requestAnimationFrame(update);
}

watch(
  () => open.value,
  (newValue) => {
    if (newValue && deactivationTimer.value > 0) {
      startTimer();
    } else {
      console.log("Clearing timer");
      endTime.value = null;
      cancelAnimationFrame(frameId);
    }
  }
);

const openPause = () => {
  pauseDialogOpen.value = true;
};

onUnmounted(() => cancelAnimationFrame(frameId));
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deactivate strict mode?</DialogTitle>
        <DialogDescription>
          You have set a deactivation timer of {{ deactivationTimer }} minutes. Are you
          sure you want to deactivate strict mode?
        </DialogDescription>
      </DialogHeader>
      <!-- <Dialog v-model:open="pauseDialogOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pause instead?</DialogTitle>
            <DialogDescription>
              You can pause strict mode instead for 10 minutes without losing your settings.
              Do you want to pause strict mode instead of deactivating it?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button @click="onDeactivate" variant="outline">No</Button>
            <Button @click="onPause">Yes, pause instead</Button>
          </DialogFooter>
        </DialogContent> 
      </Dialog>-->
      <Progress :model-value="progressPercentage" class="mb-4" />
      <DialogFooter>
        <Button @click="onDeactivate" variant="outline" :disabled="isDialogButtonDisabled">Deactivate</Button>
        <Button @click="onCancel">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
