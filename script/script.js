function toggleNavbar() {
  const header = document.getElementById('header');
  const mainContent = document.getElementById('main-Container');
  const navList = document.getElementById('nav-list');
  const mmainContent = document.getElementById('mainContainer');

  // Check the current height of the header to determine its state
  if (header.style.height === '4rem' || header.style.height === '') {
    // Open the navbar
    header.style.height = '5rem'; // Adjust height as needed
    navList.style.display = 'block'; // Ensure the nav list is visible when open
    mainContent.style.marginTop = '200px';
    mmainContent.style.marginTop = '200px'; // Uncomment if you have multiple main containers to shift
  } else {
    // Close the navbar
    header.style.height = '4rem'; // Change this to whatever the closed height should be (e.g., the height of the logo and menu icon)
    navList.style.display = 'none'; // Hide the nav list when closed
    mainContent.style.marginTop = '0';
    mmainContent.style.marginTop = '2rem';
  }
}
