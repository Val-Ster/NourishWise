import { firebaseConfig } from './firebaseConfig.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const loginBtn = document.querySelector('.loginbtn');

loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        console.log('User is signed in with a verified email.');
        location.href = "signout.html";
      } else {
        alert('Please verify your email before signing in.');
      }
    })
    .catch((error) => {
      alert('Error signing in: ' + error.message);
    });
});
