<template>
  <div>
    <h1>Name: <span>{{ characterName }}</span></h1>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    characterName: string;
  }>();

  defineEmits({

  });
</script>

<style scoped>

</style>