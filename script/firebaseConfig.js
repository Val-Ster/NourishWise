// Import Firebase components
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgdDRikWVnieInU_C6GLRQxL_u8mwuqxI",
  authDomain: "nourishwise-fdc37.firebaseapp.com",
  projectId: "nourishwise-fdc37",
  storageBucket: "nourishwise-fdc37.appspot.com",
  messagingSenderId: "948685887114",
  appId: "1:948685887114:web:6fa1ab201e36680e7cff73",
  measurementId: "G-TJENJWS1JX"
};
export { firebaseConfig };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore instance
const auth = getAuth(app);  // Authentication instance
// const auth = firebase.auth();  // Initialize Firebase Auth

// Export these instances
export { db, auth };