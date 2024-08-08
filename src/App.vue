<template>
  <div class="flex h-screen max-h-screen grid grid-cols-2">
    <div class="flex flex-col code-window">
      <div id="editor" class="grow shrink min-h-0 overflow-auto"></div>
      <button @click="runCode" class="shrink-0">Run code</button>
    </div>
    <GameSplash v-if="loading" />
    <Game v-else :me="character" :opponent="opponent" :fruit="fruit" :collisions="currentCollisions" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { basicSetup, EditorView } from "codemirror"
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript"
import useFirebase from "./useFirebase";
import GameSplash from "./views/GameSplash.vue";
import Game from "./views/Game.vue";
import type { Character, Fruit } from "./views/Game.vue"

const fb = useFirebase();

const STORAGE_KEY = "v0.code"

const loading = ref(true);
const character = ref<Character>({
  x: 0,
  y: 0,
  rotation: 0,
  width: 96,
  height: 256,
  score: 0
});

const opponent = ref<Character>({
  x: 0,
  y: 0,
  rotation: 0,
  width: 96,
  height: 256,
  score: 0
});

const fruit = ref<Fruit[]>([]);

const currentCollisions = ref<{ type: 'fruit' | 'opponent', id?: string }[]>([]);

function subscribeToFruit() {
  const fruitRef = fb.ref(fb.db, 'fruit');
  fb.onValue(fruitRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data) {
      const ids = Object.keys(data);
      fruit.value = ids.map((id) => ({ id, ...data[id] }));
    }
  });
}

function subscribeToOpponent(name: string) {
  const opponentRef = fb.ref(fb.db, 'users/' + name);
  fb.onValue(opponentRef, (snapshot) => {    
    const data = snapshot.val();
    if (data) {
      opponent.value = data;
    }
  });
}

function setOpponentName(_name: string) {
  if (typeof _name !== 'string' || !_name.length) throw new Error("Opponent name must be of type \"String\"");
  opponent.value.name = _name;
  subscribeToOpponent(_name);
}

function setName(_name: string) {
  if (typeof _name !== 'string' || !_name.length) throw new Error("Name must be of type \"String\"");
  character.value.name = _name;
  fb.setCharacter({ ...character.value, name: _name });
}

function setAppearance(_bodyParts: string[]) {
  character.value.bodyParts = _bodyParts;
  fb.setCharacter({ ...character.value, bodyParts: _bodyParts });
}

function setPosition(x: number, y?: number) {
  character.value.x = x;
  character.value.y = y ?? character.value.y;
  fb.setCharacter({ ...character.value, x, y: y ?? character.value.y });
}

function setRotation(degrees: number) {
  character.value.rotation = degrees;
  fb.setCharacter({ ...character.value, rotation: degrees });
}

function checkForCollisions(): { type: 'fruit' | 'opponent', id?: string }[] {
  const collisions: { type: 'fruit' | 'opponent', id?: string }[] = [];

  // Check for collisions with fruit
  fruit.value.forEach((f) => {
    if (
      character.value.x < f.x + f.width &&
      character.value.x + character.value.width > f.x &&
      character.value.y < f.y + f.height &&
      character.value.y + character.value.height > f.y
    ) {
      collisions.push({type: 'fruit', id: f.id});      
    }
  });

  // Check for collisions with opponent
  if (
    character.value.x < opponent.value.x + opponent.value.width &&
    character.value.x + character.value.width > opponent.value.x &&
    character.value.y < opponent.value.y + opponent.value.height &&
    character.value.y + character.value.height > opponent.value.y
  ) {
    collisions.push({type: 'opponent'});
  }

  currentCollisions.value = collisions;
  return collisions;
}

let leftKeyHandler: (character: Character) => void;
let rightKeyHandler: (character: Character) => void;
let upKeyHandler: (character: Character) => void;
let downKeyHandler: (character: Character) => void;
let spacebarHandler: (character: Character) => void;
let animationFrameHandler: (character: Character) => void;

function onLeftKeyPressed(cb: (character: Character) => void) {
  leftKeyHandler = cb;
}

function onRightKeyPressed(cb: (character: Character) => void) {
  rightKeyHandler = cb;
}

