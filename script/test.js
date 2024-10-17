// Toggle sidebar
document.addEventListener('DOMContentLoaded', function () {
  const sidePanel = document.getElementById('sidePanel');
  const openBtn = document.getElementById('open-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');

  openBtn.addEventListener('click', function () {
    sidePanel.style.left = '0';
    // sidePanel.style.display = 'block'; // Ensure nav bar is visible
  });

  closeBtn.addEventListener('click', function () {
    sidePanel.style.left = '-250px';
    // sidePanel.style.display = 'none'; // Hide nav bar when closed
  });
});


// Toggle content sections
const sections = document.querySelectorAll('.content-section');
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function () {
    sections.forEach(section => {
      section.style.display = 'none';
      // sidePanel.style.display ='block'
    });
    const target = this.getAttribute('href');
    document.querySelector(target).style.display = 'block';
    // sidePanel.style.display ='none'

    sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Diet Log Form Handling
// document.getElementById('dietForm').addEventListener('submit', function (e) {
//   e.preventDefault();
//   const mealInput = document.getElementById('mealInput').value;
//   const mealList = document.getElementById('mealList');
//   const listItem = document.createElement('li');
//   listItem.textContent = mealInput;
//   mealList.appendChild(listItem);
//   document.getElementById('mealInput').value = ''; // Clear input
// });

// Weight Chart
// const ctx = document.getElementById('weightChart').getContext('2d');
// const weightChart = new Chart(ctx, {
//   type: 'line',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [{
//       label: 'Weight (kg)',
//       data: [70, 68, 66, 65, 64, 63],
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 2,
//       fill: false,
//     }]
//   },
//   options: {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
// });

// // Update chart data
// document.getElementById('updateChartBtn').addEventListener('click', function () {
//   const newWeight = Math.random() * 10 + 60; // Simulated new weight
//   weightChart.data.datasets[0].data.push(newWeight);
//   weightChart.data.labels.push(`Month ${weightChart.data.labels.length + 1}`);
//   weightChart.update();
// });

// // Chat Form Handling
// document.getElementById('chatForm').addEventListener('submit', function (e) {
//   e.preventDefault();
//   const userInput = document.getElementById('userInput').value;
//   const chatBox = document.getElementById('chatBox');
//   const message = document.createElement('div');
//   message.textContent = `You: ${userInput}`;
//   chatBox.appendChild(message);
//   document.getElementById('userInput').value = ''; // Clear input
// });