<template>
  <div class="bg">
    <h1>Name: <span>{{ character.name }}</span></h1>
    <h1>Age: <span>{{ character.age }}</span></h1>
    <h1>Is Happy: <span>{{ character.isHappy }}</span></h1>
    
    <Character :segments="character.bodyParts ?? []" style="height: 128px;" />
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
}
</style>