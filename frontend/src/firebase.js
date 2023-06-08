// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBzIUx0DmZyuulaM2Kd2Ou7G9GqIVZOD5A",
    authDomain: "images-1572b.firebaseapp.com",
    projectId: "images-1572b",
    storageBucket: "images-1572b.appspot.com",
    messagingSenderId: "595107825412",
    appId: "1:595107825412:web:21c7aed5dda80f030bf251",
    measurementId: "G-DEX2H6V2JQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
