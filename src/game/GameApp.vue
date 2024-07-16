<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Environment from './Environment';
import type { EnvironmentCell } from './Environment';
import Character from './Character';

const backgroundMap = ref<EnvironmentCell[]>([]);
const backgroundDimensions = ref<{ width: number; height: number }>({ width: 10, height: 6 });

const characterStyle = ref<{ width: string; height: string; top: string; left: string }>();

function setCharacterStyle(c: Character) {
  characterStyle.value = {
    width: `${(c.width / backgroundDimensions.value.width) * 100}%`,
    height: `${(c.height / backgroundDimensions.value.height) * 100}%`,
    top: `${(c.y / backgroundDimensions.value.height) * 100}%`,
    left: `${(c.x / backgroundDimensions.value.width) * 100}%`,
  };
}

const env = new Environment();
const character = new Character(0.5, 0.5);

const leftPressed = ref(false);
const rightPressed = ref(false);
const upPressed = ref(false);
const downPressed = ref(false);
const jumpPressed = ref(false);

function animationFrame() {
  const characterForceVector = { x: 0, y: 0 };

  const pushForce = { x: leftPressed.value ? -1 : rightPressed.value ? 1 : 0, y: upPressed.value ? -1 : downPressed.value ? 1 : 0 };

  characterForceVector.x = pushForce.x;
  characterForceVector.y = pushForce.y;

  // Update game objects  
  character.update(characterForceVector, env);

  // Render game objects
  setCharacterStyle(character);

  requestAnimationFrame(animationFrame);
}

onMounted(() => {
  backgroundMap.value = env.getMap1D();
  animationFrame();

  // Add event listener for keyboard input
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      rightPressed.value = true;
    }
    if (e.key === 'ArrowLeft') {
      leftPressed.value = true;
    }
    if (e.key === 'ArrowUp') {
      upPressed.value = true;
    }
    if (e.key === 'ArrowDown') {
      downPressed.value = true;
    }
    if (e.key === ' ') {
      jumpPressed.value = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
      rightPressed.value = false;
    }
    if (e.key === 'ArrowLeft') {
      leftPressed.value = false;
    }
    if (e.key === 'ArrowUp') {
      upPressed.value = false;
    }
    if (e.key === 'ArrowDown') {
      downPressed.value = false;
    }
  });

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
  padding-top: 100%;
  /* Aspect ratio hack for squares */
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
