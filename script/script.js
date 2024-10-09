const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

mobileMenu.addEventListener('click', () => {
  if (navList.classList.contains('show')) {
    // Remove 'show' class
    navList.classList.remove('show');
    // Wait for the animation to finish before hiding it
    setTimeout(() => {
      navList.style.display = 'none'; // Hide after animation
    }, 300); // Match this duration with the CSS transition duration
  } else {
    navList.style.display = 'block'; // Show the nav list
    setTimeout(() => {
      navList.classList.add('show'); // Add the 'show' class
    }, 10); // Small delay to allow the display to update
  }
});
