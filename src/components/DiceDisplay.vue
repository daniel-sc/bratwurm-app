<script setup lang="ts">
import SingleDice from "@/components/SingleDice.vue";
import { computed, reactive } from "vue";
import { QBtn } from "quasar";
import { matAdd } from "@quasar/extras/material-icons";
import type { DiceType } from "@/components/DiceType";

const maxDice = 8;
const showCountOutMin = 4;
const showCountInMin = 4;
const showCountOutMax = maxDice - 1;
const showCountInMax = maxDice - 1;
const showCountOut = computed(() =>
  Math.max(...Object.values(inOutCounts).map((x) => x.out), showCountOutMin)
);
const showCountIn = computed(() =>
  Math.max(...Object.values(inOutCounts).map((x) => x.in), showCountInMin)
);
const totalDiceCount = computed(() =>
  Object.values(inOutCounts).reduce((a, b) => a + b.out + b.in, 0)
);
const hovered = reactive<{
  inOut: "in" | "out" | null;
  diceNo: number;
  i: number;
}>({ inOut: null, diceNo: 0, i: 0 });
const inOutCounts = reactive({
  1: { in: 0, out: 0 },
  2: { in: 0, out: 0 },
  3: { in: 0, out: 0 },
  4: { in: 0, out: 0 },
  5: { in: 0, out: 0 },
  6: { in: 0, out: 0 },
});

const emit = defineEmits<{
  (e: "change", changedInOutCounts: typeof inOutCounts): void;
}>();

function clickDice(diceNo: DiceType, inOut: "in" | "out", i: number) {
  const inOutCount = inOutCounts[`${diceNo}`];
  if (inOutCount[inOut] === i) {
    inOutCount[inOut] = 0;
  } else {
    inOutCount[inOut] = i;
  }
  hovered.inOut = null;
  emit("change", inOutCounts);
}
</script>

// TODO touch support

<template>
  <div class="grid">
    <div
      class="divider"
      :style="{ gridRow: showCountOutMax + 2, gridColumn: '1 / span 6' }"
    >
      Rausgelegt
      <hr />
      Wurf
      <div v-if="totalDiceCount > maxDice" class="warning">
        {{ totalDiceCount - maxDice }} Würfel zuviel
      </div>
      <div v-if="totalDiceCount < maxDice" class="info">
        {{ maxDice - totalDiceCount }} Würfel fehlen
      </div>
    </div>
    <template v-for="(inOut, diceNo) in inOutCounts" :key="diceNo">
      <q-btn
        flat
        round
        color="dark"
        :icon="matAdd"
        :style="{ gridRow: 1, gridColumn: diceNo }"
        :disable="showCountOut === showCountOutMax"
        @click="
          inOutCounts[diceNo]['out'] += 1;
          emit('change', inOutCounts);
        "
      />

      <SingleDice
        :diceNo="diceNo"
        v-for="i in showCountOut"
        :key="i"
        class="dice"
        :class="{
          active: i <= inOut.out,
          hovered:
            hovered.inOut === 'out' &&
            hovered.diceNo === diceNo &&
            hovered.i >= i,
        }"
        :style="{ gridRow: showCountOutMax - i + 2, gridColumn: diceNo }"
        @click="clickDice(diceNo as DiceType, 'out', i)"
        @mouseenter="
          hovered.diceNo = diceNo;
          hovered.i = i;
          hovered.inOut = 'out';
        "
        @mouseleave="hovered.inOut = null"
      />
      <SingleDice
        :diceNo="diceNo"
        v-for="i in showCountIn"
        :key="i"
        class="dice"
        :class="{
          active: i <= inOut.in,
          hovered:
            hovered.inOut === 'in' &&
            hovered.diceNo === diceNo &&
            hovered.i >= i,
        }"
        :style="{ gridRow: showCountOutMax + 2 + i, gridColumn: diceNo }"
        @click="clickDice(diceNo, 'in', i)"
        @mouseenter="
          hovered.diceNo = diceNo;
          hovered.i = i;
          hovered.inOut = 'in';
        "
        @mouseleave="hovered.inOut = null"
      />
      <q-btn
        flat
        round
        color="dark"
        :icon="matAdd"
        :style="{
          gridRow: showCountOutMax + showCountInMax + 3,
          gridColumn: diceNo,
        }"
        :disable="showCountIn === showCountInMax"
        @click="
          inOutCounts[diceNo]['in'] += 1;
          emit('change', inOutCounts);
        "
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
  height: calc(var(--dice-size) - var(--dice-padding));
  width: var(--dice-size);
  padding: calc(0.5 * var(--dice-padding)) var(--dice-padding);
  color: var(--vt-c-divider-dark-2);
}

.dice.active {
  color: black;
}

.dice.hovered {
  color: var(--color-hover);
}

.divider {
  text-align: center;
  position: relative;
}

.warning,
.info {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  background-color: var(--color-background);
  padding: var(--dist-small);
}

.warning {
  color: var(--color-warn);
}

/* TODO animate dice in/out */
</style>
