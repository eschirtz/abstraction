<template>
  <div>
    <h1>Name: <span>{{ character.name }}</span></h1>
    <h1>Age: <span>{{ character.age }}</span></h1>
    <h1>Is Happy: <span>{{ character.isHappy }}</span></h1>
  </div>
</template>

<script lang="ts" setup>
  
  export interface Character {
    name?: string;
    age?: number;
    isHappy?: boolean;
  }

  defineProps<{
    character: Character;
  }>();

  defineEmits({

  });
</script>

<style scoped>

</style>