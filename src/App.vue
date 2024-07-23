<template>
  <div class="flex h-screen max-h-screen grid grid-cols-2">
    <div class="flex flex-col">
      <div id="editor" class="grow shrink min-h-0 overflow-auto"></div>
      <button @click="runCode">Run code</button>
    </div>
    <GameSplash v-if="loading" />
    <Game v-else :character="character" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { basicSetup, EditorView } from "codemirror"
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript"
import GameSplash from "./views/GameSplash.vue";
import Game from "./views/Game.vue";
import type { Character } from "./views/Game.vue"

const STORAGE_KEY = "v0.code"

const loading = ref(true);
const character = ref<Character>({});

function setName(_name: string) {
  if (typeof _name !== 'string' || !_name.length) throw new Error("Name must be of type \"String\"");
  character.value.name = _name;
}

function setAge(_age: number) {
  if (typeof _age !== 'number') throw new Error("Age must be of type \"Number\"");
  character.value.age = _age;
}

function setIsHappy(_isHappy: boolean) {
  if (typeof _isHappy !== 'boolean') throw new Error("isHappy must be of type \"Boolean\"");
  character.value.isHappy = _isHappy;
}

let editorView: EditorView;

function runCode() {
  try {
    const userCode = editorView.state.doc.toString();
    const runUserCode = new Function('setName', 'setAge', 'setIsHappy', userCode);
    runUserCode(setName, setAge, setIsHappy);
    loading.value = false;
    localStorage.setItem(STORAGE_KEY, userCode);
  } catch (e) {
    alert(e);
  }
}

onMounted(() => {
  const placeholder =
    `/**
 * Coding your first game, class #2
 * 
 * Functions:
 * - setName(<string>)
 * - setAge(<number>)
 * - setIsHappy(<boolean>)
 * - setAppearance(<array>)
 */
`
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
  background: #282c34;
  /* Match one-dark theme */
}
</style>