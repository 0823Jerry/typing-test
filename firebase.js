import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, doc, collection, addDoc, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { GoogleAuthProvider, getAuth, signInWithPopup} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const provider = new GoogleAuthProvider();



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDQuh9tWRTSxApOuwCwUmkETa7IrP_2MrI",
    authDomain: "typing-test-d54a6.firebaseapp.com",
    projectId: "typing-test-d54a6",
    storageBucket: "typing-test-d54a6.appspot.com",
    messagingSenderId: "637590117212",
    appId: "1:637590117212:web:38d125c46cd14227863f99",
    measurementId: "G-17QJZ1THN1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db, app, getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit, provider, getAuth, signInWithPopup, GoogleAuthProvider}