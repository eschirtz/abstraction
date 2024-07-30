<template>
  <div class="bg">
    <h1 class="title">FRUITAL SURVIVAL</h1>
    <img class="watermelon" :src="watermelonGIF" alt="watermelon GIF">
    <img class="banana" :src="bananaGIF" alt="banana GIF">
    <img class="fire" :src="fireGIF" alt="animated fire GIF">
  </div>
</template>

<script lang="ts" setup>

const bananaGIF = "/img/banana.gif";
const watermelonGIF = "/img/watermelon.gif"
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

.watermelon {
  width: 210px;
  height: 210px;
  top: 160px;
  left: 15%;  
  transform: rotate(-25deg);
  position: absolute;
  object-fit: contain;
  z-index: 2;
}

.banana {
  width: 200px;
  height: 200px;
  top: 100px;
  right: 20%;  
  transform: rotate(-25deg);
  position: absolute;
  object-fit: contain;
  z-index: 2;
}
</style>