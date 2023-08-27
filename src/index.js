import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGPXT6ZKUyo7uTP7ntbKWhLqmkP4lhsZk",
  authDomain: "type-test-aa89f.firebaseapp.com",
  projectId: "type-test-aa89f",
  storageBucket: "type-test-aa89f.appspot.com",
  messagingSenderId: "612015754241",
  appId: "1:612015754241:web:7be00458bd3df80a950400",
  measurementId: "G-DDMKBL5MK3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)