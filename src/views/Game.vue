<template>
  <div class="bg">
    <div v-if="character.name" class="p-4" style="background-color: darkred;">
      <h1 class="text-center text-lg font-sans font-bold text-white tracking-wider">{{ character.name }}</h1>
    </div>
    
    <Character :segments="character.bodyParts ?? []" class="character"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Character from "./Character.vue"

export interface Character {
  name?: string;
  age?: number;
  isHappy?: boolean;
  bodyParts?: string[];
  x: number;
  y: number;
}

const props = defineProps<{
  character: Character;
}>();

defineEmits({

});

const characterX = computed(() => {
  const x = props.character.x
  return x + 'px'
})


</script>

<style scoped>
.bg {
  background-color: black;
  position: relative;
  overflow: hidden;
}

.character {
  --character-width: 128px;
  --character-height: 256px;
  width: var(--character-width);
  height: var(--character-height);
  position: absolute;
  top: calc(100vh - var(--character-height));
  left: calc(50% - (var(--character-width) / 2) + v-bind(characterX));
}
</style>