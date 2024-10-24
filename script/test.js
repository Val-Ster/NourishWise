// Toggle sidebar
document.addEventListener('DOMContentLoaded', function () {
  const sidePanel = document.getElementById('sidePanel');
  const openBtn = document.getElementById('open-menu-btn');
  const closeBtn = document.getElementById('close-menu-btn');

  openBtn.addEventListener('click', function () {
    sidePanel.style.left = '0'; // Show the side panel by setting its left position to 0
  });

  closeBtn.addEventListener('click', function () {
    sidePanel.style.left = '-250px'; // Hide the side panel by moving it out of view
  });
});

// Toggle content sections
const sections = document.querySelectorAll('.content-section');
const sidebarLinks = document.querySelectorAll('.sidebar a');

sidebarLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    // Hide all content sections
    sections.forEach(section => {
      section.style.display = 'none';
    });

    // Show the target section based on the link's href attribute
    const target = this.getAttribute('href');
    document.querySelector(target).style.display = 'block';

    // Update active class for sidebar links
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Diet Log Form Handling
document.getElementById('dietForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const mealInput = document.getElementById('mealInput').value;
  const mealList = document.getElementById('mealList');

  // Create a new list item for the meal and add it to the list
  const listItem = document.createElement('li');
  listItem.textContent = mealInput;
  mealList.appendChild(listItem);

  // Clear the input field after adding the meal
  document.getElementById('mealInput').value = '';
});


// Chat Form Handling
document.getElementById('chatForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const userInput = document.getElementById('userInput').value;
  const chatBox = document.getElementById('chatBox');

  // Create a new message div and add it to the chat box
  const message = document.createElement('div');
  message.textContent = `You: ${userInput}`;
  chatBox.appendChild(message);

  // Clear the input field after sending the message
  document.getElementById('userInput').value = '';
});
