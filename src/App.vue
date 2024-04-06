<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Environment from './game/Environment';
import type { EnvironmentCell } from './game/Environment';

const backgroundMap = ref<EnvironmentCell[]>([]);

onMounted(() => {
  const env = new Environment();
  backgroundMap.value = env.getMap1D();
});


</script>

<template>
  <div class="main">
    <!-- Environment background -->
    <div class="grid-container">
      <div v-for="i in backgroundMap" class="grid-item">
        <div class="grid-item-content" :class="i"></div>
      </div>
    </div>
    <!-- Character -->
    <div class="character"></div>
  </div>
</template>

<style scoped>
.main {
  position: relative;
}

.character {
  width: v-bind("(1 / 10) * 100 + `%`");
  height: v-bind("(1 / 6) * 100 + `%`");
  background: black;
  position: absolute;
  top: 0;
  left: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.grid-item {
  border: 1px solid red;
  padding-top: 100%; /* Aspect ratio hack for squares */
  position: relative;
}

.grid-item-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-item-content.solid {  
  background-color: #333;
}

</style>
