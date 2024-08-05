<template>
  <div class="bg">
    <div v-if="me.name" class="flex">
      <div v-for="c of [me, opponent]" :key="c.name" class="flex grow">
        <h1 class="text-center text-lg font-sans font-bold text-white tracking-wider">{{ c.name }}: {{  c.score ?? 0 }}</h1>
      </div>
    </div>
    <Character :segments="me.bodyParts ?? []" class="character" :style="position.getStyle(me.x, me.y, me.height)" />
    <Character :segments="opponent.bodyParts ?? []" class="opponent character" :style="position.getStyle(opponent.x, opponent.y, opponent.height)" />
    <Fruit v-for="f of fruit" :key="f.x + f.y" :x="f.x" :y="f.y"/>
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
  height: number;
  score?: number;
}

export interface Fruit {
  x: number;
  y: number;
}

const props = defineProps<{
  me: Character;
  opponent: Character;
  fruit: Fruit[];
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
  --character-width: 128px;
  --character-height: 256px;
  width: var(--character-width);
  height: var(--character-height);
  border: red solid 1px;
}

.me {  
  top: calc(100vh - var(--character-height) - v-bind(meY));
  left: calc(50% + v-bind(meX));
}

.opponent {
  top: calc(100vh - var(--character-height) - v-bind(opponentY));
  left: calc(50% - (var(--character-width)) + v-bind(opponentX));
}
</style>