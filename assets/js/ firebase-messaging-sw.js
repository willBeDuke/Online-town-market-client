// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_mjdwQcBBh1wZkhhMSkW5nrzTBKdLwpI",
  authDomain: "knock-knock-shop.firebaseapp.com",
  projectId: "knock-knock-shop",
  storageBucket: "knock-knock-shop.appspot.com",
  messagingSenderId: "1033090758985",
  appId: "1:1033090758985:web:628b85fce3a0c1ccb34298",
  measurementId: "G-P576CHXNVM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);