<template>
  <div class="bg">
    <h1 class="title">FRUITAL SURVIVAL</h1>
    <img class="fire" :src="fireGIF" alt="animated fire GIF">
  </div>
</template>

<script lang="ts" setup>

const fireGIF = "/img/fire.gif";
</script>

<style scoped>
.bg {
  background-color: black;
  height: 100vh;
  position: relative;
}

.title {
  color: white;
  text-align: center;
  left: 0;
  right: 0;
  top: 360px;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 36px;
  letter-spacing: 2px;
  position: absolute;
  z-index: 1;
}

.fire {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>