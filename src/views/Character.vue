<template>
    <div class="character flex flex-col items-center">
        <img class="shrink" v-for="segment in segments ?? []" :src="getURL(segment)"></img>
    </div>
</template>

<script lang="ts" setup>
  defineProps<{
    segments: string[]
  }>();

  defineEmits({

  });

function getURL(part: string) {
  switch (part) {
    case 'head':
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/640px-Smiley.svg.png"
    case 'body':
      return "https://purepng.com/public/uploads/large/white-tshirt-n0j.png"
    case "legs":
      return "https://pngimg.com/d/jeans_PNG5748.png"
    default:
      return part;
  }  
}

</script>
<style scoped>
img {
  aspect-ratio: 1;
  object-fit: cover;
  min-height: 0;
}
</style>