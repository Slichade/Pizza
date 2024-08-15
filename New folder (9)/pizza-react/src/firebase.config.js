import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACgndiUE97xZi7lMtYr1oX_XhLcb9dBHA",
  authDomain: "uhjhihi-2dda6.firebaseapp.com",
  projectId: "uhjhihi-2dda6",
  storageBucket: "uhjhihi-2dda6.appspot.com",
  messagingSenderId: "392692858988",
  appId: "1:392692858988:web:2334a19fb35a2b78d25849",
  measurementId: "G-1V4G25K6ZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth(app);
