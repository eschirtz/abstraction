<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import Environment from './game/Environment';
import type { EnvironmentCell } from './game/Environment'; 

const backgroundMap = ref<EnvironmentCell[]>([]);
const backgroundDimensions = ref<{width: number; height: number}>({width: 10, height: 6});
const character = ref<{x: number; y: number; width: number; height: number; }>({
  x: 1,
  y: 3,
  width: 1,
  height: 1,
});

const characterStyle = computed(() => ({
  width: `${(character.value.width / backgroundDimensions.value.width) * 100}%`,
  height: `${(character.value.height / backgroundDimensions.value.height) * 100}%`,
  top: `${(character.value.y / backgroundDimensions.value.height) * 100}%`,
  left: `${(character.value.x / backgroundDimensions.value.width) * 100}%`,
}));

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
    <div class="character" :style="characterStyle"></div>
  </div>
</template>

<style scoped>
.main {
  position: relative;
}

.character {
  background: black;
  position: absolute;
  border-radius: 100%;
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