function onUpKeyPressed(cb: (character: Character) => void) {
  upKeyHandler = cb;
}

function onDownKeyPressed(cb: (character: Character) => void) {
  downKeyHandler = cb;
}

function onSpacebarPressed(cb: (character: Character) => void) {
  spacebarHandler = cb;
}

function onAnimationFrame(cb: (character: Character) => void) {
  animationFrameHandler = cb;
}

function animationFrameHandlerWrapper() {
  if (animationFrameHandler) animationFrameHandler(character.value);
  window.requestAnimationFrame(animationFrameHandlerWrapper);
}

/**
 * Kids will call this function when they think they are colliding with a fruit
 * If they are wrong, punish them!
 */
function eatFruit() {
  const collisions = checkForCollisions();
  let hasFruit = false;
  collisions.forEach((collision) => {
    if (collision.type === 'fruit') {
      hasFruit = true;
    }
    const screenBoundsX = (window.innerWidth / 2) - 56;
    const screenBoundsY = window.innerHeight - 56;
    fb.addFruit(Math.random() * screenBoundsX, Math.random() * screenBoundsY, collision.id ?? '');
    character.value.score += 1;
  });
  if (!hasFruit) {
    character.value.score = 0;
  }
  fb.setCharacter(character.value);
}

function setScore(score: number) {
  character.value.score = score;
  fb.setCharacter({ ...character.value, score });
}

let editorView: EditorView;

function runCode() {
  try {
    const userCode = editorView.state.doc.toString();
    const runUserCode = new Function(
      'setName', 
      'setOpponentName', 
      'setAppearance', 
      'setPosition', 
      'onLeftKeyPressed', 
      'onRightKeyPressed', 
      'onUpKeyPressed', 
      'onDownKeyPressed', 
      'onSpacebarPressed', 
      'onAnimationFrame',
      'checkForCollisions',
      'eatFruit',
      'setScore',
      'setRotation',
      userCode
    );    
    runUserCode(
      setName,
      setOpponentName,
      setAppearance,
      setPosition,
      onLeftKeyPressed,
      onRightKeyPressed,
      onUpKeyPressed,
      onDownKeyPressed,
      onSpacebarPressed,
      onAnimationFrame,
      checkForCollisions,
      eatFruit,
      setScore,
      setRotation
    );
    loading.value = false;
    subscribeToFruit();
    fb.initFruit();
    localStorage.setItem(STORAGE_KEY, userCode);
  } catch (e) {
    alert(e);
  }
}

