<template>
  <div class="bg">
    <h1>Name: <span>{{ character.name }}</span></h1>
    <h1>Age: <span>{{ character.age }}</span></h1>
    <h1>Is Happy: <span>{{ character.isHappy }}</span></h1>
    
    <Character :segments="character.bodyParts ?? []" class="character"/>
  </div>
</template>

<script lang="ts" setup>
import Character from "./Character.vue"

export interface Character {
  name?: string;
  age?: number;
  isHappy?: boolean;
  bodyParts?: string[];
}

const props = defineProps<{
  character: Character;
}>();

defineEmits({

});


</script>

<style scoped>
.bg {
  background-color: black;
  position: relative;
}

.character {
  --character-height: 256px;
  height: var(--character-height);
  position: absolute;
  top: calc(100vh - var(--character-height) - 16px);
}
</style>