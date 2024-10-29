import { firebaseConfig } from './firebaseConfig.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const loginBtn = document.querySelector('.loginbtn');

loginBtn.addEventListener('click', async () => {
  try {
    const email = document.querySelector('#inUsr').value.trim();
    const password = document.querySelector('#inPass').value;

    // Authenticate the user
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Redirect to customer-dashboard.html upon successful login
    console.log('User is signed in.');
    location.href = "customer-dashboard.html"; // Redirect to the customer dashboard page
  } catch (error) {
    console.error('Error signing in:', error);
    alert('Error signing in: ' + error.message);
  }
});
