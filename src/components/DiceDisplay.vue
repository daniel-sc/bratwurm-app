<script setup lang="ts">
import SingleDice from "@/components/SingleDice.vue";
import { reactive, ref } from "vue";

type DiceType = keyof typeof inOutCounts;
const maxOut = ref(4);
const maxIn = ref(4);
const hovered = reactive<{
  inOut: "in" | "out" | null;
  diceNo: number;
  i: number;
}>({ inOut: null, diceNo: 0, i: 0 });
const inOutCounts = reactive({
  1: { in: 1, out: 0 },
  2: { in: 2, out: 0 },
  3: { in: 3, out: 1 },
  4: { in: 0, out: 2 },
  5: { in: 0, out: 0 },
  6: { in: 0, out: 0 },
});
function clickDice(diceNo: DiceType, inOut: "in" | "out", i: number) {
  if (inOutCounts[diceNo][inOut] === i) {
    inOutCounts[diceNo][inOut] = 0;
  } else {
    inOutCounts[diceNo][inOut] = i;
  }
  hovered.inOut = null;
}
</script>

<template>
  <div class="grid">
    <template v-for="(inOut, diceNo) in inOutCounts" :key="diceNo">
      <SingleDice
        :diceNo="diceNo"
        v-for="i in maxOut"
        :key="i"
        class="dice"
        :class="{
          active: i <= inOut.out,
          hovered:
            hovered.inOut === 'out' &&
            hovered.diceNo === diceNo &&
            hovered.i >= i,
        }"
        :style="{ gridRow: maxOut - i + 1, gridColumn: diceNo }"
        @click="clickDice(diceNo as DiceType, 'out', i)"
        @mouseenter="
          hovered.diceNo = diceNo;
          hovered.i = i;
          hovered.inOut = 'out';
        "
        @mouseleave="hovered.inOut = null"
      />
      <div
        class="divider"
        :style="{ gridRow: maxOut + 1, gridColumn: diceNo }"
      />
      <SingleDice
        :diceNo="diceNo"
        v-for="i in maxIn"
        :key="i"
        class="dice"
        :class="{
          active: i <= inOut.in,
          hovered:
            hovered.inOut === 'in' &&
            hovered.diceNo === diceNo &&
            hovered.i >= i,
        }"
        :style="{ gridRow: maxOut + 1 + i, gridColumn: diceNo }"
        @click="clickDice(diceNo, 'in', i)"
        @mouseenter="
          hovered.diceNo = diceNo;
          hovered.i = i;
          hovered.inOut = 'in';
        "
        @mouseleave="hovered.inOut = null"
      />
    </template>
  </div>
</template>

<style scoped>
.grid {
  width: 100%;
  display: grid;
}

.dice {
  --dice-padding: var(--dist-small);
  --dice-size: calc(min(100vw, var(--screen-max-width)) / 6);
  height: var(--dice-size);
  width: var(--dice-size);
  padding: var(--dice-padding);
  color: var(--vt-c-divider-dark-2);
}

.dice.active {
  color: black;
}

.dice.hovered {
  color: var(--hover-color);
}

.divider {
  border-bottom: 2px solid black;
  margin: var(--dist-small) 0;
}
</style>
