// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDciSjYyjbbJziuDVAd4xhEGqXwfrQaXK8",
  authDomain: "note-app-f412d.firebaseapp.com",
  projectId: "note-app-f412d",
  storageBucket: "note-app-f412d.appspot.com",
  messagingSenderId: "711252631920",
  appId: "1:711252631920:web:010747ddd6f48d2e622fb5",
  measurementId: "G-6NCS9Z0PGN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
