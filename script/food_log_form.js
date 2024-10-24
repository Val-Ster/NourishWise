// Form submission for food log
document.getElementById('mealForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const mealName = document.getElementById('meal-name').value;
  const calories = document.getElementById('calories').value || '0';
  const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  const mealContainer = document.getElementById(`${currentDay}-meals`);
  const calorieContainer = document.getElementById(`${currentDay}-calories`);

  // Add meal to the day's meals
  if (mealContainer.innerHTML === '') {
    mealContainer.innerHTML = mealName;
  } else {
    mealContainer.innerHTML += `, ${mealName}`;
  }
  calorieContainer.innerHTML = parseInt(calorieContainer.innerHTML) + parseInt(calories);
  totalCaloriesConsumed += parseInt(calories);

  // Update progress summary
  document.getElementById('totalCalories').innerText = totalCaloriesConsumed;
  const caloriesRemaining = caloriesGoal - totalCaloriesConsumed;
  document.getElementById('calories-remaining').innerText = caloriesRemaining;
  const progressPercentage = Math.min((totalCaloriesConsumed / caloriesGoal) * 100, 100);
  document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
  document.getElementById('progressPercentage').innerText = `${Math.round(progressPercentage)}%`;

  // Update the chart data
  updateChart();

  // Show toast message (notification)
  const toast = document.getElementById('toast');
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 3000);
  
  // Focus on input after input
  document.getElementById('meal-name').focus;
  // Reset form
  document.getElementById('meal-name').value = '';
  document.getElementById('calories').value = '';
});


// This function create a table to when food is log
function addFoodLog(date, meal, calories) {
  const foodLogTable = document.getElementById('food-log');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `<td>${date}</td><td>${meal}</td><td>${calories}</td>`;
  foodLogTable.appendChild(newRow);

  // Update total calories
  const totalCaloriesElement = document.getElementById('total-calories');
  const currentTotal = parseInt(totalCaloriesElement.textContent) || 0;
  totalCaloriesElement.textContent = currentTotal + calories;
}
