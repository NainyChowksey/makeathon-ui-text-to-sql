// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhswXL7g9J54LLXZ7CyWa4S9sT_32jnuE",
  authDomain: "netflixgpt-48b84.firebaseapp.com",
  projectId: "netflixgpt-48b84",
  storageBucket: "netflixgpt-48b84.firebasestorage.app",
  messagingSenderId: "109870118630",
  appId: "1:109870118630:web:86a5396dcfe95a48a16d27",
  measurementId: "G-SNH9S2G095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  const auth = getAuth();