<template>
  <div class="flex h-screen max-h-screen grid grid-cols-2">
    <div class="flex flex-col">
      <div id="editor" class="grow shrink min-h-0 overflow-auto"></div>
      <button @click="runCode">Run code</button>
    </div>
    <GameSplash v-if="loading" />
    <Game v-else :character-name="name" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { basicSetup, EditorView } from "codemirror"
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript"
import GameSplash from "./views/GameSplash.vue";
import Game from "./views/Game.vue";

const STORAGE_KEY = "v0.code"

const loading = ref(true);
const name = ref("");

function setName(_name: string) {
  name.value = _name;
}

let editorView: EditorView;

function runCode() {
  try {
    const userCode = editorView.state.doc.toString();
    const runUserCode = new Function('setName', userCode);
    runUserCode(setName);
    loading.value = false;
    localStorage.setItem(STORAGE_KEY, userCode);
  } catch (e) {
    alert(e);
  }
}

onMounted(() => {
  const placeholder = 
  `// Hello Sunnyslope
console.log("Welcome to Fruitile Survival")`
  const storedCode = localStorage.getItem(STORAGE_KEY) ?? placeholder;
  editorView = new EditorView({
    doc: storedCode,
    extensions: [basicSetup, javascript(), oneDark],    
    parent: document.getElementById('editor') as Element
  });  
});



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

button {
  background-color: black;
  color: white;
  height: 64px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;
  font-weight: bold;  
  letter-spacing: 2px;
}

.text-center {
  text-align: center;
}

#editor {
  background: #282c34; /* Match one-dark theme */
}
</style>