onMounted(() => {
  const placeholder =
    `/**
 * Fruital Survival
 * 
 * Game by Felix, Leon, and Eric.
 * 
 * Functions:
 * - setName(<string>)
 * - setOpponentName(<string>)
 * - setScore(<number>)
 * - setPosition(x: <number>, y: <number>)
 *
 * - onRightKeyPressed(<Function>)
 * - onUpKeyPressed(<Function)
 * - onLeftKeyPressed(<Function>)
 * - onDownKeyPressed(<Function)
 *
 * - onAnimationFrame(<Function>) // called every 1/60 of a second (60 fps)
 */

setName("leon")
setOpponentName("imflextor") // Listens to a database to get opponent information in real-time

// Initialize score to zero
setScore(0);

// Leon's Character
const HEAD_URL = "https://th.bing.com/th/id/OIP.Pm34zIZLlVLTss8EoxsFxQHaHa?rs=1&pid=ImgDetMain"
const BODY_URL = "https://i5.walmartimages.com/asr/7ffec616-12c7-42df-ad9c-c63164d980b6_1.2eafd147c4ac5e7364d0004c1ae9c423.jpeg"
const LEGS_URL = "https://ae01.alicdn.com/kf/HTB1hKLNNFXXXXaMaXXXq6xXFXXXK/Funny-Cartoon-Casual-Pants-Men-3D-Monsters-University-Animal-Character-Print-Trousers-Loose-Autumn-Winter-Jogger.jpg"
setAppearance([HEAD_URL, BODY_URL, LEGS_URL]);

// Felix's Character
// const LEGS_URL = "https://i.pinimg.com/originals/da/e9/60/dae9602bbaf5afb3545c65942a33d78f.jpg"
// const HEAD_URL = "https://th.bing.com/th/id/OIP.P5WxeFaaW9wHw1zj3hVTcQAAAA?rs=1&pid=ImgDetMain"
// const BODY_URL = "https://th.bing.com/th/id/OIP.d0tZDJ8YLl1kz7qJkZoxwgHaHa?rs=1&pid=ImgDetMain"
// const SHORTS_URL = "https://th.bing.com/th/id/OIP.4G4A4KOWUtZLc05GnABPrAAAAA?pid=ImgDet&w=199&h=199&c=7"
// setAppearance ([HEAD_URL, BODY_URL, SHORTS_URL, LEGS_URL])

/**
 * Constants
 *
 * We use the keyword "const" for variables that won't change at runtime.
 * This is useful for things like speed and gravity that are changed
 * before the game starts.
 *
 */
const SPEED = 20;
const JUMP = 100;
const GRAVITY = 4;
const LEFT_WALL = 0;
const FLOOR = 0;
const RIGHT_WALL = window.innerWidth / 2; // Half of the screen width.
const PLATFORM = {
  x: 300,
  y: 600,
  width: 300,
  height: 20,  
}

function checkWalls(x, y, character) {
  if (x < LEFT_WALL) {
    return setPosition(LEFT_WALL, character.y);    
  } else if(x > RIGHT_WALL - character.width) {
    return setPosition(RIGHT_WALL - character.width, character.y);    
  } else {
    setPosition(x, character.y, character);
  }
}

onLeftKeyPressed((character) => {
  const newX = character.x - SPEED;
  checkWalls(newX, character.y, character);
});

onRightKeyPressed((character) => {
  const newX = character.x + SPEED;
  checkWalls(newX, character.y, character);
});

onUpKeyPressed(() => {
  eatFruit()
});

onSpacebarPressed((character) => {
  const newY = character.y + JUMP;
  setPosition(character.x, newY);
});

onAnimationFrame((character) => {
  const newY = character.y - GRAVITY;

  const isLowerThanTopOfPlatform = newY <= PLATFORM.y;
  const isHigherThanBottomOfPlatform = newY >= PLATFORM.y - PLATFORM.height;
  const isPastPlatformStart = character.x >= PLATFORM.x;
  const isBeforePlatformEnd = character.x <= PLATFORM.x + PLATFORM.width;  
  
  if (isLowerThanTopOfPlatform && isHigherThanBottomOfPlatform && isPastPlatformStart && isBeforePlatformEnd) {
    return setPosition(character.x, PLATFORM.y)
  }
  
  if (newY < FLOOR) {
    setScore(0); // Lose all points for hitting the ground
    return setPosition(character.x, FLOOR);
  } else {
    setPosition(character.x, newY);
  }
});
`
  const storedCode = localStorage.getItem(STORAGE_KEY) ?? placeholder;
  editorView = new EditorView({
    doc: storedCode,
    extensions: [basicSetup, javascript(), oneDark],
    parent: document.getElementById('editor') as Element
  });

  window.addEventListener('keydown', e => {
    // @ts-ignore
    if (e.target.tagName === "BODY") e.preventDefault();
    else return;
    switch (e.key) {
      case 'ArrowLeft':
      case 'a':
        if (leftKeyHandler) leftKeyHandler(character.value);
        break;
      case 'ArrowRight':
      case 'd':
        if (rightKeyHandler) rightKeyHandler(character.value);
        break;
      case 'ArrowUp':
      case 'w':
        if (upKeyHandler) upKeyHandler(character.value);
        break;
      case 'ArrowDown':
      case 's':
        if (downKeyHandler) downKeyHandler(character.value);
        break;
      case ' ':
        if (spacebarHandler) spacebarHandler(character.value);
        break;
      default:
        break;
    }
  })

  window.requestAnimationFrame(animationFrameHandlerWrapper)
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
  background-color: white;
  color: black;
  height: 64px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  margin: 16px;
  border-radius: 4px;
}

button:hover {
  background-color: rgb(240, 240, 240);
}

.text-center {
  text-align: center;
}

#editor {
  background: #282c34;
  /* Match one-dark theme */
}

.code-window {
  background-color: #282c34;
  max-height: 100vh;
}
</style>