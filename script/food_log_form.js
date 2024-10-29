import { firebaseConfig } from './firebaseConfig.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

let totalCaloriesConsumed = 0;
const caloriesGoal = 2000; // Set a daily calorie goal

// Get current user’s UID
auth.onAuthStateChanged((user) => {
  if (user) {
    const userId = user.uid;

    // Form submission for food log
    document.getElementById('mealForm').addEventListener('submit', async function (event) {
      event.preventDefault();

      const mealName = document.getElementById('meal-name').value;
      const calories = parseInt(document.getElementById('calories').value) || 0;
      const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();

      // Update DOM with the meal and calories
      const mealContainer = document.getElementById(`${currentDay}-meals`);
      const calorieContainer = document.getElementById(`${currentDay}-calories`);
      if (mealContainer.innerHTML === '') {
        mealContainer.innerHTML = mealName;
      } else {
        mealContainer.innerHTML += `, ${mealName}`;
      }
      calorieContainer.innerHTML = parseInt(calorieContainer.innerHTML) + calories;

      totalCaloriesConsumed += calories;
      updateProgressSummary();

      // Store log in Firestore under the user’s document
      try {
        const logRef = firestore.collection('users').doc(userId).collection('dietLogs');
        await logRef.add({
          mealName,
          calories,
          day: currentDay,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update total calories in the user document
        const userDocRef = firestore.collection('users').doc(userId);
        await userDocRef.set(
          { totalCalories: totalCaloriesConsumed },
          { merge: true }
        );

        // Display toast message
        showToast('Meal logged successfully!');

        // Reset form
        document.getElementById('meal-name').value = '';
        document.getElementById('calories').value = '';

      } catch (error) {
        console.error('Error logging meal:', error);
        alert('Failed to log meal. Please try again.');
      }
    });

    // Function to update progress summary and progress bar
    function updateProgressSummary() {
      document.getElementById('totalCalories').innerText = totalCaloriesConsumed;
      const caloriesRemaining = caloriesGoal - totalCaloriesConsumed;
      document.getElementById('calories-remaining').innerText = caloriesRemaining;
      const progressPercentage = Math.min((totalCaloriesConsumed / caloriesGoal) * 100, 100);
      document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
      document.getElementById('progressPercentage').innerText = `${Math.round(progressPercentage)}%`;

      // Update chart data if you have a chart (function `updateChart()` here is for example purposes)
      updateChart();
    }

    // Function to display a toast message
    function showToast(message) {
      const toast = document.getElementById('toast');
      toast.innerText = message;
      toast.style.opacity = 1;
      setTimeout(() => {
        toast.style.opacity = 0;
      }, 3000);
    }

    // Function to add food log entry to the display table
    function addFoodLog(date, meal, calories) {
      const foodLogTable = document.getElementById('food-log');
      const newRow = document.createElement('tr');

      newRow.innerHTML = `<td>${date}</td><td>${meal}</td><td>${calories}</td>`;
      foodLogTable.appendChild(newRow);

      // Update total calories in the summary
      const totalCaloriesElement = document.getElementById('total-calories');
      const currentTotal = parseInt(totalCaloriesElement.textContent) || 0;
      totalCaloriesElement.textContent = currentTotal + calories;
    }

    // Load and display previous food logs from Firestore for the current user
    async function loadUserDietLogs() {
      try {
        const logRef = firestore.collection('users').doc(userId).collection('dietLogs');
        const querySnapshot = await logRef.orderBy('timestamp').get();

        querySnapshot.forEach((doc) => {
          const log = doc.data();
          addFoodLog(log.day, log.mealName, log.calories);
          totalCaloriesConsumed += log.calories;
        });

        // Update progress summary with loaded data
        updateProgressSummary();

      } catch (error) {
        console.error('Error loading diet logs:', error);
      }
    }

    // Call loadUserDietLogs when the user is logged in
    loadUserDietLogs();
  }
});
