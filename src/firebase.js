
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCawpIFLzbBkQeRTTEHYRmNsg7g6zLx0KY",
  authDomain: "crime-report-ef60f.firebaseapp.com",
  projectId: "crime-report-ef60f",
  storageBucket: "crime-report-ef60f.appspot.com",
  messagingSenderId: "618585312728",
  appId: "1:618585312728:web:bd97faaa6cc961341af6ad",
  measurementId: "G-80YMK2CL5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics();