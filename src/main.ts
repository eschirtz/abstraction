import "./assets/main.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-F9ktzSK55uH8tM61YXv7JXf8rmf1rlc",
  authDomain: "sunnyslope-youth-center.firebaseapp.com",
  projectId: "sunnyslope-youth-center",
  storageBucket: "sunnyslope-youth-center.appspot.com",
  messagingSenderId: "470435442765",
  appId: "1:470435442765:web:ff71cca26a84037b87ac04",
  measurementId: "G-Z97VXFWPQZ",
};

// Initialize Firebase
initializeApp(firebaseConfig);
