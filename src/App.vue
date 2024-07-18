<template>
  <div>
    <div class="text-center">
        <h1>
            Fruitile Survival
        </h1>        
        <p>
            {{ name }}
        </p>
        <textarea v-model="userCode"></textarea>
        <button @click="runCode">Submit</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const userCode = ref("");

const name = ref("");

function setName(_name: string) {
    name.value = _name;
}


function runCode() {
    const runUserCode = new Function('setName', userCode.value);
    runUserCode(setName);
}



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