const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const dietPlan_mainContainer = document.getElementById('dietPlan-mainContainer');

mobileMenu.addEventListener('click', () => {
  if (navList.classList.contains('show')) {
    dietPlan_mainContainer.style.marginTop = '2rem'
    // Remove 'show' class
    navList.classList.remove('show');
    // Wait for the animation to finish before hiding it
    setTimeout(() => {
      navList.style.display = 'none'; // Hide after animation
    }, 20); // Match this duration with the CSS transition duration
  } else {
    dietPlan_mainContainer.style.marginTop = '20rem'
    navList.style.display = 'block'; // Show the nav list
    setTimeout(() => {
      navList.classList.add('show'); // Add the 'show' class
    }, 100); // Small delay to allow the display to update
  }
});
