<template>
  <div>
    <div class="">
        <h1>
            Fruitile Survival
        </h1>        
        <p>
            {{ name }}
        </p>        
        <div id="editor"></div>
        <button @click="runCode">Run code</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { basicSetup, EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"

const name = ref("");

function setName(_name: string) {
    name.value = _name;
}

let editorView: EditorView;

function runCode() {
    const userCode = editorView.state.doc.toString();
    const runUserCode = new Function('setName', userCode);
    runUserCode(setName);
}

onMounted(() => {
    editorView = new EditorView({
        doc: "console.log('Hello')\n",
        extensions: [basicSetup, javascript()],
        parent: document.getElementById('editor') as Element
    });
})



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