<template>
  <div class="flex-row">
    <div v-for="no in diceCount" :key="no">
      <Dice :diceNo="no" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Dice from "@/components/Dice.vue";

const diceCount = 6;
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
  fill: aqua;
  color: darkmagenta;
}
</style>