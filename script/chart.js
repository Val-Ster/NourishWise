

// Chart.js setup
const ctx = document.getElementById('calories-chart').getContext('2d');
let caloriesChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
      label: 'Calories Consumed',
      data: Array(7).fill(0), // Initialize with zeros
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});


// Weight tracking functionality
document.getElementById('update-weight').addEventListener('click', function () {
  const weightInput = document.getElementById('weight').value;
  if (weightInput) {
    document.getElementById('weight-display').innerText = weightInput;
  }
});

// Update chart function
function updateChart() {
  const caloriesData = [];
  for (let day = 1; day <= 7; day++) {
    const caloriesCell = document.getElementById(`${['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day - 1]}-calories`);
    caloriesData.push(parseInt(caloriesCell.innerHTML));
  }
  caloriesChart.data.datasets[0].data = caloriesData;
  caloriesChart.update();
}


// Function to update food log
  document.getElementById("mealForm").addEventListener("submit", function (e) {
    e.preventDefault();
  const mealName = document.getElementById("meal-name").value;
  const calories = parseInt(document.getElementById("calories").value) || 0;

  // Update total and remaining calories
  const totalCaloriesElem = document.getElementById("totalCalories");
  const caloriesRemainingElem = document.getElementById("calories-remaining");
  let totalCalories = parseInt(totalCaloriesElem.textContent) || 0;
  let caloriesRemaining = parseInt(caloriesRemainingElem.textContent) || 2000;

  totalCalories += calories;
  caloriesRemaining -= calories;

  totalCaloriesElem.textContent = totalCalories;
  caloriesRemainingElem.textContent = caloriesRemaining;

  // Log meal to the respective day
  const today = new Date().toLocaleDateString('en-US', {weekday: 'long' }).toLowerCase();
  document.getElementById(`${today}-meals`).textContent += `${mealName}, `;
  const dayCaloriesElem = document.getElementById(`${today}-calories`);
  dayCaloriesElem.textContent = parseInt(dayCaloriesElem.textContent) + calories;

  document.getElementById("mealForm").reset();
    });

  // Weight tracking
  document.getElementById("update-weight").addEventListener("click", function () {
      const weight = document.getElementById("weight").value;
  document.getElementById("weight-display").textContent = weight;
  document.getElementById("weight").value = '';
    });

  // Optional: Function to calculate progress and update progress bar
  function updateProgress() {
      const goalCalories = 2000; // Example goal, adjust as needed
  const consumedCalories = parseInt(document.getElementById("totalCalories").textContent);
  const progress = Math.min((consumedCalories / goalCalories) * 100, 100);

  document.getElementById("progress-bar").style.width = `${progress}%`;
  document.getElementById("progressPercentage").textContent = `${Math.round(progress)}%`;
    }

  // Call updateProgress after updating total calories
  document.getElementById("mealForm").addEventListener("submit", updateProgress);
// Sample JSON data (foodCalories.json)
const foodCaloriesData = {
  "apple": 95,
  "banana": 105,
  "chicken breast": 165,
  "broccoli": 55,
  "rice": 206
};

// Initialize calories variables
let totalCaloriesConsumed = 0;
let caloriesGoal = 2000; // We will set this to your goal calories (when user select a particular goal)

// Function to lookup calories from JSON data
document.getElementById('lookup-calories').addEventListener('click', function () {
  const mealName = document.getElementById('meal-name').value.toLowerCase();
  const caloriesInput = document.getElementById('calories');
  if (foodCaloriesData[mealName]) {
    caloriesInput.value = foodCaloriesData[mealName];
  } else {
    alert('Food item not found!');
    caloriesInput.value = '';
  }
});
