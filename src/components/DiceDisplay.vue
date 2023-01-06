<template>
  <div class="flex-row">
    <div class="dice-container" v-for="no in diceCount" :key="no">
      <SingleDice :diceNo="no" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SingleDice from "@/components/SingleDice.vue";

const diceCount = 6;
</script>

<style scoped>
.dice-container {
  width: 100px;
  height: 100px;
  fill: aqua;
  color: darkmagenta;
  overflow: hidden;
}
</style>