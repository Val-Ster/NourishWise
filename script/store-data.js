
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

// Import Firebase components
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  // Firestore instance
const auth = getAuth(app);  // Authentication instance

// Event listener for the diet plan form submission
document.querySelector('.diet-plan-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const planName = document.getElementById('planName').value;
  const description = document.getElementById('description').value;
  const meals = document.getElementById('meals').value.split(',').map(meal => meal.trim());

  try {
    const user = auth.currentUser;  // Get the current authenticated user
    if (user) {
      // Add a new document to Firestore
      await addDoc(collection(db, 'dietPlans'), {
        userId: user.uid,
        planName: planName,
        description: description,
        meals: meals,
        createdAt: new Date()
      });

      alert("Diet Plan saved successfully!");

      // Clear the form fields after submission
      document.querySelector('.diet-plan-form').reset();
    } else {
      alert("You must be signed in to create a diet plan.");
    }
  } catch (error) {
    console.error("Error saving diet plan:", error);
    alert("Error saving the diet plan. Please try again.");
  }
});

// Function to load diet plans
async function loadDietPlans() {
  const user = auth.currentUser;

  if (user) {
    try {
      // Query to fetch diet plans where the userId matches the logged-in user's UID
      const q = query(
        collection(db, 'dietPlans'),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const plansContainer = document.getElementById('dietPlansContainer');
      plansContainer.innerHTML = '';  // Clear container before adding plans

      // Loop through the fetched plans and display them
      querySnapshot.forEach(doc => {
        const plan = doc.data();
        const planElement = document.createElement('div');
        planElement.classList.add('dietPlan-card');  // Add the appropriate class

        // Assuming you have a default image for all diet plans for now
        planElement.innerHTML = `
          <div class="img">
            <img src="assets/Mediterranean-diet.jpeg" alt="Diet Plan Image" />
          </div>
          <div class="text">
            <h4>${plan.planName}</h4>
            <p>${plan.description}</p>
            <p>Meals: ${plan.meals.join(', ')}</p>
          </div>
        `;
        plansContainer.appendChild(planElement);
      });
    } catch (error) {
      console.error("Error fetching diet plans:", error);
      alert("Error loading your diet plans. Please try again.");
    }
  } else {
    alert("You must be signed in to view your dashboard.");
    window.location.href = 'sign-up.html';  // Redirect to sign-up if not authenticated
  }
}


// Load diet plans when the user is authenticated and accesses the dashboard
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadDietPlans();  // Load diet plans when the user is authenticated
  } else {
    alert("You are not signed in.");
    window.location.href = 'sign-up.html';  // Redirect to sign-up if user not signed in
  }
});
