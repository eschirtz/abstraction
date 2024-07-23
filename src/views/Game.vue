<template>
  <div>
    <h1>Name: <span>{{ character.name }}</span></h1>
    <h1>Age: <span>{{ character.age }}</span></h1>
    <h1>Is Happy: <span>{{ character.isHappy }}</span></h1>
    <div>
      <div class="character flex flex-col items-center">
        <img v-for="part in character.bodyParts" :src="getURL(part)"></img>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>


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

function getURL(part: string) {
  switch (part) {
    case 'head':
      return props.character.isHappy ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/640px-Smiley.svg.png" : "https://cdn.pixabay.com/photo/2020/12/08/01/16/sad-5813194_1280.png"
    case 'body':
      return "https://i5.walmartimages.com/seo/White-Polo-T-Shirts-For-Men-Mens-Fashion-Casual-Solid-Color-Cotton-V-Neck-Button-Short-Sleeve-T-Shirt-Top_12484ca4-6cdd-4509-a6ad-6676af8c97a3.faf01bd2e4f83fca64f7adb9f705bd41.jpeg"
    case "legs":
      return "https://www.mrporter.com/variants/images/10163292708421485/in/w2000_q60.jpg"
    default:
      return part;
  }  
}
</script>

<style scoped>
img {
  max-height: 25vh;
}
</style>