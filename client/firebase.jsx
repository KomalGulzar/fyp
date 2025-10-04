// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pakistan-exporters.firebaseapp.com",
  projectId: "pakistan-exporters",
  storageBucket: "pakistan-exporters.firebasestorage.app",
  messagingSenderId: "1051311553923",
  appId: "1:1051311553923:web:bc5759d729087fb53d4ab6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);