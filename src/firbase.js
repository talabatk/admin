// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2nLVFWO3u6SaOd4BioHPdxvckUXdqd7Y",
  authDomain: "talabatek-4bea7.firebaseapp.com",
  projectId: "talabatek-4bea7",
  storageBucket: "talabatek-4bea7.firebasestorage.app",
  messagingSenderId: "119008136494",
  appId: "1:119008136494:web:ec83935ba695c71095bebf",
  measurementId: "G-7YZRYF3M21",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { firebaseApp, messaging };
