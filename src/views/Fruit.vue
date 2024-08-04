<template>
  <img class="watermelon" src="/img/watermelon.gif" alt="watermelon GIF">
</template>

<script lang="ts" setup>
  import { computed } from "vue";

  const props = defineProps<{
    x: number;
    y: number;
  }>();

  defineEmits({

  });

  const Y = computed(() => {
  const y = props.y;
  return y + 'px';
})

const X = computed(() => {
  const x = props.x;
  return x + 'px';
})

</script>
<style scoped>
img {
  --width: 56px;
  --height: 56px;
  object-fit: contain;
  width: var(--width);
  height: var(--height);
  position: absolute;
  top: calc(100vh - var(--height) - v-bind(Y));
  left: calc(50% - (var(--width) / 2) + v-bind(X));
}
</style>