<template>
  <div class="bg">
    <h1>Name: <span>{{ character.name }}</span></h1>
    <h1>Age: <span>{{ character.age }}</span></h1>
    <h1>Is Happy: <span>{{ character.isHappy }}</span></h1>
    
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