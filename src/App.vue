<script setup lang="ts">
</script>

<template>  
  <div class="grid-container">
    <div v-for="i in 60" class="grid-item">
      <div class="grid-item-content">
        {{ i }}
      </div>      
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
}

.grid-item {
  border: 1px solid #ccc;
  padding-top: 100%; /* Aspect ratio hack for squares */
  position: relative;
}

.grid-item-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
