<template>
  <div>
    <div class="text-center">
        <h1>
            Fruitile Survival
        </h1>        
        <p>
            {{ name }}
        </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const name = ref("");

function setName(_name: string) {
    name.value = _name;
}

const runUserCode = new Function('setName', 'setName("You See Me")');

runUserCode(setName);


</script>

<style scoped>
    h1 {
        margin-top: 24px;
        font-family: sans-serif;
        font-size: 56px;
    }

    p {
        margin-top: 16px;
        font-family: sans-serif;
        font-size: 24px;
        color: rgba(0, 0, 0, 0.5);
    }
    
    .text-center {
        text-align: center;
    }
</style>