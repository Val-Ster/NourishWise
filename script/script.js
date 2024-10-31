// // Function to open and close side bar
const main_content = document.getElementById('mainContainer')
function openNavPanel() {
  document.getElementById("nav-list").style.left = "0";
}

function closeNavPanel() {
  document.getElementById("nav-list").style.left = "-250px";
}