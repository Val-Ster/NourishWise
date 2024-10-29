import { firebaseConfig } from './firebaseConfig.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const signupBtn = document.querySelector('.signupbtn');

signupBtn.addEventListener('click', async () => {
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  const weight = document.querySelector('#weight').value;
  const height = document.querySelector('#height').value;
  const role = document.getElementById('role').value;

  try {
    // Create user with email and password
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Send email verification
    await user.sendEmailVerification();
    alert('Verification email sent. Please check your inbox and verify your email before signing in.');

    // Save user data to Firestore
    await firestore.collection('users').doc(user.uid).set({
      name: name,
      email: email,
      weight: weight,
      height: height,
      role: role,
    });

    console.log('User data saved to Firestore and successfully signed up.');

    // Redirect based on role after saving user data
    if (role === 'customer') {
      window.location.href = 'customer-dashboard.html';
    } else if (role === 'dietitian') {
      window.location.href = 'dietitian-dashboard.html';
    }
  } catch (error) {
    console.error('Error signing up:', error);
    alert('Error signing up: ' + error.message);
  }
});
