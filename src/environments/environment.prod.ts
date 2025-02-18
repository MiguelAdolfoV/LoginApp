// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWuOI8YeGwdXJN05riNFIMskTYs3235Nk",
  authDomain: "loginapp-bbece.firebaseapp.com",
  databaseURL: "https://loginapp-bbece-default-rtdb.firebaseio.com",
  projectId: "loginapp-bbece",
  storageBucket: "loginapp-bbece.firebasestorage.app",
  messagingSenderId: "856404781082",
  appId: "1:856404781082:web:e3c1de701be28507ddc9a3",
  measurementId: "G-CQW596MSW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);