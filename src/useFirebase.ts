import { initializeApp } from "firebase/app";
import { getDatabase, ref, set,push, onValue, remove } from "firebase/database";
import type { Character } from "./views/Game.vue"

const firebaseConfig = {
  apiKey: "AIzaSyB-F9ktzSK55uH8tM61YXv7JXf8rmf1rlc",
  authDomain: "sunnyslope-youth-center.firebaseapp.com",
  projectId: "sunnyslope-youth-center",
  storageBucket: "sunnyslope-youth-center.appspot.com",
  messagingSenderId: "470435442765",
  appId: "1:470435442765:web:ff71cca26a84037b87ac04",
  measurementId: "G-Z97VXFWPQZ",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function useFirebase() {

  /**
   * Update the character in the database
   * @param c
   */
  function setCharacter(
    c: Character
  ) {
    set(ref(db, "users/" + c.name), {
      ...c,
    });
  }

  function addFruit(x: number, y: number) {
    const fruitRef = ref(db, "fruit");
    const newFruitRef = push(fruitRef);
    set(newFruitRef, {
      name: "apple",
      x,
      y,
      width: 56,
      height: 56,
    });
  }

  async function initFruit() {
    const fruitRef = ref(db, "fruit");
    await remove(fruitRef);
    const screenBoundsX = (window.innerWidth / 2) - 56;
    const screenBoundsY = window.innerHeight - 56;
    //
    for(let i = 0; i < 5; i++) {
      addFruit(Math.random() * screenBoundsX, Math.random() * screenBoundsY);
    }
  }

  return {    
    db,
    ref,
    onValue,
    setCharacter,
    addFruit,
    initFruit
  };
}
