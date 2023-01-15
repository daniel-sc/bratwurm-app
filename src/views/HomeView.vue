<script setup lang="ts">
import DiceDisplay from "@/components/DiceDisplay.vue";
import ShowProbabilities from "@/components/ShowProbabilities.vue";
import { shallowRef } from "vue";

const inOutCounts = shallowRef({
  1: { in: 0, out: 0 },
  2: { in: 0, out: 0 },
  3: { in: 0, out: 0 },
  4: { in: 0, out: 0 },
  5: { in: 0, out: 0 },
  6: { in: 0, out: 0 },
});
</script>

<template>
  <main class="main">
    <DiceDisplay @change="(x) => (inOutCounts = x)" />
    <ShowProbabilities :in-out-counts="inOutCounts" />
  </main>
</template>

<style scoped>
.main {
  margin-bottom: var(--dist-large);
}
</style>
