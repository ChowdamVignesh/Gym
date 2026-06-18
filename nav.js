function toggleMenu() {
  let navLinks = document.getElementById("navLinks");
  let hamburger = document.getElementById("hamburger");

  navLinks.classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    hamburger.innerHTML = "&times;";
  } else {
    hamburger.innerHTML = "☰";
  }
}