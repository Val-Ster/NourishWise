// script/Signup.js

// Import Firebase config and initialize Firebase
import { firebaseConfig } from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Form submission handler
document.querySelector(".styled-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents form reload

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const profileImage = document.getElementById("profileImage").files[0];

  try {
    // Create a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload the profile image to Firebase Storage
    const imageRef = ref(storage, `profileImages/${user.uid}`);
    await uploadBytes(imageRef, profileImage);

    // Get the image URL
    const imageUrl = await getDownloadURL(imageRef);

    // Update user's profile with name and image URL
    await updateProfile(user, { displayName: name, photoURL: imageUrl });

    // Save user information in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: role,
      weight: weight,
      height: height,
      imageUrl: imageUrl,
      createdAt: new Date()
    });

    alert("Account created successfully!");
    window.location.href = "customer-dashboard.html"; // Redirect to login page
  } catch (error) {
    console.error("Error creating account:", error.message);
    alert("Error creating account: " + error.message);
  }
});
