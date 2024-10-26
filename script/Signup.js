import { firebaseConfig } from './firebaseConfig.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const signupBtn = document.querySelector('.signupbtn');


signupBtn.addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  const weight = document.querySelector('#weight').value;
  const height = document.querySelector('#height').value;
  const role = document.getElementById('role').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      user.sendEmailVerification()
        .then(() => {
          alert('Verification email sent. Please check your inbox and verify your email before signing in.');
        })
        .catch((error) => {
          alert('Error sending verification email: ' + error.message);
        });

      // console.log('User data saved to Firestore');
      console.log('Successfully Sign-in');

      firestore.collection('users').doc(uid).set({
        name: name,
        email: email,
        password: password,
        weight: weight,
        height: height,
        role: role,
      })
      // Redirect based on role
      if (role === 'customer') {
        window.location.href = 'customer-dashboard.html';
      } else if (role === 'dietitian') {
        window.location.href = 'dietitian-dashboard.html';
      }
    })


    .catch((error) => {
      alert('Error signing up: ' + error.message);
    });
});