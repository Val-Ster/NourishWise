// Dashboard
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href').substring(1); // Get the target section
    document.querySelectorAll('.content-section').forEach(section => {
    });

    // Update active link
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});


window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1); // Get the hash part (e.g., "diet-plans")

  if (hash) {
    // Hide all sections by default
    document.querySelectorAll('.content-section').forEach(section => {
      section.style.display = 'none';
    });

    // Show the section that matches the hash
    const targetSection = document.getElementById(hash);
    if (targetSection) {
      targetSection.style.display = 'block';

      // Set the corresponding menu link to active
      document.querySelectorAll('.sidebar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${hash}`) {
          link.classList.add('active');
        }
      });
    }
  } else {
    // Default to the dashboard section if no hash is provided
    document.getElementById('dashboard').style.display = 'block';
  }

});


// Function to show dashboard section as default
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Initial setup
showSection('dashboard');


// Function to open and close side bar
const main_content = document.getElementById('mainContainer')
function openNavPanel() {
  document.getElementById("sidePanel").style.left = "0";
  main_content.style.marginLeft = "250px"; /* Adjust margin based on nav panel width */
}

function closeNavPanel() {
  document.getElementById("sidePanel").style.left = "-250px";
  main_content.style.marginLeft = "0";
}
