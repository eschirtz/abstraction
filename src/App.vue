<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Environment from './game/Environment';
import type { EnvironmentCell } from './game/Environment';
import Character from './game/Character';

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
const character = new Character(1, 3);

const leftPressed = ref(false);
const rightPressed = ref(false);
const jumpPressed = ref(false);

function animationFrame() {
  const forceVector = { x: 0, y: 0 };

  const gravity = 0.05; // acceleration

  if (leftPressed.value) {
    forceVector.x = -1;
  }
  if (rightPressed.value) {
    forceVector.x = 1;
  }
  if (character.isOnGround() && jumpPressed.value) {
    forceVector.y = -50;
    jumpPressed.value = false;
  } else if (!character.isOnGround()) {
    forceVector.y = character.mass * gravity;
  }

  // Ground plane
  if (character.y <= 3) {
    forceVector.y
  } else {
    forceVector.y = 0;
    character.velocityY = 0;
  }

  // Update game objects
  character.applyForce(forceVector);
  character.update();
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
  /* border: 1px solid red; */
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
