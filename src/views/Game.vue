<template>
  <div class="bg">
    <img class="fire" src="/img/fire.gif" alt="animated fire GIF">
    <div class="platform">width: 300. x: 300 y: 600</div>
    <div v-if="me.name" class="flex">
      <div v-for="c of [me, opponent]" :key="c.name" class="flex grow">
        <h1 class="text-center text-lg font-sans font-bold text-white tracking-wider">{{ c.name }}: {{  c.score ?? 0 }}</h1>
      </div>
    </div>
    <Character :segments="me.bodyParts ?? []" class="character" :style="position.getStyle(me.x, me.y, me.height, me.rotation)" />
    <Character :segments="opponent.bodyParts ?? []" class="opponent character" :style="position.getStyle(opponent.x, opponent.y, opponent.height, opponent.rotation)" />    
    <Fruit v-for="f of fruit" :style="position.getStyle(f.x, f.y, 56)" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import usePosition from "@/usePosition";
import Character from "./Character.vue"
import Fruit from "./Fruit.vue"

const position = usePosition();

export interface Character {
  name?: string;
  age?: number;
  isHappy?: boolean;
  bodyParts?: string[];
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
  score: number;
}

export interface Fruit {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

const props = defineProps<{
  me: Character;
  opponent: Character;
  fruit: Fruit[];
  collisions: { type: 'fruit' | 'opponent', id?: string }[];
}>();

defineEmits({

});

const meY = computed(() => {
  const y = props.me.y;
  return y + 'px';
})

const meX = computed(() => {
  const x = props.me.x;
  return x + 'px';
})

const opponentY = computed(() => {
  const y = props.opponent.y;
  return y + 'px';
})

const opponentX = computed(() => {
  const x = props.opponent.x;
  return x + 'px';
})


</script>

<style scoped>
.bg {
  background-color: black;
  position: relative;
  overflow: hidden;
}

.character {
  --character-width: 96px;
  --character-height: 256px;
  width: var(--character-width);
  height: var(--character-height);
  /* border: red solid 1px; */
}

.me {  
  top: calc(100vh - var(--character-height) - v-bind(meY));
  left: calc(50% + v-bind(meX));
}

.opponent {
  top: calc(100vh - var(--character-height) - v-bind(opponentY));
  left: calc(50% - (var(--character-width)) + v-bind(opponentX));
}

.fire {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.platform {
  position: absolute;
  width: 300px;
  height: 20px;
  background-color: brown;
  color: white;
  left: 300px;
  top: calc(100vh - 600px);
}
</style>