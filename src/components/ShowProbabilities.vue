<template>
  <div class="prob-container">
    <template v-for="diceNo in 6" :key="diceNo">
      <div class="prob">{{ getProb(diceNo, "FW") }}</div>
      <div class="label" v-if="diceNo !== 6">FW</div>
    </template>
    <template v-for="worm in 4" :key="worm">
      <template v-for="diceNo in 6" :key="diceNo">
        <div class="prob">{{ getProb(diceNo, `${worm}-worm` as any) }}</div>
        <SingleWorm
          v-if="diceNo !== 6"
          :count="worm"
          class="label"
        ></SingleWorm>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { probs } from "@/components/db";
import type { DiceType } from "@/components/DiceType";
import { TARGETS } from "@/components/DiceType";
import SingleWorm from "@/components/SingleWorm.vue";

const props = defineProps<{
  inOutCounts: Record<DiceType, { in: number; out: number }>;
}>();

function getProb(
  diceNo: number,
  mode: "1-worm" | "2-worm" | "3-worm" | "4-worm" | "FW"
) {
  switch (mode) {
    case "1-worm":
      return getProbTarget(diceNo, 21, "sum");
    case "2-worm":
      return getProbTarget(diceNo, 25, "sum");
    case "3-worm":
      return getProbTarget(diceNo, 29, "sum");
    case "4-worm":
      return getProbTarget(diceNo, 33, "sum");
    case "FW":
      return getFw(diceNo);
  }
}
function getFw(diceNo: string | number) {
  const inOutCount = props.inOutCounts[`${diceNo}` as unknown as DiceType];
  if (inOutCount.in === 0 || inOutCount.out > 0) {
    return "";
  }
  const diceCounts = Object.values(props.inOutCounts).map((inOut, i) =>
    `${i + 1}` === `${diceNo}` ? inOut.in : inOut.out
  );
  if (diceCounts.reduce((a, b) => a + b, 0) === 8) {
    return "";
  }
  const key = diceCounts.join("");
  return probs.value.get(key)?.fw ?? "?";
}
function getProbTarget(
  diceNo: string | number,
  target: number,
  sumOrExact: "sum" | "exact"
) {
  const inOutCount = props.inOutCounts[`${diceNo}` as unknown as DiceType];
  if (inOutCount.in === 0 || inOutCount.out > 0) {
    return "";
  }
  const diceCounts = Object.values(props.inOutCounts).map((inOut, i) =>
    `${i + 1}` === `${diceNo}` ? inOut.in : inOut.out
  );
  if (diceCounts.reduce((a, b) => a + b, 0) === 8) {
    const sum = diceCounts
      .map((x, i) => x * Math.min(i + 1, 5))
      .reduce((a, b) => a + b, 0);
    if (sumOrExact === "sum") {
      return sum >= target ? "1" : "0";
    } else {
      return sum === target ? "1" : "0";
    }
  }
  const key = diceCounts.join("");
  return probs.value.get(key)?.[sumOrExact][TARGETS.indexOf(target)] ?? "?";
}
</script>

<style scoped>
.prob-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr max-content) 1fr;
  justify-items: center;
  align-items: center;

  /* assure vertical alignment with dice: */
  margin-left: 1em;
  margin-right: 1em;
}

.prob {
  text-align: center;
}
.label {
  color: var(--vt-c-divider-dark-2);
  min-height: 1.5em;
}
</style>
