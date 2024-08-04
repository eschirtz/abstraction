import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
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

  return {    
    db,
    ref,
    onValue,
    setCharacter,
  };
}
